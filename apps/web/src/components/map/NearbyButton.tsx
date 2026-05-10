'use client'
import { useEffect, useState } from 'react'
import { Loader2, MapPin, X } from 'lucide-react'
import Link from 'next/link'
import { useMapStore } from '@/store/map-store'
import { Button, Skeleton } from '@chile-historico/ui'
import { CATEGORY_META } from '@/lib/categories'
import { formatYearRange } from '@/lib/format'

interface NearbyResult {
  id: string
  slug: string
  title: string
  shortDesc: string
  yearStart: number
  yearEnd: number | null
  category: string
  distanceMeters: number
  longitude: number
  latitude: number
}

export function NearbyButton() {
  const userLocation = useMapStore((s) => s.userLocation)
  const setUserLocation = useMapStore((s) => s.setUserLocation)
  const setFlyToTarget = useMapStore((s) => s.setFlyToTarget)
  const setSelectedEventId = useMapStore((s) => s.setSelectedEventId)

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<NearbyResult[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  function requestLocation() {
    if (!('geolocation' in navigator)) {
      setError('Tu navegador no soporta geolocalización')
      return
    }
    setLoading(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
          accuracy: pos.coords.accuracy,
        }
        setUserLocation(loc)
        setFlyToTarget({ longitude: loc.longitude, latitude: loc.latitude, zoom: 16 })
        setOpen(true)
      },
      (err) => {
        setLoading(false)
        setError(
          err.code === err.PERMISSION_DENIED
            ? 'Permiso denegado. Habilita la ubicación en el navegador.'
            : 'No se pudo obtener tu ubicación',
        )
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
    )
  }

  useEffect(() => {
    if (!userLocation) return
    let cancelled = false
    setLoading(true)
    fetch(`/api/events/nearby?lng=${userLocation.longitude}&lat=${userLocation.latitude}&radius=2000`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setResults(data.results ?? [])
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Error consultando lugares cercanos')
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [userLocation])

  return (
    <>
      <button
        onClick={requestLocation}
        title="Mostrar lugares cerca de mí"
        className="absolute right-2 top-14 z-10 flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-bg-card/95 text-accent-gold shadow-warm transition-colors hover:border-accent-gold md:top-20"
      >
        {loading && !open ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MapPin className="h-4 w-4" />
        )}
      </button>

      {open && (
        <aside className="absolute right-2 top-28 z-20 w-[min(92vw,360px)] rounded-sm border border-border bg-bg-card/95 p-3 shadow-paper backdrop-blur md:top-32">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-display text-base text-accent-gold">Cerca de ti</h3>
            <button
              onClick={() => setOpen(false)}
              className="rounded-sm p-1 text-text-secondary hover:bg-bg-secondary"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {error && <p className="text-xs text-accent-rust">{error}</p>}

          {loading && (
            <div className="space-y-2">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          )}

          {!loading && results && results.length === 0 && (
            <p className="text-xs text-text-secondary">
              No encontramos lugares históricos en un radio de 2 km. Probá moverte por
              el centro de Santiago.
            </p>
          )}

          {!loading && results && results.length > 0 && (
            <ul className="max-h-[60vh] space-y-2 overflow-y-auto pr-1">
              {results.map((r) => {
                const meta = CATEGORY_META[r.category as keyof typeof CATEGORY_META]
                return (
                  <li key={r.id}>
                    <button
                      onClick={() => {
                        setFlyToTarget({ longitude: r.longitude, latitude: r.latitude, zoom: 17 })
                        setSelectedEventId(r.id)
                      }}
                      className="block w-full rounded-sm border border-border bg-bg-secondary p-2 text-left transition-colors hover:border-accent-gold/40"
                    >
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs">
                          <span
                            className="inline-block h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: meta?.color ?? '#C9A75C' }}
                          />
                          <span className="text-accent-gold">
                            {formatDistance(r.distanceMeters)}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-text-secondary">
                          {formatYearRange(r.yearStart, r.yearEnd)}
                        </span>
                      </div>
                      <h4 className="font-display text-sm leading-tight text-text-primary">
                        {r.title}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-[11px] text-text-secondary">
                        {r.shortDesc}
                      </p>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {!loading && results && results.length > 0 && (
            <Link
              href="/eventos"
              className="mt-2 block text-center text-xs text-accent-gold hover:underline"
            >
              Ver catálogo completo →
            </Link>
          )}
        </aside>
      )}
    </>
  )
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`
  return `${(meters / 1000).toFixed(1)} km`
}
