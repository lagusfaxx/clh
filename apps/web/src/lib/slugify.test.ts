import { describe, expect, it } from 'vitest'
import { slugify, uniqueSlug } from './slugify'

describe('slugify', () => {
  it('normaliza acentos', () => {
    expect(slugify('Concepción del Nuevo Extremo')).toBe('concepcion-del-nuevo-extremo')
  })
  it('limpia caracteres especiales', () => {
    expect(slugify('La Moneda — 11/9/1973')).toBe('la-moneda-11-9-1973')
  })
  it('trunca a 80 chars', () => {
    const long = 'a'.repeat(120)
    expect(slugify(long).length).toBeLessThanOrEqual(80)
  })
})

describe('uniqueSlug', () => {
  it('devuelve original si no existe', async () => {
    const r = await uniqueSlug('Hola Mundo', async () => false)
    expect(r).toBe('hola-mundo')
  })
  it('agrega sufijo si existe', async () => {
    const taken = new Set(['hola-mundo'])
    const r = await uniqueSlug('Hola Mundo', async (s) => taken.has(s))
    expect(r).toBe('hola-mundo-2')
  })
  it('itera hasta encontrar libre', async () => {
    const taken = new Set(['hola', 'hola-2', 'hola-3'])
    const r = await uniqueSlug('Hola', async (s) => taken.has(s))
    expect(r).toBe('hola-4')
  })
})
