import { NextResponse } from 'next/server'
import { prisma } from '@chile-historico/db'
import { generateNarrative } from '@chile-historico/ai'
import { cacheGet, cacheSet } from '@/lib/redis'
import { checkRateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

export const runtime = 'nodejs'

const TTL_30_DAYS = 60 * 60 * 24 * 30

export async function POST(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const ip = headers().get('x-forwarded-for') ?? 'anon'
  const rl = await checkRateLimit({ identifier: `narrative:${ip}`, limit: 10, windowSeconds: 60 })
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429 })
  }

  const event = await prisma.historicalEvent.findUnique({
    where: { slug: params.slug },
    include: { sources: true },
  })
  if (!event) return NextResponse.json({ error: 'Evento no encontrado' }, { status: 404 })

  const cacheKey = `narrative:${event.id}`
  const cached = await cacheGet<{ text: string; model: string }>(cacheKey)
  if (cached) return NextResponse.json({ ...cached, cached: true })

  const result = await generateNarrative(
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

  await cacheSet(cacheKey, { text: result.text, model: result.model }, TTL_30_DAYS)

  return NextResponse.json({
    text: result.text,
    model: result.model,
    inputTokens: result.inputTokens,
    outputTokens: result.outputTokens,
    estimatedCostUsd: result.estimatedCostUsd,
  })
}
