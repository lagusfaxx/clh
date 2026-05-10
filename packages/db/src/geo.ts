import { prisma } from './client'

export interface BBox {
  west: number
  south: number
  east: number
  north: number
}

export interface GeoFeature {
  id: string
  slug: string
  title: string
  category: string
  era: string
  yearStart: number
  yearEnd: number | null
  longitude: number
  latitude: number
  hasHistoricMedia: boolean
  hasRecreation: boolean
}

/**
 * Eventos publicados dentro de un bounding box, opcionalmente filtrados por
 * rango temporal y categoría. Usa el índice GIST sobre `location`.
 */
export async function findEventsInBBox(params: {
  bbox?: BBox
  yearFrom?: number
  yearTo?: number
  categories?: string[]
  eras?: string[]
  regions?: string[]
  onlyWithHistoricMedia?: boolean
  onlyWithRecreation?: boolean
  limit?: number
}): Promise<GeoFeature[]> {
  const {
    bbox,
    yearFrom,
    yearTo,
    categories,
    eras,
    regions,
    onlyWithHistoricMedia,
    onlyWithRecreation,
    limit = 5000,
  } = params

  const where: string[] = [`e."status" = 'PUBLISHED'`]
  const values: unknown[] = []

  if (bbox) {
    values.push(bbox.west, bbox.south, bbox.east, bbox.north)
    where.push(
      `e."location" && ST_MakeEnvelope($${values.length - 3}, $${values.length - 2}, $${values.length - 1}, $${values.length}, 4326)`,
    )
  }
  if (typeof yearFrom === 'number') {
    values.push(yearFrom)
    where.push(`COALESCE(e."yearEnd", e."yearStart") >= $${values.length}`)
  }
  if (typeof yearTo === 'number') {
    values.push(yearTo)
    where.push(`e."yearStart" <= $${values.length}`)
  }
  if (categories && categories.length > 0) {
    values.push(categories)
    where.push(`e."category" = ANY($${values.length}::"EventCategory"[])`)
  }
  if (eras && eras.length > 0) {
    values.push(eras)
    where.push(`e."era" = ANY($${values.length}::"HistoricalEra"[])`)
  }
  if (regions && regions.length > 0) {
    values.push(regions)
    where.push(`e."region" = ANY($${values.length}::text[])`)
  }

  const mediaJoin = onlyWithHistoricMedia
    ? `INNER JOIN "MediaAsset" m ON m."eventId" = e."id" AND m."type" = 'PHOTO_HISTORIC'`
    : `LEFT JOIN "MediaAsset" m ON m."eventId" = e."id" AND m."type" = 'PHOTO_HISTORIC'`

  const recreationJoin = onlyWithRecreation
    ? `INNER JOIN "AiRecreation" r ON r."eventId" = e."id" AND r."status" = 'COMPLETED'`
    : `LEFT JOIN "AiRecreation" r ON r."eventId" = e."id" AND r."status" = 'COMPLETED'`

  values.push(limit)

  const query = `
    SELECT
      e."id",
      e."slug",
      e."title",
      e."category"::text AS category,
      e."era"::text AS era,
      e."yearStart",
      e."yearEnd",
      e."longitude",
      e."latitude",
      (COUNT(DISTINCT m."id") > 0) AS "hasHistoricMedia",
      (COUNT(DISTINCT r."id") > 0) AS "hasRecreation"
    FROM "HistoricalEvent" e
    ${mediaJoin}
    ${recreationJoin}
    WHERE ${where.join(' AND ')}
    GROUP BY e."id"
    LIMIT $${values.length}
  `

  return prisma.$queryRawUnsafe<GeoFeature[]>(query, ...values)
}

/**
 * Búsqueda full-text usando pg_trgm sobre title + shortDesc.
 */
export async function searchEvents(query: string, limit = 20) {
  const trimmed = query.trim()
  if (!trimmed) return []

  return prisma.$queryRaw<
    Array<{
      id: string
      slug: string
      title: string
      shortDesc: string
      yearStart: number
      similarity: number
    }>
  >`
    SELECT
      "id",
      "slug",
      "title",
      "shortDesc",
      "yearStart",
      GREATEST(
        similarity("title", ${trimmed}),
        similarity("shortDesc", ${trimmed})
      ) AS similarity
    FROM "HistoricalEvent"
    WHERE "status" = 'PUBLISHED'
      AND (
        "title" % ${trimmed}
        OR "shortDesc" % ${trimmed}
        OR "title" ILIKE ${'%' + trimmed + '%'}
      )
    ORDER BY similarity DESC, "yearStart" ASC
    LIMIT ${limit}
  `
}
