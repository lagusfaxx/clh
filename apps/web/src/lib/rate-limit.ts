import { getRedis } from './redis'

/**
 * Rate limiting fixed-window simple usando Redis INCR/EXPIRE.
 * Para producción usar Upstash o sliding-window si se necesita más precisión.
 */
export async function checkRateLimit(params: {
  identifier: string
  limit?: number
  windowSeconds?: number
}): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  const limit = params.limit ?? Number(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE ?? 60)
  const window = params.windowSeconds ?? 60
  const key = `rl:${params.identifier}:${Math.floor(Date.now() / 1000 / window)}`

  try {
    const r = getRedis()
    const count = await r.incr(key)
    if (count === 1) await r.expire(key, window)

    return {
      allowed: count <= limit,
      remaining: Math.max(0, limit - count),
      resetIn: window - (Math.floor(Date.now() / 1000) % window),
    }
  } catch {
    // Si Redis cae, fail-open
    return { allowed: true, remaining: limit, resetIn: window }
  }
}
