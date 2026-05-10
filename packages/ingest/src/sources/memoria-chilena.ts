/**
 * Stub de ingestor para Memoria Chilena.
 *
 * Memoria Chilena no expone API pública estable a 2026; la ingesta debe
 * realizarse mediante scraping respetuoso del sitemap.xml y de las
 * licencias de cada minisitio. Este módulo define la interfaz; la
 * implementación real se documenta en docs/ingest.md.
 */
import type { SeedEvent } from '../types'

export interface MCQuery {
  topic: string
  limit?: number
}

export async function searchMemoriaChilena(_q: MCQuery): Promise<SeedEvent[]> {
  console.warn(
    '[ingest:mc] Stub no implementado. Implementar scraper respetando robots.txt.',
  )
  return []
}

if (require.main === module) {
  searchMemoriaChilena({ topic: 'Salitre', limit: 5 })
    .then((res) => console.log(JSON.stringify(res, null, 2)))
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
}
