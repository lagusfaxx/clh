import Replicate from 'replicate'

const DEFAULT_MODEL =
  (process.env.REPLICATE_MODEL as `${string}/${string}` | `${string}/${string}:${string}`) ??
  'black-forest-labs/flux-schnell'

let _client: Replicate | null = null

function getClient(): Replicate {
  if (_client) return _client
  const auth = process.env.REPLICATE_API_TOKEN
  if (!auth) throw new Error('REPLICATE_API_TOKEN no está configurada')
  _client = new Replicate({ auth })
  return _client
}

export function isReplicateAvailable(): boolean {
  return Boolean(process.env.REPLICATE_API_TOKEN)
}

export interface ImageGenerationInput {
  prompt: string
  negativePrompt?: string
  width?: number
  height?: number
  steps?: number
  guidance?: number
  seed?: number
}

export interface ImageGenerationOutput {
  buffer: Buffer
  contentType: string
  model: string
  generationCostUsd: number
}

// Costo aproximado por imagen Flux Schnell ~ USD 0.003
const FLUX_SCHNELL_COST = 0.003

export async function generateImage(
  input: ImageGenerationInput,
): Promise<ImageGenerationOutput> {
  if (!isReplicateAvailable()) {
    return generateMockImage(input)
  }

  const client = getClient()
  const modelInput: Record<string, unknown> = {
    prompt: input.prompt,
    aspect_ratio: '4:3',
    num_outputs: 1,
    num_inference_steps: input.steps ?? 4,
    guidance_scale: input.guidance ?? 3.5,
    output_format: 'webp',
    output_quality: 85,
  }
  if (input.seed) modelInput.seed = input.seed
  if (input.negativePrompt) modelInput.negative_prompt = input.negativePrompt

  const output = await client.run(DEFAULT_MODEL, { input: modelInput })

  // Replicate retorna URL(s) o stream(s) según el modelo
  const url = Array.isArray(output) ? output[0] : output
  const urlStr = typeof url === 'string' ? url : String(url)

  const res = await fetch(urlStr)
  if (!res.ok) {
    throw new Error(`Falló descarga de imagen Replicate: ${res.status}`)
  }
  const arrayBuf = await res.arrayBuffer()

  return {
    buffer: Buffer.from(arrayBuf),
    contentType: res.headers.get('content-type') ?? 'image/webp',
    model: DEFAULT_MODEL,
    generationCostUsd: FLUX_SCHNELL_COST,
  }
}

async function generateMockImage(
  _input: ImageGenerationInput,
): Promise<ImageGenerationOutput> {
  // 1x1 webp transparente como mock.
  const minimalWebp = Buffer.from(
    'UklGRhwAAABXRUJQVlA4TBAAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
    'base64',
  )
  return {
    buffer: minimalWebp,
    contentType: 'image/webp',
    model: 'mock',
    generationCostUsd: 0,
  }
}
