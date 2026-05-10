import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { prisma } from '@chile-historico/db'
import { recreationRequestSchema } from '@/lib/validators'
import { getRecreationQueue } from '@/lib/queue'
import { checkRateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const ip = headers().get('x-forwarded-for') ?? 'anon'
  const rl = await checkRateLimit({
    identifier: `recreation:${ip}`,
    limit: 5,
    windowSeconds: 60,
  })
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const parsed = recreationRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Payload inválido', issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const { eventId, targetYear } = parsed.data

  const event = await prisma.historicalEvent.findUnique({ where: { id: eventId } })
  if (!event) return NextResponse.json({ error: 'Evento no existe' }, { status: 404 })

  // Idempotente por (eventId, targetYear)
  const existing = await prisma.aiRecreation.findUnique({
    where: { eventId_targetYear: { eventId, targetYear } },
  })
  if (existing) {
    return NextResponse.json({ recreation: existing, queued: false })
  }

  const created = await prisma.aiRecreation.create({
    data: {
      eventId,
      targetYear,
      prompt: '', // se generará en el worker
      model: process.env.REPLICATE_MODEL ?? 'black-forest-labs/flux-schnell',
      status: 'PENDING',
    },
  })

  if ((process.env.ENABLE_AI_GENERATION ?? 'true') === 'true') {
    await getRecreationQueue().add(
      'recreation',
      {
        recreationId: created.id,
        eventId,
        targetYear,
      },
      { jobId: `recreation:${created.id}` },
    )
  }

  return NextResponse.json({ recreation: created, queued: true }, { status: 202 })
}
