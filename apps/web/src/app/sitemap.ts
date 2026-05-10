import type { MetadataRoute } from 'next'
import { prisma } from '@chile-historico/db'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXTAUTH_URL ?? 'https://chilehistorico.cl'
  const events = await prisma.historicalEvent.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true },
    take: 5000,
  })
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/eventos`, lastModified: new Date() },
    { url: `${base}/contribuir`, lastModified: new Date() },
    { url: `${base}/atribuciones`, lastModified: new Date() },
    ...events.map((e) => ({
      url: `${base}/evento/${e.slug}`,
      lastModified: e.updatedAt,
    })),
  ]
}
