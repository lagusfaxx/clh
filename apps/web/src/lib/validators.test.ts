import { describe, expect, it } from 'vitest'
import {
  createEventSchema,
  recreationRequestSchema,
  eventsListQuerySchema,
} from './validators'

describe('createEventSchema', () => {
  it('rechaza eventos sin fuentes', () => {
    const r = createEventSchema.safeParse({
      title: 'Evento test',
      shortDesc: 'Resumen breve de prueba',
      longDesc: 'A'.repeat(60),
      yearStart: 2000,
      category: 'PATRIMONIO',
      era: 'TRANSICION',
      latitude: -33.4,
      longitude: -70.6,
      region: 'Metropolitana',
      sources: [],
    })
    expect(r.success).toBe(false)
  })

  it('acepta evento bien formado', () => {
    const r = createEventSchema.safeParse({
      title: 'Evento test',
      shortDesc: 'Resumen breve de prueba',
      longDesc: 'A'.repeat(80),
      yearStart: 2000,
      category: 'PATRIMONIO',
      era: 'TRANSICION',
      latitude: -33.4,
      longitude: -70.6,
      region: 'Metropolitana',
      sources: [
        {
          type: 'BIBLIOTECA_NACIONAL',
          title: 'Fuente test',
          citation: 'Cita formal de la fuente.',
        },
      ],
    })
    expect(r.success).toBe(true)
  })

  it('rechaza coordenadas fuera de rango', () => {
    const r = createEventSchema.safeParse({
      title: 'X',
      shortDesc: 'X'.repeat(15),
      longDesc: 'X'.repeat(80),
      yearStart: 2000,
      category: 'PATRIMONIO',
      era: 'TRANSICION',
      latitude: 200,
      longitude: -70,
      region: 'Metropolitana',
      sources: [
        {
          type: 'OTHER',
          title: 'X',
          citation: 'X'.repeat(15),
        },
      ],
    })
    expect(r.success).toBe(false)
  })
})

describe('recreationRequestSchema', () => {
  it('acepta payload válido', () => {
    const r = recreationRequestSchema.safeParse({ eventId: 'abc', targetYear: 1850 })
    expect(r.success).toBe(true)
  })
  it('rechaza año fuera de rango', () => {
    const r = recreationRequestSchema.safeParse({ eventId: 'abc', targetYear: 9999 })
    expect(r.success).toBe(false)
  })
})

describe('eventsListQuerySchema', () => {
  it('coerce números desde string', () => {
    const r = eventsListQuerySchema.safeParse({
      page: '2',
      pageSize: '50',
    })
    expect(r.success).toBe(true)
    if (r.success) {
      expect(r.data.page).toBe(2)
      expect(r.data.pageSize).toBe(50)
    }
  })
})
