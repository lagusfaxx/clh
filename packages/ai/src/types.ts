export interface EventContext {
  title: string
  shortDesc: string
  longDesc: string
  yearStart: number
  yearEnd?: number | null
  region: string
  comuna?: string | null
  category: string
  era: string
}

export interface SourceSummary {
  citation: string
  author?: string | null
  year?: number | null
  url?: string | null
}

export interface RecreationRequest {
  event: EventContext
  targetYear: number
}

export interface RecreationResult {
  prompt: string
  negativePrompt?: string
  imageUrl: string
  thumbnailUrl: string
  model: string
  generationCostUsd?: number
}

export interface NarrativeResult {
  text: string
  model: string
  inputTokens: number
  outputTokens: number
  estimatedCostUsd: number
}
