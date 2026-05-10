import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'

let _client: S3Client | null = null

function getClient(): S3Client {
  if (_client) return _client
  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('R2_* env vars no están configuradas')
  }
  _client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  })
  return _client
}

export function isStorageAvailable(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY,
  )
}

export interface UploadResult {
  url: string
  key: string
  size: number
  contentType: string
  width?: number
  height?: number
}

/**
 * Sube buffer a R2. Si no hay credenciales, devuelve URL data: (mock dev).
 */
export async function uploadObject(params: {
  key: string
  buffer: Buffer
  contentType: string
  cacheControl?: string
}): Promise<UploadResult> {
  const bucket = process.env.R2_BUCKET ?? 'chilehistorico-media'
  const publicBase = process.env.R2_PUBLIC_URL ?? 'https://media.chilehistorico.cl'

  if (!isStorageAvailable()) {
    return {
      url: `data:${params.contentType};base64,${params.buffer.toString('base64')}`,
      key: params.key,
      size: params.buffer.length,
      contentType: params.contentType,
    }
  }

  const client = getClient()
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: params.key,
      Body: params.buffer,
      ContentType: params.contentType,
      CacheControl: params.cacheControl ?? 'public, max-age=31536000, immutable',
    }),
  )

  return {
    url: `${publicBase.replace(/\/+$/, '')}/${params.key}`,
    key: params.key,
    size: params.buffer.length,
    contentType: params.contentType,
  }
}

export async function deleteObject(key: string): Promise<void> {
  if (!isStorageAvailable()) return
  const bucket = process.env.R2_BUCKET ?? 'chilehistorico-media'
  const client = getClient()
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))
}

/**
 * Recibe imagen original y produce versión optimizada + thumbnail.
 * Sube ambas a R2 y devuelve sus URLs.
 */
export async function processAndUploadImage(params: {
  buffer: Buffer
  contentType: string
  pathPrefix: string
  baseName: string
}): Promise<{ original: UploadResult; thumbnail: UploadResult }> {
  const { buffer, pathPrefix, baseName } = params

  const original = sharp(buffer)
  const meta = await original.metadata()

  const fullBuf = await sharp(buffer)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer()

  const thumbBuf = await sharp(buffer)
    .resize({ width: 400, height: 300, fit: 'cover' })
    .webp({ quality: 78 })
    .toBuffer()

  const [originalUp, thumbUp] = await Promise.all([
    uploadObject({
      key: `${pathPrefix}/${baseName}.webp`,
      buffer: fullBuf,
      contentType: 'image/webp',
    }),
    uploadObject({
      key: `${pathPrefix}/${baseName}_thumb.webp`,
      buffer: thumbBuf,
      contentType: 'image/webp',
    }),
  ])

  return {
    original: {
      ...originalUp,
      width: meta.width,
      height: meta.height,
    },
    thumbnail: {
      ...thumbUp,
      width: 400,
      height: 300,
    },
  }
}
