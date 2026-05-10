import { describe, expect, it } from 'vitest'
import { formatYear, formatYearRange, formatNarrativeDate, parseHistoricalYear } from './format'

describe('formatYear', () => {
  it('positivos sin sufijo', () => {
    expect(formatYear(1541)).toBe('1541')
  })
  it('negativos con a.C.', () => {
    expect(formatYear(-1500)).toBe('1500 a.C.')
  })
})

describe('formatYearRange', () => {
  it('sin yearEnd', () => {
    expect(formatYearRange(1541)).toBe('1541')
  })
  it('rango', () => {
    expect(formatYearRange(1861, 1883)).toBe('1861 – 1883')
  })
  it('iguales no se duplican', () => {
    expect(formatYearRange(2010, 2010)).toBe('2010')
  })
})

describe('formatNarrativeDate', () => {
  it('renderiza correctamente', () => {
    expect(formatNarrativeDate('1818-02-12')).toBe('12 de febrero de 1818')
  })
  it('acepta Date', () => {
    expect(formatNarrativeDate(new Date('1973-09-11'))).toBe('11 de septiembre de 1973')
  })
  it('null para inválido', () => {
    expect(formatNarrativeDate('not a date')).toBeNull()
  })
})

describe('parseHistoricalYear', () => {
  it('1541', () => expect(parseHistoricalYear('1541')).toBe(1541))
  it('-1500', () => expect(parseHistoricalYear('-1500')).toBe(-1500))
  it('1500 a.C.', () => expect(parseHistoricalYear('1500 a.C.')).toBe(-1500))
  it('1500 ac', () => expect(parseHistoricalYear('1500 ac')).toBe(-1500))
  it('siglo XVI -> 1550', () => expect(parseHistoricalYear('siglo XVI')).toBe(1550))
  it('vacío -> null', () => expect(parseHistoricalYear('')).toBeNull())
})
