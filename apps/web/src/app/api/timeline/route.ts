import { NextResponse } from 'next/server'
import { prisma } from '@chile-historico/db'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const from = Number(url.searchParams.get('from') ?? '-1500')
  const to = Number(url.searchParams.get('to') ?? '2026')

  const events = await prisma.historicalEvent.findMany({
    where: {
      status: 'PUBLISHED',
      yearStart: { gte: from, lte: to },
    },
    orderBy: { yearStart: 'asc' },
    select: {
      id: true,
      slug: true,
      title: true,
      yearStart: true,
      yearEnd: true,
      category: true,
      era: true,
      region: true,
    },
    take: 500,
  })

  return NextResponse.json(
    { events, from, to },
    { headers: { 'Cache-Control': 'public, s-maxage=60' } },
  )
}
