import { z } from 'zod'

export const eventCategoryEnum = z.enum([
  'BATALLA',
  'FUNDACION',
  'DESASTRE_NATURAL',
  'PATRIMONIO',
  'PUEBLOS_ORIGINARIOS',
  'POLITICA',
  'CULTURA',
  'ECONOMIA',
  'RELIGION',
  'TRANSPORTE',
  'CIENCIA',
])

export const historicalEraEnum = z.enum([
  'PREHISPANICA',
  'CONQUISTA',
  'COLONIA',
  'INDEPENDENCIA',
  'REPUBLICA_TEMPRANA',
  'PARLAMENTARISMO',
  'PRESIDENCIALISMO',
  'DICTADURA',
  'TRANSICION',
])

export const eventStatusEnum = z.enum([
  'DRAFT',
  'PENDING_REVIEW',
  'PUBLISHED',
  'ARCHIVED',
])

export const sourceTypeEnum = z.enum([
  'BIBLIOTECA_NACIONAL',
  'MEMORIA_CHILENA',
  'ARCHIVO_NACIONAL',
  'WIKIPEDIA',
  'ACADEMIC_PAPER',
  'BOOK',
  'PRIMARY_DOCUMENT',
  'OTHER',
])

export const sourceInputSchema = z.object({
  type: sourceTypeEnum,
  title: z.string().min(2).max(300),
  author: z.string().max(200).optional(),
  year: z.number().int().min(-15000).max(2100).optional(),
  url: z.string().url().optional(),
  signature: z.string().max(100).optional(),
  citation: z.string().min(10).max(2000),
  inPublicDomain: z.boolean().optional(),
  licenseInfo: z.string().max(200).optional(),
})

export const createEventSchema = z.object({
  title: z.string().min(3).max(200),
  shortDesc: z.string().min(10).max(500),
  longDesc: z.string().min(50).max(10000),
  yearStart: z.number().int().min(-15000).max(2100),
  yearEnd: z.number().int().min(-15000).max(2100).optional().nullable(),
  dateText: z.string().max(200).optional(),
  category: eventCategoryEnum,
  era: historicalEraEnum,
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  region: z.string().min(2).max(100),
  comuna: z.string().max(100).optional().nullable(),
  zoneGeoJson: z.unknown().optional().nullable(),
  sources: z.array(sourceInputSchema).min(1).max(20),
})

export const updateEventSchema = createEventSchema.partial().extend({
  status: eventStatusEnum.optional(),
})

export const recreationRequestSchema = z.object({
  eventId: z.string().min(1),
  targetYear: z.number().int().min(-15000).max(2100),
})

export const eventsListQuerySchema = z.object({
  bbox: z.string().optional(),
  yearFrom: z.coerce.number().optional(),
  yearTo: z.coerce.number().optional(),
  categories: z.string().optional(),
  eras: z.string().optional(),
  regions: z.string().optional(),
  q: z.string().optional(),
  withHistoricMedia: z.coerce.boolean().optional(),
  withRecreation: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
})

export type CreateEventInput = z.infer<typeof createEventSchema>
export type UpdateEventInput = z.infer<typeof updateEventSchema>
export type EventsListQuery = z.infer<typeof eventsListQuerySchema>
