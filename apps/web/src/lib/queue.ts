import { Queue, type ConnectionOptions } from 'bullmq'

const connection: ConnectionOptions = {
  host: parseRedisUrl(process.env.REDIS_URL ?? 'redis://localhost:6379').host,
  port: parseRedisUrl(process.env.REDIS_URL ?? 'redis://localhost:6379').port,
  password: parseRedisUrl(process.env.REDIS_URL ?? 'redis://localhost:6379').password,
}

function parseRedisUrl(url: string) {
  const u = new URL(url)
  return {
    host: u.hostname,
    port: Number(u.port || 6379),
    password: u.password || undefined,
  }
}

export const QUEUES = {
  recreation: 'recreation',
  narrative: 'narrative',
  narration: 'narration',
} as const

export interface RecreationJobData {
  recreationId: string
  eventId: string
  targetYear: number
}

export interface NarrationJobData {
  eventId: string
}

let _recreationQueue: Queue<RecreationJobData> | null = null
let _narrationQueue: Queue<NarrationJobData> | null = null

export function getRecreationQueue() {
  if (_recreationQueue) return _recreationQueue
  _recreationQueue = new Queue<RecreationJobData>(QUEUES.recreation, {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
      removeOnComplete: { count: 200 },
      removeOnFail: { count: 500 },
    },
  })
  return _recreationQueue
}

export function getNarrationQueue() {
  if (_narrationQueue) return _narrationQueue
  _narrationQueue = new Queue<NarrationJobData>(QUEUES.narration, {
    connection,
    defaultJobOptions: {
      attempts: 2,
      backoff: { type: 'exponential', delay: 3000 },
      removeOnComplete: { count: 200 },
    },
  })
  return _narrationQueue
}

export const queueConnection = connection
