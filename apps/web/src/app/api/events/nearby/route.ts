import { NextResponse } from 'next/server'
import { prisma } from '@chile-historico/db'

export const runtime = 'nodejs'

interface NearbyRow {
  id: string
  slug: string
  title: string
  shortDesc: string
  yearStart: number
  yearEnd: number | null
  category: string
  longitude: number
  latitude: number
  distanceMeters: number
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const lng = Number(url.searchParams.get('lng'))
  const lat = Number(url.searchParams.get('lat'))
  const radius = Math.min(Number(url.searchParams.get('radius') ?? 2000), 20000)
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 20), 50)

  if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
    return NextResponse.json({ error: 'lng/lat inválidos' }, { status: 400 })
  }

  // ST_DistanceSphere devuelve metros entre puntos geográficos
  const results = await prisma.$queryRaw<NearbyRow[]>`
    SELECT
      e."id",
      e."slug",
      e."title",
      e."shortDesc",
      e."yearStart",
      e."yearEnd",
      e."category"::text AS category,
      e."longitude",
      e."latitude",
      ST_DistanceSphere(
        e."location",
        ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)
      ) AS "distanceMeters"
    FROM "HistoricalEvent" e
    WHERE e."status" = 'PUBLISHED'
      AND ST_DWithin(
        e."location"::geography,
        ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
        ${radius}
      )
    ORDER BY e."location" <-> ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)
    LIMIT ${limit}
  `

  return NextResponse.json(
    { results, center: { lng, lat }, radiusMeters: radius },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
