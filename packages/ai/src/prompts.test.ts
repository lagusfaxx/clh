import { describe, expect, it } from 'vitest'
import { buildNarrativeMessages, buildRecreationPromptMessages } from './prompts'

const sampleEvent = {
  title: 'Fundación de Santiago',
  shortDesc: 'Pedro de Valdivia funda Santiago del Nuevo Extremo',
  longDesc: 'Hechos relacionados con la fundación...',
  yearStart: 1541,
  region: 'Metropolitana',
  comuna: 'Santiago',
  category: 'FUNDACION',
  era: 'CONQUISTA',
}

describe('buildNarrativeMessages', () => {
  it('incluye sistema con reglas estrictas', () => {
    const m = buildNarrativeMessages(sampleEvent, [])
    expect(m.system).toMatch(/historiador chileno/i)
    expect(m.system).toMatch(/NO inventes/)
  })

  it('renderiza fuentes con índice [n]', () => {
    const m = buildNarrativeMessages(sampleEvent, [
      { citation: 'BN-MS-001', author: 'Vicuña Mackenna', year: 1869 },
    ])
    expect(m.user).toContain('[1]')
    expect(m.user).toContain('Vicuña Mackenna')
  })

  it('usa marcador cuando no hay fuentes', () => {
    const m = buildNarrativeMessages(sampleEvent, [])
    expect(m.user).toMatch(/Sin fuentes registradas/i)
  })
})

describe('buildRecreationPromptMessages', () => {
  it('incluye año objetivo y pista fotográfica de la era', () => {
    const m = buildRecreationPromptMessages(sampleEvent, 1541)
    expect(m.user).toContain('1541')
    expect(m.user).toMatch(/painted illustration|engravings/i)
  })

  it('para 1880 sugiere albumen', () => {
    const m = buildRecreationPromptMessages(sampleEvent, 1880)
    expect(m.user).toMatch(/albumen/i)
  })

  it('para 1980 no pide sepia', () => {
    const m = buildRecreationPromptMessages(sampleEvent, 1980)
    expect(m.user).toMatch(/documentary|kodachrome/i)
  })
})
