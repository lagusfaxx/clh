import { Worker, type Job } from 'bullmq'
import { prisma } from '@chile-historico/db'
import {
  generateNarrative,
  synthesizeNarration,
  uploadObject,
} from '@chile-historico/ai'
import { connection, QUEUES } from './connection'

interface NarrationJobData {
  eventId: string
}

export function startNarrationWorker() {
  const worker = new Worker<NarrationJobData>(
    QUEUES.narration,
    async (job: Job<NarrationJobData>) => {
      const { eventId } = job.data

      const event = await prisma.historicalEvent.findUnique({
        where: { id: eventId },
        include: { sources: true },
      })
      if (!event) throw new Error(`Evento no existe: ${eventId}`)

      // Generar narrativa primero
      const narrative = await generateNarrative(
        {
          title: event.title,
          shortDesc: event.shortDesc,
          longDesc: event.longDesc,
          yearStart: event.yearStart,
          yearEnd: event.yearEnd,
          region: event.region,
          comuna: event.comuna,
          category: event.category,
          era: event.era,
        },
        event.sources.map((s) => ({
          citation: s.citation,
          author: s.author,
          year: s.year,
          url: s.url,
        })),
      )

      const tts = await synthesizeNarration({ text: narrative.text })

      const upload = await uploadObject({
        key: `narrations/${eventId}.mp3`,
        buffer: tts.buffer,
        contentType: 'audio/mpeg',
      })

      await prisma.audioNarration.upsert({
        where: { eventId },
        update: {
          url: upload.url,
          duration: tts.durationSeconds,
          voice: tts.voice,
          text: narrative.text,
        },
        create: {
          eventId,
          url: upload.url,
          duration: tts.durationSeconds,
          voice: tts.voice,
          text: narrative.text,
        },
      })

      console.log(`[narration] completed: ${eventId} (${tts.durationSeconds}s)`)
    },
    { connection, concurrency: 1 },
  )

  worker.on('failed', (job, err) => {
    console.error('[narration] failed:', job?.id, err.message)
  })

  return worker
}
