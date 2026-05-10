import type {
  EventCategory,
  HistoricalEra,
  SourceType,
} from '@chile-historico/db/types'

export interface SeedSource {
  type: SourceType
  title: string
  author?: string
  year?: number
  url?: string
  signature?: string
  citation: string
  inPublicDomain?: boolean
  licenseInfo?: string
}

export interface SeedEvent {
  slug: string
  title: string
  shortDesc: string
  longDesc: string
  yearStart: number
  yearEnd?: number
  dateText?: string
  category: EventCategory
  era: HistoricalEra
  latitude: number
  longitude: number
  region: string
  comuna?: string
  featured?: boolean
  relatedSlugs?: string[]
  sources: SeedSource[]
}
