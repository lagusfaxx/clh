import { NextResponse } from 'next/server'
import { prisma } from '@chile-historico/db'
import { getNarrationQueue } from '@/lib/queue'

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const narration = await prisma.audioNarration.findUnique({
    where: { eventId: params.id },
  })
  if (!narration) return NextResponse.json({ error: 'No existe' }, { status: 404 })
  return NextResponse.json({
    url: narration.url,
    duration: narration.duration,
    voice: narration.voice,
  })
}

export async function POST(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const event = await prisma.historicalEvent.findUnique({
    where: { id: params.id },
  })
  if (!event) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })

  const existing = await prisma.audioNarration.findUnique({
    where: { eventId: params.id },
  })
  if (existing) {
    return NextResponse.json({ url: existing.url, duration: existing.duration })
  }

  // Encolar job para generar
  await getNarrationQueue().add(
    'narration',
    { eventId: params.id },
    { jobId: `narration:${params.id}` },
  )

  return NextResponse.json(
    {
      status: 'QUEUED',
      message: 'Narración encolada para generación. Vuelve a consultar en unos minutos.',
    },
    { status: 202 },
  )
}
