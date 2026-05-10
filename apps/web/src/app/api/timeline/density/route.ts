import { NextResponse } from 'next/server'
import { prisma } from '@chile-historico/db'

export const runtime = 'nodejs'
export const revalidate = 300

/**
 * Densidad de eventos por bins fijos de años, para dibujar histograma
 * en el slider temporal. Devuelve buckets de 25 años entre -1500 y 2026.
 */
export async function GET() {
  const buckets = await prisma.$queryRaw<Array<{ bucket: number; count: bigint }>>`
    SELECT
      FLOOR("yearStart" / 25) * 25 AS bucket,
      COUNT(*) AS count
    FROM "HistoricalEvent"
    WHERE "status" = 'PUBLISHED'
    GROUP BY bucket
    ORDER BY bucket ASC
  `

  return NextResponse.json(
    {
      bucketSize: 25,
      buckets: buckets.map((b) => ({
        year: Number(b.bucket),
        count: Number(b.count),
      })),
    },
    { headers: { 'Cache-Control': 'public, s-maxage=300' } },
  )
}
