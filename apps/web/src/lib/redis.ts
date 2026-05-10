import { Redis } from 'ioredis'

let _redis: Redis | null = null

export function getRedis(): Redis {
  if (_redis) return _redis
  const url = process.env.REDIS_URL ?? 'redis://localhost:6379'
  _redis = new Redis(url, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  })
  return _redis
}

const TTL_30_DAYS = 60 * 60 * 24 * 30

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const r = getRedis()
    const v = await r.get(key)
    if (!v) return null
    return JSON.parse(v) as T
  } catch (err) {
    console.warn('Redis cacheGet error:', err)
    return null
  }
}

export async function cacheSet<T>(
  key: string,
  value: T,
  ttlSeconds: number = TTL_30_DAYS,
): Promise<void> {
  try {
    const r = getRedis()
    await r.set(key, JSON.stringify(value), 'EX', ttlSeconds)
  } catch (err) {
    console.warn('Redis cacheSet error:', err)
  }
}

export async function cacheDel(pattern: string): Promise<void> {
  try {
    const r = getRedis()
    const keys = await r.keys(pattern)
    if (keys.length > 0) await r.del(...keys)
  } catch (err) {
    console.warn('Redis cacheDel error:', err)
  }
}
