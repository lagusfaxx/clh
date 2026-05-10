'use client'
import { create } from 'zustand'

export type EventCategory =
  | 'BATALLA'
  | 'FUNDACION'
  | 'DESASTRE_NATURAL'
  | 'PATRIMONIO'
  | 'PUEBLOS_ORIGINARIOS'
  | 'POLITICA'
  | 'CULTURA'
  | 'ECONOMIA'
  | 'RELIGION'
  | 'TRANSPORTE'
  | 'CIENCIA'

export type HistoricalEra =
  | 'PREHISPANICA'
  | 'CONQUISTA'
  | 'COLONIA'
  | 'INDEPENDENCIA'
  | 'REPUBLICA_TEMPRANA'
  | 'PARLAMENTARISMO'
  | 'PRESIDENCIALISMO'
  | 'DICTADURA'
  | 'TRANSICION'

export interface FilterState {
  yearFrom: number
  yearTo: number
  categories: EventCategory[]
  eras: HistoricalEra[]
  regions: string[]
  withHistoricMedia: boolean
  withRecreation: boolean
  search: string
}

const DEFAULT_FILTERS: FilterState = {
  yearFrom: -1500,
  yearTo: 2026,
  categories: [],
  eras: [],
  regions: [],
  withHistoricMedia: false,
  withRecreation: false,
  search: '',
}

interface UserLocation {
  longitude: number
  latitude: number
  accuracy: number
}

interface MapState extends FilterState {
  selectedEventId: string | null
  userLocation: UserLocation | null
  flyToTarget: { longitude: number; latitude: number; zoom?: number } | null
  setSelectedEventId: (id: string | null) => void
  setYearRange: (from: number, to: number) => void
  toggleCategory: (c: EventCategory) => void
  toggleEra: (e: HistoricalEra) => void
  toggleRegion: (r: string) => void
  setWithHistoricMedia: (v: boolean) => void
  setWithRecreation: (v: boolean) => void
  setSearch: (q: string) => void
  resetFilters: () => void
  setUserLocation: (loc: UserLocation | null) => void
  setFlyToTarget: (t: MapState['flyToTarget']) => void
}

export const useMapStore = create<MapState>((set) => ({
  ...DEFAULT_FILTERS,
  selectedEventId: null,
  userLocation: null,
  flyToTarget: null,

  setSelectedEventId: (id) => set({ selectedEventId: id }),
  setUserLocation: (loc) => set({ userLocation: loc }),
  setFlyToTarget: (t) => set({ flyToTarget: t }),
  setYearRange: (yearFrom, yearTo) => set({ yearFrom, yearTo }),
  toggleCategory: (c) =>
    set((s) => ({
      categories: s.categories.includes(c)
        ? s.categories.filter((x) => x !== c)
        : [...s.categories, c],
    })),
  toggleEra: (e) =>
    set((s) => ({
      eras: s.eras.includes(e) ? s.eras.filter((x) => x !== e) : [...s.eras, e],
    })),
  toggleRegion: (r) =>
    set((s) => ({
      regions: s.regions.includes(r)
        ? s.regions.filter((x) => x !== r)
        : [...s.regions, r],
    })),
  setWithHistoricMedia: (v) => set({ withHistoricMedia: v }),
  setWithRecreation: (v) => set({ withRecreation: v }),
  setSearch: (q) => set({ search: q }),
  resetFilters: () => set({ ...DEFAULT_FILTERS, selectedEventId: null }),
}))
