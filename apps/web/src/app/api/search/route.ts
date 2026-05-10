import { NextResponse } from 'next/server'
import { searchEvents } from '@chile-historico/db'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') ?? ''
  if (q.trim().length < 2) {
    return NextResponse.json({ results: [] })
  }
  const results = await searchEvents(q, 20)
  return NextResponse.json({ results }, {
    headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120' },
  })
}
