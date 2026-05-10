'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@chile-historico/ui'
import { CATEGORY_META } from '@/lib/categories'
import { formatYearRange } from '@/lib/format'

interface RelatedEvent {
  id: string
  slug: string
  title: string
  shortDesc: string
  yearStart: number
  yearEnd: number | null
  category: string
  era: string
  distanceMeters?: number
}

export function RelatedEvents({ slug }: { slug: string }) {
  const [manual, setManual] = useState<RelatedEvent[]>([])
  const [suggested, setSuggested] = useState<RelatedEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/events/${slug}/related`)
      .then((r) => (r.ok ? r.json() : { manual: [], suggested: [] }))
      .then((data) => {
        if (cancelled) return
        setManual(data.manual ?? [])
        setSuggested(data.suggested ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) return null
  if (manual.length === 0 && suggested.length === 0) return null

  return (
    <section className="mt-10">
      <h2 className="mb-3 font-display text-2xl text-accent-gold">
        Vinculados y cercanos
      </h2>
      {manual.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-xs uppercase tracking-wider text-text-secondary/70">
            Vinculados
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {manual.map((r) => (
              <RelatedItem key={r.id} item={r} />
            ))}
          </ul>
        </div>
      )}
      {suggested.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs uppercase tracking-wider text-text-secondary/70">
            Cercanos en categoría o época
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {suggested.map((r) => (
              <RelatedItem key={r.id} item={r} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

function RelatedItem({ item }: { item: RelatedEvent }) {
  const meta = CATEGORY_META[item.category as keyof typeof CATEGORY_META]
  const distance =
    item.distanceMeters !== undefined
      ? item.distanceMeters < 1000
        ? `${Math.round(item.distanceMeters)} m`
        : `${(item.distanceMeters / 1000).toFixed(1)} km`
      : null

  return (
    <li>
      <Link
        href={`/evento/${item.slug}`}
        className="block rounded-sm border border-border bg-bg-secondary p-3 transition-colors hover:border-accent-gold/40"
      >
        <div className="mb-1 flex flex-wrap items-center gap-1.5">
          <Badge>{meta?.label ?? item.category}</Badge>
          <span className="font-mono text-[10px] text-accent-gold">
            {formatYearRange(item.yearStart, item.yearEnd)}
          </span>
          {distance && (
            <span className="font-mono text-[10px] text-text-secondary">
              · {distance}
            </span>
          )}
        </div>
        <h4 className="font-display text-sm leading-tight text-text-primary">
          {item.title}
        </h4>
        <p className="mt-1 line-clamp-2 text-xs text-text-secondary">
          {item.shortDesc}
        </p>
      </Link>
    </li>
  )
}
