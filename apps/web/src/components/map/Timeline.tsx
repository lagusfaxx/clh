'use client'
import { useQuery } from '@tanstack/react-query'
import { Slider } from '@chile-historico/ui'
import { useMapStore } from '@/store/map-store'
import { ERA_META } from '@/lib/categories'
import { formatYear } from '@/lib/format'

const PRESETS: Array<{ label: string; from: number; to: number }> = [
  { label: 'Todo', from: -1500, to: 2026 },
  ...Object.entries(ERA_META).map(([_, v]) => ({
    label: v.label,
    from: v.yearStart,
    to: v.yearEnd,
  })),
]

const RANGE_MIN = -1500
const RANGE_MAX = 2026
const RANGE = RANGE_MAX - RANGE_MIN

interface DensityResponse {
  bucketSize: number
  buckets: Array<{ year: number; count: number }>
}

function pctOf(year: number): number {
  return ((year - RANGE_MIN) / RANGE) * 100
}

export function Timeline() {
  const yearFrom = useMapStore((s) => s.yearFrom)
  const yearTo = useMapStore((s) => s.yearTo)
  const setYearRange = useMapStore((s) => s.setYearRange)

  const { data } = useQuery<DensityResponse>({
    queryKey: ['timeline-density'],
    queryFn: async () => {
      const r = await fetch('/api/timeline/density')
      if (!r.ok) throw new Error('densidad falló')
      return r.json()
    },
    staleTime: 5 * 60 * 1000,
  })

  const maxCount = Math.max(1, ...(data?.buckets.map((b) => b.count) ?? []))

  return (
    <div className="absolute inset-x-2 bottom-2 z-10 rounded-sm border border-border bg-bg-card/95 p-3 shadow-paper backdrop-blur md:inset-x-12 md:bottom-6 md:p-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="font-display text-xs tracking-wide text-text-secondary md:text-sm">
          Línea de tiempo
        </div>
        <div className="-mx-1 flex w-full items-center gap-1 overflow-x-auto px-1 md:w-auto">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => setYearRange(p.from, p.to)}
              className="whitespace-nowrap rounded-sm px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-bg-secondary hover:text-accent-gold"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Histograma de densidad sobre el slider */}
      <div className="relative mb-1 h-10 w-full">
        {/* bandas de eras como fondo */}
        {Object.entries(ERA_META).map(([k, era]) => {
          const left = pctOf(era.yearStart)
          const right = pctOf(era.yearEnd)
          return (
            <div
              key={k}
              className="absolute top-0 h-full border-r border-border/40"
              style={{ left: `${left}%`, width: `${right - left}%` }}
              title={era.label}
            />
          )
        })}

        {/* barras de densidad */}
        <div className="absolute inset-0 flex items-end">
          {data?.buckets.map((b) => {
            const pos = pctOf(b.year)
            const w = (data.bucketSize / RANGE) * 100
            const h = Math.max(8, (b.count / maxCount) * 100)
            const inRange = b.year >= yearFrom && b.year <= yearTo
            return (
              <div
                key={b.year}
                style={{
                  position: 'absolute',
                  left: `${pos}%`,
                  width: `${w}%`,
                  height: `${h}%`,
                  bottom: 0,
                }}
                className={`transition-colors ${
                  inRange ? 'bg-accent-gold/70' : 'bg-text-secondary/30'
                }`}
                title={`${formatYear(b.year)}: ${b.count} eventos`}
              />
            )
          })}
        </div>
      </div>

      <Slider
        min={RANGE_MIN}
        max={RANGE_MAX}
        step={1}
        value={[yearFrom, yearTo]}
        onValueChange={(v) => setYearRange(v[0]!, v[1]!)}
      />

      <div className="mt-2 flex items-center justify-between font-mono text-xs text-text-secondary">
        <span>{formatYear(yearFrom)}</span>
        <span className="text-accent-gold">
          {formatYear(yearFrom)} – {formatYear(yearTo)}
        </span>
        <span>{formatYear(yearTo)}</span>
      </div>
    </div>
  )
}
