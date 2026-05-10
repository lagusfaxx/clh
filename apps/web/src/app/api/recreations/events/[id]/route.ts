import { NextResponse } from 'next/server'
import { prisma } from '@chile-historico/db'

export const runtime = 'nodejs'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const recreations = await prisma.aiRecreation.findMany({
    where: { eventId: params.id },
    orderBy: { targetYear: 'asc' },
  })
  return NextResponse.json({ recreations })
}
