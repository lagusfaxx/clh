import { NextResponse } from 'next/server'
import { findEventsInBBox } from '@chile-historico/db'

export const runtime = 'nodejs'
export const revalidate = 30

function parseBBox(s: string | null) {
  if (!s) return undefined
  const parts = s.split(',').map(Number)
  if (parts.length !== 4 || parts.some((v) => Number.isNaN(v))) return undefined
  const [west, south, east, north] = parts as [number, number, number, number]
  return { west, south, east, north }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const bbox = parseBBox(url.searchParams.get('bbox'))
  const yearFrom = url.searchParams.get('yearFrom')
  const yearTo = url.searchParams.get('yearTo')
  const categories = url.searchParams.get('categories')
  const eras = url.searchParams.get('eras')
  const regions = url.searchParams.get('regions')
  const onlyHist = url.searchParams.get('withHistoricMedia')
  const onlyAi = url.searchParams.get('withRecreation')

  const features = await findEventsInBBox({
    bbox,
    yearFrom: yearFrom ? Number(yearFrom) : undefined,
    yearTo: yearTo ? Number(yearTo) : undefined,
    categories: categories ? categories.split(',') : undefined,
    eras: eras ? eras.split(',') : undefined,
    regions: regions ? regions.split(',') : undefined,
    onlyWithHistoricMedia: onlyHist === '1' || onlyHist === 'true',
    onlyWithRecreation: onlyAi === '1' || onlyAi === 'true',
    limit: 5000,
  })

  return NextResponse.json(
    { features },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
      },
    },
  )
}
