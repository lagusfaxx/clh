import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),

  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().optional(),
  NEXT_PUBLIC_MAPBOX_STYLE: z
    .string()
    .default('mapbox://styles/mapbox/dark-v11'),

  ANTHROPIC_API_KEY: z.string().optional(),
  REPLICATE_API_TOKEN: z.string().optional(),

  R2_ACCOUNT_ID: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_BUCKET: z.string().default('chilehistorico-media'),
  R2_PUBLIC_URL: z.string().url().default('https://media.chilehistorico.cl'),

  ELEVENLABS_API_KEY: z.string().optional(),

  ENABLE_AI_GENERATION: z
    .string()
    .default('true')
    .transform((v) => v === 'true'),
  ENABLE_TTS: z
    .string()
    .default('true')
    .transform((v) => v === 'true'),

  RATE_LIMIT_REQUESTS_PER_MINUTE: z
    .string()
    .default('60')
    .transform((v) => parseInt(v, 10)),
})

export type Env = z.infer<typeof envSchema>

let _env: Env | null = null

export function env(): Env {
  if (_env) return _env
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    console.error('Variables de entorno inválidas:', parsed.error.flatten().fieldErrors)
    throw new Error('Variables de entorno inválidas')
  }
  _env = parsed.data
  return _env
}

// Cliente expone solo NEXT_PUBLIC_*
export const clientEnv = {
  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '',
  mapboxStyle:
    process.env.NEXT_PUBLIC_MAPBOX_STYLE ?? 'mapbox://styles/mapbox/dark-v11',
}
