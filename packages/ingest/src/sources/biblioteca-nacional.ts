/**
 * Stub de ingestor para Biblioteca Nacional de Chile.
 *
 * Estado: scaffold. La ingesta real requiere acuerdos institucionales y
 * uso de la API/OAI-PMH del repositorio digital. Este archivo define
 * la interfaz esperada y un mock que produce el tipo SeedEvent.
 */
import type { SeedEvent } from '../types'

export interface BNQuery {
  collection?: 'manuscritos' | 'fotografias' | 'periodicos' | 'libros'
  query: string
  limit?: number
}

/**
 * Devuelve eventos derivados de búsqueda en BN. En producción debe consumir
 * la API de la Biblioteca Nacional Digital de Chile.
 */
export async function searchBibliotecaNacional(_q: BNQuery): Promise<SeedEvent[]> {
  console.warn(
    '[ingest:bn] Stub no implementado. Configurar credenciales y endpoint BNDigital.',
  )
  return []
}

if (require.main === module) {
  searchBibliotecaNacional({ query: 'Pedro de Valdivia', limit: 5 })
    .then((res) => console.log(JSON.stringify(res, null, 2)))
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
}
