import { NextResponse } from 'next/server'
import { prisma } from '@chile-historico/db'
import { auth, hasRole } from '@/lib/auth'
import { updateEventSchema } from '@/lib/validators'

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const event = await prisma.historicalEvent.findFirst({
    where: { slug: params.slug, status: 'PUBLISHED' },
    include: {
      sources: { orderBy: { createdAt: 'asc' } },
      media: { orderBy: { createdAt: 'asc' } },
      recreations: {
        where: { status: 'COMPLETED' },
        orderBy: { targetYear: 'asc' },
      },
      narration: true,
    },
  })
  if (!event) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json({ event })
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const session = await auth()
  if (!hasRole(session?.user?.role, 'CURATOR')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }
  const body = await request.json().catch(() => null)
  const parsed = updateEventSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Payload inválido', issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const updated = await prisma.historicalEvent.update({
    where: { slug: params.slug },
    data: {
      ...(parsed.data.title !== undefined ? { title: parsed.data.title } : {}),
      ...(parsed.data.shortDesc !== undefined ? { shortDesc: parsed.data.shortDesc } : {}),
      ...(parsed.data.longDesc !== undefined ? { longDesc: parsed.data.longDesc } : {}),
      ...(parsed.data.yearStart !== undefined ? { yearStart: parsed.data.yearStart } : {}),
      ...(parsed.data.yearEnd !== undefined ? { yearEnd: parsed.data.yearEnd } : {}),
      ...(parsed.data.dateText !== undefined ? { dateText: parsed.data.dateText } : {}),
      ...(parsed.data.category !== undefined ? { category: parsed.data.category } : {}),
      ...(parsed.data.era !== undefined ? { era: parsed.data.era } : {}),
      ...(parsed.data.latitude !== undefined ? { latitude: parsed.data.latitude } : {}),
      ...(parsed.data.longitude !== undefined ? { longitude: parsed.data.longitude } : {}),
      ...(parsed.data.region !== undefined ? { region: parsed.data.region } : {}),
      ...(parsed.data.comuna !== undefined ? { comuna: parsed.data.comuna } : {}),
      ...(parsed.data.status !== undefined ? { status: parsed.data.status } : {}),
      ...(parsed.data.status === 'PUBLISHED'
        ? { curatedById: session?.user?.id ?? null, curatedAt: new Date() }
        : {}),
    },
  })

  return NextResponse.json({ event: updated })
}
