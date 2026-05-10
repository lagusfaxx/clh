'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { X, Maximize2, BookOpen } from 'lucide-react'
import { Badge, Button, Skeleton } from '@chile-historico/ui'
import { useMapStore } from '@/store/map-store'
import { CATEGORY_META, ERA_META } from '@/lib/categories'
import { formatYearRange } from '@/lib/format'

export function EventDetailPanel() {
  const selectedId = useMapStore((s) => s.selectedEventId)
  const setSelected = useMapStore((s) => s.setSelectedEventId)

  const { data, isLoading } = useQuery({
    queryKey: ['event-detail', selectedId],
    queryFn: async () => {
      const res = await fetch(`/api/events/by-id/${selectedId}`)
      if (!res.ok) throw new Error('No se pudo cargar')
      return res.json()
    },
    enabled: !!selectedId,
  })

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null)
    }
    if (selectedId) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId, setSelected])

  if (!selectedId) return null

  return (
    <aside className="absolute right-0 top-0 z-30 h-full w-full max-w-md animate-slide-in-right border-l border-border bg-bg-card/95 shadow-paper backdrop-blur">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-xs uppercase tracking-wider text-text-secondary/70">
          Evento histórico
        </span>
        <button
          onClick={() => setSelected(null)}
          className="rounded-sm p-1 text-text-secondary hover:bg-bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="h-[calc(100%-3rem)] overflow-y-auto p-5">
        {isLoading && (
          <div className="space-y-3">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        )}

        {data?.event && (
          <article className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>
                {CATEGORY_META[data.event.category as keyof typeof CATEGORY_META]?.label}
              </Badge>
              <Badge variant="ink">
                {ERA_META[data.event.era as keyof typeof ERA_META]?.label}
              </Badge>
            </div>

            <h2 className="font-display text-3xl leading-tight text-text-primary">
              {data.event.title}
            </h2>

            <p className="font-mono text-sm text-accent-gold">
              {data.event.dateText ?? formatYearRange(data.event.yearStart, data.event.yearEnd)}
              {data.event.comuna && (
                <> · {data.event.comuna}, {data.event.region}</>
              )}
            </p>

            {data.event.media?.[0] && (
              <figure className="overflow-hidden rounded-sm border border-border">
                <img
                  src={data.event.media[0].url}
                  alt={data.event.media[0].caption ?? data.event.title}
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="bg-bg-secondary px-3 py-1 text-[11px] text-text-secondary">
                  {data.event.media[0].attribution}
                </figcaption>
              </figure>
            )}

            <p className="text-sm leading-relaxed text-text-primary">
              {data.event.shortDesc}
            </p>

            {data.event.sources?.length > 0 && (
              <details className="rounded-sm border border-border bg-bg-secondary p-3">
                <summary className="cursor-pointer text-xs font-medium text-accent-gold">
                  Fuentes ({data.event.sources.length})
                </summary>
                <ol className="mt-2 list-decimal space-y-1 pl-4 text-[11px] text-text-secondary">
                  {data.event.sources.map((s: { id: string; citation: string }) => (
                    <li key={s.id}>{s.citation}</li>
                  ))}
                </ol>
              </details>
            )}

            <div className="flex gap-2 pt-2">
              <Button asChild>
                <Link href={`/evento/${data.event.slug}`}>
                  <Maximize2 className="h-4 w-4" />
                  Vista completa
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/evento/${data.event.slug}#fuentes`}>
                  <BookOpen className="h-4 w-4" />
                  Fuentes
                </Link>
              </Button>
            </div>
          </article>
        )}
      </div>
    </aside>
  )
}
