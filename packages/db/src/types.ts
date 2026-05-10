// Re-export todos los tipos generados por Prisma para consumir desde apps.
export type {
  User,
  Account,
  Session,
  HistoricalEvent,
  Source,
  MediaAsset,
  AiRecreation,
  AudioNarration,
  UserRole,
  EventCategory,
  HistoricalEra,
  EventStatus,
  SourceType,
  MediaType,
  RecreationStatus,
} from '@prisma/client'

export {
  UserRole as UserRoleEnum,
  EventCategory as EventCategoryEnum,
  HistoricalEra as HistoricalEraEnum,
  EventStatus as EventStatusEnum,
  SourceType as SourceTypeEnum,
  MediaType as MediaTypeEnum,
  RecreationStatus as RecreationStatusEnum,
} from '@prisma/client'
