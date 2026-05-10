import { NextResponse } from 'next/server'
import { prisma } from '@chile-historico/db'
import { auth, hasRole } from '@/lib/auth'
import {
  createEventSchema,
  eventsListQuerySchema,
} from '@/lib/validators'
import { uniqueSlug } from '@/lib/slugify'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const parsed = eventsListQuerySchema.safeParse(Object.fromEntries(url.searchParams))
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Parámetros inválidos', issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const q = parsed.data
  const skip = (q.page - 1) * q.pageSize

  const where: import('@prisma/client').Prisma.HistoricalEventWhereInput = {
    status: 'PUBLISHED',
    ...(q.yearFrom !== undefined ? { yearStart: { gte: q.yearFrom } } : {}),
    ...(q.yearTo !== undefined ? { yearStart: { lte: q.yearTo } } : {}),
    ...(q.categories
      ? {
          category: {
            in: q.categories.split(',') as never,
          },
        }
      : {}),
    ...(q.eras ? { era: { in: q.eras.split(',') as never } } : {}),
    ...(q.regions ? { region: { in: q.regions.split(',') } } : {}),
    ...(q.q ? { title: { contains: q.q, mode: 'insensitive' } } : {}),
  }

  const [items, total] = await prisma.$transaction([
    prisma.historicalEvent.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { yearStart: 'asc' }],
      take: q.pageSize,
      skip,
      select: {
        id: true,
        slug: true,
        title: true,
        shortDesc: true,
        yearStart: true,
        yearEnd: true,
        category: true,
        era: true,
        region: true,
        comuna: true,
        latitude: true,
        longitude: true,
        featured: true,
      },
    }),
    prisma.historicalEvent.count({ where }),
  ])

  return NextResponse.json(
    { items, page: q.page, pageSize: q.pageSize, total },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
  )
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }
  if (!hasRole(session.user.role, 'CONTRIBUTOR')) {
    return NextResponse.json(
      { error: 'Necesitas rol CONTRIBUTOR para crear eventos' },
      { status: 403 },
    )
  }

  const body = await request.json().catch(() => null)
  const parsed = createEventSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Payload inválido', issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const slug = await uniqueSlug(parsed.data.title, async (s) =>
    Boolean(await prisma.historicalEvent.findUnique({ where: { slug: s } })),
  )

  const created = await prisma.historicalEvent.create({
    data: {
      slug,
      title: parsed.data.title,
      shortDesc: parsed.data.shortDesc,
      longDesc: parsed.data.longDesc,
      yearStart: parsed.data.yearStart,
      yearEnd: parsed.data.yearEnd ?? null,
      dateText: parsed.data.dateText ?? null,
      category: parsed.data.category,
      era: parsed.data.era,
      latitude: parsed.data.latitude,
      longitude: parsed.data.longitude,
      region: parsed.data.region,
      comuna: parsed.data.comuna ?? null,
      zoneGeoJson: parsed.data.zoneGeoJson as never,
      status: 'PENDING_REVIEW',
      createdById: session.user.id,
      sources: {
        create: parsed.data.sources.map((s) => ({
          type: s.type,
          title: s.title,
          author: s.author ?? null,
          year: s.year ?? null,
          url: s.url ?? null,
          signature: s.signature ?? null,
          citation: s.citation,
          inPublicDomain: s.inPublicDomain ?? false,
          licenseInfo: s.licenseInfo ?? null,
        })),
      },
    },
    include: { sources: true },
  })

  return NextResponse.json({ event: created }, { status: 201 })
}
