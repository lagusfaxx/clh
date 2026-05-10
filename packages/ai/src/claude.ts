import Anthropic from '@anthropic-ai/sdk'
import { buildNarrativeMessages, buildRecreationPromptMessages } from './prompts'
import type { EventContext, NarrativeResult, SourceSummary } from './types'

const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-haiku-4-5'

// Pricing aproximado claude-haiku-4-5 (USD por 1M tokens). Ajustar si cambia.
const HAIKU_INPUT_PER_M = 1.0
const HAIKU_OUTPUT_PER_M = 5.0

let _client: Anthropic | null = null

function getClient(): Anthropic {
  if (_client) return _client
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY no está configurada')
  }
  _client = new Anthropic({ apiKey })
  return _client
}

export function isClaudeAvailable(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY)
}

function estimateCost(inputTokens: number, outputTokens: number) {
  return (
    (inputTokens / 1_000_000) * HAIKU_INPUT_PER_M +
    (outputTokens / 1_000_000) * HAIKU_OUTPUT_PER_M
  )
}

/**
 * Genera narrativa histórica en español a partir de un evento y sus fuentes.
 * Tono: evocador pero riguroso. 400-600 palabras.
 */
export async function generateNarrative(
  event: EventContext,
  sources: SourceSummary[],
): Promise<NarrativeResult> {
  if (!isClaudeAvailable()) {
    return {
      text: buildMockNarrative(event),
      model: 'mock',
      inputTokens: 0,
      outputTokens: 0,
      estimatedCostUsd: 0,
    }
  }

  const client = getClient()
  const messages = buildNarrativeMessages(event, sources)

  const response = await client.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: 1200,
    system: messages.system,
    messages: [{ role: 'user', content: messages.user }],
  })

  const textBlock = response.content.find((c) => c.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('Claude no devolvió bloque de texto')
  }

  const inputTokens = response.usage.input_tokens
  const outputTokens = response.usage.output_tokens

  return {
    text: textBlock.text.trim(),
    model: response.model,
    inputTokens,
    outputTokens,
    estimatedCostUsd: estimateCost(inputTokens, outputTokens),
  }
}

/**
 * Convierte un EventContext en prompt optimizado en inglés para Flux Schnell.
 * Devuelve también un negative prompt opcional.
 */
export async function generateImagePrompt(
  event: EventContext,
  targetYear: number,
): Promise<{ prompt: string; negativePrompt: string }> {
  if (!isClaudeAvailable()) {
    return buildMockImagePrompt(event, targetYear)
  }

  const client = getClient()
  const messages = buildRecreationPromptMessages(event, targetYear)

  const response = await client.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: 600,
    system: messages.system,
    messages: [{ role: 'user', content: messages.user }],
  })

  const textBlock = response.content.find((c) => c.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('Claude no devolvió bloque de texto')
  }

  return parsePromptResponse(textBlock.text)
}

function parsePromptResponse(text: string): {
  prompt: string
  negativePrompt: string
} {
  const promptMatch = text.match(/PROMPT:\s*([\s\S]*?)(?:\nNEGATIVE:|$)/i)
  const negativeMatch = text.match(/NEGATIVE:\s*([\s\S]*?)$/i)

  const prompt = (promptMatch?.[1] ?? text).trim()
  const negativePrompt = (
    negativeMatch?.[1] ??
    'modern cars, modern clothing, anachronisms, blurry, low quality, watermark, text overlays, contemporary buildings'
  ).trim()

  return { prompt, negativePrompt }
}

function buildMockNarrative(event: EventContext): string {
  return `[Narrativa mock — sin ANTHROPIC_API_KEY configurada]\n\n${event.title} (${event.yearStart}) tuvo lugar en ${event.comuna ?? event.region}, Chile. ${event.shortDesc}\n\n${event.longDesc}`
}

function buildMockImagePrompt(event: EventContext, targetYear: number) {
  return {
    prompt: `Historical sepia photograph of ${event.title} at ${event.comuna ?? event.region}, Chile, year ${targetYear}, vintage albumen print style, weathered paper texture, period-accurate architecture and clothing, atmospheric haze, golden hour light`,
    negativePrompt:
      'modern cars, modern clothing, anachronisms, blurry, low quality, watermark, text overlays, contemporary buildings',
  }
}
