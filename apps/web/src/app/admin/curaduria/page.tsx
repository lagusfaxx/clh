import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth, hasRole } from '@/lib/auth'
import { prisma } from '@chile-historico/db'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Badge } from '@chile-historico/ui'
import { CATEGORY_META, ERA_META } from '@/lib/categories'
import { formatYearRange } from '@/lib/format'
import { CurateActions } from '@/components/admin/CurateActions'

export const metadata = { title: 'Curaduría' }
export const dynamic = 'force-dynamic'

export default async function CuraduriaPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (!hasRole(session.user.role, 'CURATOR')) redirect('/')

  const pending = await prisma.historicalEvent.findMany({
    where: { status: 'PENDING_REVIEW' },
    orderBy: { createdAt: 'desc' },
    include: {
      sources: { take: 3 },
      createdBy: { select: { name: true, email: true } },
    },
    take: 50,
  })

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-display text-4xl text-text-primary">Panel de curaduría</h1>
        <p className="mt-2 text-sm text-text-secondary">
          {pending.length} evento(s) esperando revisión.
        </p>

        <div className="mt-8 space-y-4">
          {pending.length === 0 && (
            <p className="rounded-sm border border-border bg-bg-secondary p-6 text-center text-sm text-text-secondary">
              No hay propuestas pendientes.
            </p>
          )}
          {pending.map((ev) => (
            <article key={ev.id} className="rounded-sm border border-border bg-bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="mb-1 flex flex-wrap gap-1">
                    <Badge>{CATEGORY_META[ev.category as keyof typeof CATEGORY_META]?.label}</Badge>
                    <Badge variant="ink">
                      {ERA_META[ev.era as keyof typeof ERA_META]?.label}
                    </Badge>
                  </div>
                  <h2 className="font-display text-2xl text-text-primary">
                    <Link href={`/evento/${ev.slug}`} className="hover:text-accent-gold">
                      {ev.title}
                    </Link>
                  </h2>
                  <p className="mt-1 font-mono text-xs text-accent-gold">
                    {ev.dateText ?? formatYearRange(ev.yearStart, ev.yearEnd)} ·{' '}
                    {ev.comuna ? `${ev.comuna}, ` : ''}{ev.region}
                  </p>
                  <p className="mt-2 max-w-prose text-sm text-text-secondary">{ev.shortDesc}</p>
                  <p className="mt-2 text-xs text-text-secondary/70">
                    Enviado por {ev.createdBy.name ?? ev.createdBy.email}
                  </p>
                  {ev.sources.length > 0 && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-xs text-accent-gold">
                        {ev.sources.length} fuente(s)
                      </summary>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-text-secondary">
                        {ev.sources.map((s) => (
                          <li key={s.id}>{s.citation}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
                <CurateActions eventId={ev.id} />
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
