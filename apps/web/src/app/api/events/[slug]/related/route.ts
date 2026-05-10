import { NextResponse } from 'next/server'
import { prisma } from '@chile-historico/db'

export const runtime = 'nodejs'
export const revalidate = 300

/**
 * Devuelve eventos relacionados con el dado:
 * 1. Los que aparecen en `relatedSlugs` (vinculación curada).
 * 2. Complementados con vecinos espaciales en la misma categoría/era
 *    (sugerencias automáticas), hasta `limit` resultados.
 */
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const limit = 8
  const base = await prisma.historicalEvent.findUnique({
    where: { slug: params.slug },
    select: {
      id: true,
      slug: true,
      latitude: true,
      longitude: true,
      category: true,
      era: true,
      relatedSlugs: true,
    },
  })

  if (!base) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }

  const manual = Array.isArray(base.relatedSlugs)
    ? (base.relatedSlugs as string[])
    : []

  const manualEvents = manual.length
    ? await prisma.historicalEvent.findMany({
        where: { slug: { in: manual }, status: 'PUBLISHED' },
        select: {
          id: true,
          slug: true,
          title: true,
          shortDesc: true,
          yearStart: true,
          yearEnd: true,
          category: true,
          era: true,
          latitude: true,
          longitude: true,
        },
      })
    : []

  // Completar con sugerencias automáticas (misma categoría/era,
  // cercanas espacialmente, ordenadas por distancia)
  const remaining = limit - manualEvents.length
  const auto =
    remaining > 0
      ? await prisma.$queryRaw<
          Array<{
            id: string
            slug: string
            title: string
            shortDesc: string
            yearStart: number
            yearEnd: number | null
            category: string
            era: string
            latitude: number
            longitude: number
            distanceMeters: number
          }>
        >`
          SELECT
            e."id",
            e."slug",
            e."title",
            e."shortDesc",
            e."yearStart",
            e."yearEnd",
            e."category"::text AS category,
            e."era"::text AS era,
            e."longitude",
            e."latitude",
            ST_DistanceSphere(
              e."location",
              ST_SetSRID(ST_MakePoint(${base.longitude}, ${base.latitude}), 4326)
            ) AS "distanceMeters"
          FROM "HistoricalEvent" e
          WHERE e."status" = 'PUBLISHED'
            AND e."id" <> ${base.id}
            AND e."slug" NOT IN (${manual.length ? manual : ['__none__']})
            AND (
              e."category" = ${base.category}::"EventCategory"
              OR e."era" = ${base.era}::"HistoricalEra"
            )
          ORDER BY "distanceMeters" ASC
          LIMIT ${remaining}
        `
      : []

  return NextResponse.json({
    manual: manualEvents,
    suggested: auto,
  })
}
