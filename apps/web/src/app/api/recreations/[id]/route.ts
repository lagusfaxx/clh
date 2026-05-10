import { NextResponse } from 'next/server'
import { prisma } from '@chile-historico/db'

export const runtime = 'nodejs'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const recreation = await prisma.aiRecreation.findUnique({
    where: { id: params.id },
  })
  if (!recreation) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }
  return NextResponse.json({ recreation })
}
