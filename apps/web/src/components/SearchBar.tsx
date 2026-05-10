'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'
import { useMapStore } from '@/store/map-store'
import { formatYear } from '@/lib/format'

interface SearchResult {
  id: string
  slug: string
  title: string
  shortDesc: string
  yearStart: number
  similarity: number
}

export function SearchBar() {
  const router = useRouter()
  const setFlyToTarget = useMapStore((s) => s.setFlyToTarget)
  const setSelectedEventId = useMapStore((s) => s.setSelectedEventId)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (!r.ok) throw new Error()
        const data = await r.json()
        setResults(data.results ?? [])
        setActiveIndex(-1)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [query])

  async function pick(r: SearchResult) {
    setOpen(false)
    setQuery('')
    // Pedimos detalle para obtener coordenadas y volar al lugar
    try {
      const res = await fetch(`/api/events/by-id/${r.id}`)
      if (res.ok) {
        const data = await res.json()
        const e = data.event
        if (e?.longitude && e?.latitude) {
          setFlyToTarget({ longitude: e.longitude, latitude: e.latitude, zoom: 16 })
          setSelectedEventId(e.id)
          return
        }
      }
    } catch {
      // fallback: ir a la página de detalle
    }
    router.push(`/evento/${r.slug}`)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) {
      if (e.key === 'Enter' && results[0]) pick(results[0])
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const sel = results[activeIndex >= 0 ? activeIndex : 0]
      if (sel) pick(sel)
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xs md:max-w-md">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          placeholder="Buscar evento, lugar, año..."
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="h-8 w-full rounded-sm border border-border bg-bg-secondary pl-8 pr-8 text-xs text-text-primary placeholder:text-text-secondary focus:border-accent-gold/60 focus:outline-none focus:ring-1 focus:ring-accent-gold/40 md:h-9 md:text-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-text-secondary hover:bg-bg-card hover:text-accent-gold"
            aria-label="Limpiar"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {open && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[60vh] overflow-y-auto rounded-sm border border-border bg-bg-card shadow-paper">
          {loading && (
            <div className="flex items-center justify-center p-4 text-xs text-text-secondary">
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Buscando…
            </div>
          )}
          {!loading && results.length === 0 && (
            <p className="p-4 text-xs text-text-secondary">
              Sin resultados para "{query}"
            </p>
          )}
          {!loading &&
            results.map((r, i) => (
              <button
                key={r.id}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => pick(r)}
                className={`block w-full border-b border-border/40 px-3 py-2 text-left transition-colors last:border-b-0 ${
                  activeIndex === i ? 'bg-accent-gold/10' : 'hover:bg-bg-secondary'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-display text-sm leading-tight text-text-primary">
                    {r.title}
                  </div>
                  <div className="shrink-0 font-mono text-[10px] text-accent-gold">
                    {formatYear(r.yearStart)}
                  </div>
                </div>
                <p className="mt-0.5 line-clamp-2 text-[11px] text-text-secondary">
                  {r.shortDesc}
                </p>
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
