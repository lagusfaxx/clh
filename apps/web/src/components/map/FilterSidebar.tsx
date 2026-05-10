'use client'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react'
import { Button, Switch, Input } from '@chile-historico/ui'
import { useMapStore } from '@/store/map-store'
import {
  CATEGORY_META,
  ERA_META,
  REGIONES_CHILE,
} from '@/lib/categories'
import type { EventCategory, HistoricalEra } from '@/store/map-store'

export function FilterSidebar() {
  // Cerrada por defecto en mobile, abierta en desktop (md+)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) {
      setOpen(true)
    }
  }, [])

  const filters = useMapStore()

  return (
    <>
      {/* Backdrop solo en mobile cuando está abierta */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 z-10 bg-bg-primary/60 backdrop-blur-sm md:hidden"
        />
      )}
      <aside
        className={`absolute left-0 top-0 z-20 h-full w-[85vw] max-w-[340px] transform border-r border-border bg-bg-card/95 backdrop-blur transition-transform duration-300 md:w-[320px] ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="font-display text-lg tracking-wide text-accent-gold">
            Filtros
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => filters.resetFilters()}
              title="Restablecer filtros"
            >
              <X className="h-4 w-4" />
              Limpiar
            </Button>
            <button
              onClick={() => setOpen(false)}
              className="rounded-sm p-1 text-text-secondary hover:bg-bg-secondary"
              title="Cerrar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="h-[calc(100%-3rem)] space-y-6 overflow-y-auto p-4">
          <Section title="Búsqueda">
            <Input
              placeholder="Buscar eventos…"
              value={filters.search}
              onChange={(e) => filters.setSearch(e.target.value)}
            />
          </Section>

          <Section title="Categoría">
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(CATEGORY_META) as EventCategory[]).map((c) => {
                const meta = CATEGORY_META[c]
                const active = filters.categories.includes(c)
                return (
                  <button
                    key={c}
                    onClick={() => filters.toggleCategory(c)}
                    className={`flex items-center gap-2 rounded-sm border px-2 py-1.5 text-left text-xs transition-colors ${
                      active
                        ? 'border-accent-gold bg-accent-gold/10 text-accent-gold'
                        : 'border-border bg-bg-secondary text-text-secondary hover:border-accent-gold/40'
                    }`}
                  >
                    <span style={{ color: meta.color }}>{meta.icon}</span>
                    <span>{meta.label}</span>
                  </button>
                )
              })}
            </div>
          </Section>

          <Section title="Era histórica">
            <div className="space-y-1">
              {(Object.keys(ERA_META) as HistoricalEra[]).map((e) => {
                const meta = ERA_META[e]
                const active = filters.eras.includes(e)
                return (
                  <button
                    key={e}
                    onClick={() => filters.toggleEra(e)}
                    className={`flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-xs transition-colors ${
                      active
                        ? 'bg-accent-gold/10 text-accent-gold'
                        : 'text-text-secondary hover:bg-bg-secondary'
                    }`}
                  >
                    <span>{meta.label}</span>
                    <span className="font-mono text-[10px] opacity-70">
                      {meta.rangeLabel}
                    </span>
                  </button>
                )
              })}
            </div>
          </Section>

          <Section title="Región">
            <div className="grid grid-cols-2 gap-1">
              {REGIONES_CHILE.map((r) => {
                const active = filters.regions.includes(r)
                return (
                  <button
                    key={r}
                    onClick={() => filters.toggleRegion(r)}
                    className={`rounded-sm px-2 py-1 text-left text-[11px] transition-colors ${
                      active
                        ? 'bg-accent-gold/10 text-accent-gold'
                        : 'text-text-secondary hover:bg-bg-secondary'
                    }`}
                  >
                    {r}
                  </button>
                )
              })}
            </div>
          </Section>

          <Section title="Contenido visual">
            <div className="space-y-2">
              <label className="flex items-center justify-between gap-2 text-xs">
                <span className="text-text-secondary">Solo con foto histórica</span>
                <Switch
                  checked={filters.withHistoricMedia}
                  onCheckedChange={filters.setWithHistoricMedia}
                />
              </label>
              <label className="flex items-center justify-between gap-2 text-xs">
                <span className="text-text-secondary">Solo con recreación IA</span>
                <Switch
                  checked={filters.withRecreation}
                  onCheckedChange={filters.setWithRecreation}
                />
              </label>
            </div>
          </Section>
        </div>
      </aside>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="absolute left-2 top-2 z-20 flex items-center gap-1 rounded-sm border border-border bg-bg-card/95 px-3 py-2 text-xs text-text-primary shadow-warm hover:border-accent-gold/40"
        >
          <Filter className="h-4 w-4" />
          Filtros
          <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-xs uppercase tracking-wider text-text-secondary/70">
        {title}
      </h3>
      {children}
    </div>
  )
}
