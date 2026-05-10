import { NextResponse } from 'next/server'
import { prisma } from '@chile-historico/db'

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const event = await prisma.historicalEvent.findUnique({
    where: { id: params.id },
    include: {
      sources: { orderBy: { createdAt: 'asc' }, take: 6 },
      media: { orderBy: { createdAt: 'asc' }, take: 1 },
      recreations: {
        where: { status: 'COMPLETED' },
        orderBy: { targetYear: 'asc' },
        take: 1,
      },
    },
  })
  if (!event) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json({ event })
}
