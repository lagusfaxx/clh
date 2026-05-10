import type { EventContext, SourceSummary } from './types'

const NARRATIVE_SYSTEM = `Eres un historiador chileno especializado en divulgación. Escribes en español neutral, con tono evocador pero riguroso, basado únicamente en las fuentes provistas. Reglas estrictas:
- NO inventes datos no presentes en las fuentes.
- Cita inline con [n] cuando uses una fuente específica.
- Inicia con una frase evocadora que sitúe al lector en el momento histórico.
- Termina conectando con el presente o con el legado del evento.
- 400-600 palabras.
- No uses títulos ni encabezados; texto corrido.
- Evita anglicismos.`

const IMAGE_PROMPT_SYSTEM = `Eres un experto en fotografía histórica e historia visual de Chile. Tu tarea es generar prompts en INGLÉS para Flux Schnell que produzcan imágenes con estética de fotografía histórica del año indicado, evocadoras y verosímiles. Reglas:
- Considera el estado real del lugar en el año pedido (arquitectura, vestimenta, vegetación).
- Especifica técnica fotográfica coherente con la época (daguerrotipo 1840s, albumen 1850-90, gelatina 1900+, color 1960+).
- Ambiente sepia/desaturado para fotografías anteriores a 1960.
- Sin texto, sin watermarks, sin elementos modernos anacrónicos.
- Devuelve EXACTAMENTE en este formato:
PROMPT: <prompt en inglés en una sola línea, 60-90 palabras>
NEGATIVE: <negative prompt corto en inglés>`

function eraPhotographyHint(year: number): string {
  if (year < 1840) return 'painted illustration in the style of period engravings, no photography'
  if (year < 1860) return 'daguerreotype style, silver-mirror surface, slight blur, 1850s photography'
  if (year < 1900) return 'albumen print, sepia tones, weathered paper, 1880s vintage photography'
  if (year < 1940) return 'silver gelatin print, black and white, fine grain, early 20th century photography'
  if (year < 1970) return 'mid-century photography, slight color shift, kodachrome tones'
  return 'documentary photography of the era'
}

export function buildNarrativeMessages(event: EventContext, sources: SourceSummary[]) {
  const sourcesText = sources.length
    ? sources
        .map((s, i) => {
          const author = s.author ? `${s.author}` : 'Anónimo'
          const yr = s.year ? ` (${s.year})` : ''
          return `[${i + 1}] ${author}${yr}. ${s.citation}`
        })
        .join('\n')
    : '[Sin fuentes registradas — describe sólo lo conocido públicamente sin atribuir hechos específicos]'

  const periodText = event.yearEnd
    ? `${event.yearStart} – ${event.yearEnd}`
    : `${event.yearStart}`

  const user = `Evento: ${event.title}
Período: ${periodText}
Lugar: ${event.comuna ? event.comuna + ', ' : ''}${event.region}
Categoría: ${event.category}
Era histórica: ${event.era}

Resumen breve:
${event.shortDesc}

Contexto extendido:
${event.longDesc}

Fuentes disponibles:
${sourcesText}

Escribe la narrativa siguiendo las reglas del sistema.`

  return { system: NARRATIVE_SYSTEM, user }
}

export function buildRecreationPromptMessages(event: EventContext, targetYear: number) {
  const user = `Evento histórico: ${event.title}
Lugar: ${event.comuna ? event.comuna + ', ' : ''}${event.region}, Chile
Año a recrear: ${targetYear}
Categoría: ${event.category}

Contexto: ${event.shortDesc}

Pista de fotografía para la época: ${eraPhotographyHint(targetYear)}

Genera el PROMPT y NEGATIVE en el formato exacto solicitado.`

  return { system: IMAGE_PROMPT_SYSTEM, user }
}
