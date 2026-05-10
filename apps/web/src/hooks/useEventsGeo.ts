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
  const filters = useMapStore((s) => ({
    yearFrom: s.yearFrom,
    yearTo: s.yearTo,
    categories: s.categories,
    eras: s.eras,
    regions: s.regions,
    withHistoricMedia: s.withHistoricMedia,
    withRecreation: s.withRecreation,
  }))

  const params = new URLSearchParams()
  params.set('yearFrom', String(filters.yearFrom))
  params.set('yearTo', String(filters.yearTo))
  if (filters.categories.length) params.set('categories', filters.categories.join(','))
  if (filters.eras.length) params.set('eras', filters.eras.join(','))
  if (filters.regions.length) params.set('regions', filters.regions.join(','))
  if (filters.withHistoricMedia) params.set('withHistoricMedia', '1')
  if (filters.withRecreation) params.set('withRecreation', '1')

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
