import { Worker, type Job } from 'bullmq'
import { prisma } from '@chile-historico/db'
import {
  generateImagePrompt,
  generateImage,
  processAndUploadImage,
} from '@chile-historico/ai'
import { connection, QUEUES } from './connection'

interface RecreationJobData {
  recreationId: string
  eventId: string
  targetYear: number
}

export function startRecreationWorker() {
  const worker = new Worker<RecreationJobData>(
    QUEUES.recreation,
    async (job: Job<RecreationJobData>) => {
      const { recreationId, eventId, targetYear } = job.data

      await prisma.aiRecreation.update({
        where: { id: recreationId },
        data: { status: 'GENERATING' },
      })

      const event = await prisma.historicalEvent.findUnique({ where: { id: eventId } })
      if (!event) throw new Error(`Evento no existe: ${eventId}`)

      const ctx = {
        title: event.title,
        shortDesc: event.shortDesc,
        longDesc: event.longDesc,
        yearStart: event.yearStart,
        yearEnd: event.yearEnd,
        region: event.region,
        comuna: event.comuna,
        category: event.category,
        era: event.era,
      }

      // 1. Generar prompt optimizado con Claude
      const { prompt, negativePrompt } = await generateImagePrompt(ctx, targetYear)
      console.log(`[recreation] prompt:`, prompt.slice(0, 100), '…')

      await prisma.aiRecreation.update({
        where: { id: recreationId },
        data: { prompt, negativePrompt },
      })

      // 2. Generar imagen con Replicate
      const img = await generateImage({ prompt, negativePrompt })

      // 3. Procesar (sharp) y subir a R2
      const baseName = `${targetYear}-${Date.now()}`
      const { original, thumbnail } = await processAndUploadImage({
        buffer: img.buffer,
        contentType: img.contentType,
        pathPrefix: `recreations/${eventId}`,
        baseName,
      })

      await prisma.aiRecreation.update({
        where: { id: recreationId },
        data: {
          status: 'COMPLETED',
          imageUrl: original.url,
          thumbnailUrl: thumbnail.url,
          model: img.model,
          generationCost: img.generationCostUsd,
        },
      })

      console.log(`[recreation] completed: ${recreationId}`)
    },
    { connection, concurrency: 2 },
  )

  worker.on('failed', async (job, err) => {
    if (!job) return
    console.error('[recreation] failed:', job.id, err.message)
    if (job.attemptsMade >= (job.opts.attempts ?? 1)) {
      await prisma.aiRecreation
        .update({
          where: { id: job.data.recreationId },
          data: { status: 'FAILED', errorMsg: err.message.slice(0, 500) },
        })
        .catch(() => undefined)
    }
  })

  worker.on('completed', (job) => {
    console.log(`[recreation] worker job ${job.id} completed`)
  })

  return worker
}
