import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@chile-historico/db'
import { Badge, Button } from '@chile-historico/ui'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { EventMediaSlider } from '@/components/event/EventMediaSlider'
import { EventNarration } from '@/components/event/EventNarration'
import { ShareButton } from '@/components/event/ShareButton'
import { RelatedEvents } from '@/components/event/RelatedEvents'
import { CATEGORY_META, ERA_META, SOURCE_TYPE_META } from '@/lib/categories'
import { formatYearRange } from '@/lib/format'

interface Props {
  params: { slug: string }
}

export const revalidate = 300

async function getEvent(slug: string) {
  return prisma.historicalEvent.findFirst({
    where: { slug, status: 'PUBLISHED' },
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
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent(params.slug)
  if (!event) return { title: 'Evento no encontrado' }
  return {
    title: event.title,
    description: event.shortDesc,
    openGraph: {
      title: event.title,
      description: event.shortDesc,
      images: event.media[0]?.url
        ? [{ url: event.media[0].url, alt: event.title }]
        : event.recreations[0]?.imageUrl
          ? [{ url: event.recreations[0].imageUrl }]
          : [],
    },
  }
}

export default async function EventPage({ params }: Props) {
  const event = await getEvent(params.slug)
  if (!event) notFound()

  // Incrementar views (fire-and-forget; en prod usar job para evitar contention)
  prisma.historicalEvent
    .update({ where: { id: event.id }, data: { views: { increment: 1 } } })
    .catch(() => undefined)

  const categoryMeta = CATEGORY_META[event.category as keyof typeof CATEGORY_META]
  const eraMeta = ERA_META[event.era as keyof typeof ERA_META]

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-6 md:py-8">
        <Link
          href="/"
          className="mb-4 inline-flex items-center text-sm text-text-secondary hover:text-accent-gold md:mb-6"
        >
          ← Volver al mapa
        </Link>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <section className="lg:col-span-7">
            <EventMediaSlider
              eventId={event.id}
              eventSlug={event.slug}
              media={event.media}
              recreations={event.recreations}
              latitude={event.latitude}
              longitude={event.longitude}
              targetYearDefault={event.yearStart}
            />
          </section>

          <article className="space-y-5 lg:col-span-5">
            <div className="flex flex-wrap gap-2">
              <Badge>{categoryMeta?.label}</Badge>
              <Badge variant="ink">{eraMeta?.label}</Badge>
              {event.featured && <Badge variant="rust">Destacado</Badge>}
            </div>

            <h1 className="font-display text-3xl leading-tight text-text-primary md:text-4xl lg:text-5xl">
              {event.title}
            </h1>

            <p className="font-mono text-sm text-accent-gold">
              {event.dateText ?? formatYearRange(event.yearStart, event.yearEnd)}
              {event.comuna && (
                <>
                  {' '}
                  · {event.comuna}, {event.region}
                </>
              )}
            </p>

            <div className="editorial-prose">
              {event.longDesc.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <EventNarration eventSlug={event.slug} hasExisting={!!event.narration} />
              <ShareButton title={event.title} slug={event.slug} />
            </div>

            <section id="fuentes" className="mt-10">
              <h2 className="mb-3 font-display text-2xl text-accent-gold">Fuentes</h2>
              <ol className="space-y-3 text-sm">
                {event.sources.map((s, i) => (
                  <li
                    key={s.id}
                    className="rounded-sm border border-border bg-bg-secondary p-3"
                  >
                    <div className="text-[11px] uppercase tracking-wide text-text-secondary/70">
                      [{i + 1}] {SOURCE_TYPE_META[s.type as keyof typeof SOURCE_TYPE_META]}
                      {s.signature && (
                        <span className="ml-2 font-mono text-accent-gold">{s.signature}</span>
                      )}
                    </div>
                    <p className="mt-1 text-text-primary">{s.citation}</p>
                    {s.url && (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-block text-xs text-accent-gold hover:underline"
                      >
                        Ver original →
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-6 rounded-sm border border-accent-rust/30 bg-accent-rust/5 p-3 text-xs text-text-secondary">
              <strong className="text-accent-rust">Aviso:</strong> Las recreaciones generadas
              con inteligencia artificial son interpretativas y no constituyen registro
              histórico documentado. Su finalidad es educativa y evocadora.
            </div>
          </article>
        </div>

        <RelatedEvents slug={event.slug} />
      </main>
      <SiteFooter />
    </>
  )
}
