import type { ConnectionOptions } from 'bullmq'

function parseRedisUrl(url: string) {
  const u = new URL(url)
  return {
    host: u.hostname,
    port: Number(u.port || 6379),
    password: u.password || undefined,
  }
}

const url = process.env.REDIS_URL ?? 'redis://localhost:6379'
const parsed = parseRedisUrl(url)

export const connection: ConnectionOptions = {
  host: parsed.host,
  port: parsed.port,
  password: parsed.password,
}

export const QUEUES = {
  recreation: 'recreation',
  narrative: 'narrative',
  narration: 'narration',
} as const
