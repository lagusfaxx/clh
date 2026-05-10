import Link from 'next/link'
import { prisma } from '@chile-historico/db'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@chile-historico/ui'
import { CATEGORY_META, ERA_META } from '@/lib/categories'
import { formatYearRange } from '@/lib/format'

export const metadata = {
  title: 'Catálogo de eventos',
  description: 'Lista completa de eventos históricos publicados.',
}

export const revalidate = 300

export default async function EventosPage() {
  const events = await prisma.historicalEvent.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ featured: 'desc' }, { yearStart: 'asc' }],
    select: {
      id: true,
      slug: true,
      title: true,
      shortDesc: true,
      yearStart: true,
      yearEnd: true,
      dateText: true,
      category: true,
      era: true,
      region: true,
      comuna: true,
      featured: true,
    },
    take: 200,
  })

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-display text-4xl text-text-primary">Catálogo de eventos</h1>
        <p className="mt-2 text-sm text-text-secondary">
          {events.length} eventos publicados.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {events.map((ev) => (
            <Link key={ev.id} href={`/evento/${ev.slug}`} className="group">
              <Card className="h-full transition-colors group-hover:border-accent-gold/50">
                <CardHeader>
                  <div className="flex flex-wrap gap-1">
                    <Badge>
                      {CATEGORY_META[ev.category as keyof typeof CATEGORY_META]?.label}
                    </Badge>
                    <Badge variant="ink">
                      {ERA_META[ev.era as keyof typeof ERA_META]?.label}
                    </Badge>
                    {ev.featured && <Badge variant="rust">Destacado</Badge>}
                  </div>
                  <CardTitle className="text-xl group-hover:text-accent-gold">
                    {ev.title}
                  </CardTitle>
                  <CardDescription className="font-mono text-xs">
                    {ev.dateText ?? formatYearRange(ev.yearStart, ev.yearEnd)} ·{' '}
                    {ev.comuna ? `${ev.comuna}, ` : ''}{ev.region}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-text-secondary">{ev.shortDesc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
