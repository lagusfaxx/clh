import { NextResponse } from 'next/server'
import { prisma } from '@chile-historico/db'
import { auth, hasRole } from '@/lib/auth'
import { z } from 'zod'

export const runtime = 'nodejs'

const actionSchema = z.object({
  action: z.enum(['approve', 'reject', 'request_changes']),
  comment: z.string().max(2000).optional(),
})

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth()
  if (!hasRole(session?.user?.role, 'CURATOR')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }
  const body = await request.json().catch(() => null)
  const parsed = actionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 })
  }

  let newStatus: 'PUBLISHED' | 'ARCHIVED' | 'DRAFT' = 'PENDING_REVIEW' as never
  if (parsed.data.action === 'approve') newStatus = 'PUBLISHED'
  else if (parsed.data.action === 'reject') newStatus = 'ARCHIVED'
  else newStatus = 'DRAFT'

  const updated = await prisma.historicalEvent.update({
    where: { id: params.id },
    data: {
      status: newStatus,
      curatedById: session?.user?.id,
      curatedAt: new Date(),
    },
  })

  return NextResponse.json({ event: updated })
}
