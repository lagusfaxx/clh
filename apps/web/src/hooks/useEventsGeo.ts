'use client'
import { useQuery } from '@tanstack/react-query'
import { useMapStore } from '@/store/map-store'

export interface GeoEventFeature {
  id: string
  slug: string
  title: string
  category: string
  era: string
  yearStart: number
  yearEnd: number | null
  longitude: number
  latitude: number
  hasHistoricMedia: boolean
  hasRecreation: boolean
}

export function useEventsGeo() {
  // Selectores individuales para evitar re-renders por identidad de objeto
  const yearFrom = useMapStore((s) => s.yearFrom)
  const yearTo = useMapStore((s) => s.yearTo)
  const categories = useMapStore((s) => s.categories)
  const eras = useMapStore((s) => s.eras)
  const regions = useMapStore((s) => s.regions)
  const withHistoricMedia = useMapStore((s) => s.withHistoricMedia)
  const withRecreation = useMapStore((s) => s.withRecreation)

  const params = new URLSearchParams()
  params.set('yearFrom', String(yearFrom))
  params.set('yearTo', String(yearTo))
  if (categories.length) params.set('categories', categories.join(','))
  if (eras.length) params.set('eras', eras.join(','))
  if (regions.length) params.set('regions', regions.join(','))
  if (withHistoricMedia) params.set('withHistoricMedia', '1')
  if (withRecreation) params.set('withRecreation', '1')

  return useQuery<{ features: GeoEventFeature[] }>({
    queryKey: ['events-geo', params.toString()],
    queryFn: async () => {
      const res = await fetch(`/api/events/geo?${params.toString()}`)
      if (!res.ok) throw new Error('Falló carga de eventos')
      return res.json()
    },
    staleTime: 30_000,
  })
}
