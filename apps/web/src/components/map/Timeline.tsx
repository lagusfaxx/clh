'use client'
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

export function Timeline() {
  const { yearFrom, yearTo, setYearRange } = useMapStore((s) => ({
    yearFrom: s.yearFrom,
    yearTo: s.yearTo,
    setYearRange: s.setYearRange,
  }))

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

      <Slider
        min={-1500}
        max={2026}
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
