/**
 * Formateo histórico de años.
 * - 1541        -> "1541"
 * - -1500       -> "1500 a.C."
 * - rango 1861-1883 -> "1861 – 1883"
 */
export function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} a.C.`
  return String(year)
}

export function formatYearRange(yearStart: number, yearEnd?: number | null): string {
  if (yearEnd && yearEnd !== yearStart) {
    return `${formatYear(yearStart)} – ${formatYear(yearEnd)}`
  }
  return formatYear(yearStart)
}

const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
]

/**
 * Devuelve fecha narrativa "12 de febrero de 1541".
 * Acepta Date o string ISO. Devuelve null para entradas inválidas.
 */
export function formatNarrativeDate(input: Date | string | null | undefined): string | null {
  if (!input) return null
  const d = typeof input === 'string' ? new Date(input) : input
  if (Number.isNaN(d.getTime())) return null
  const day = d.getUTCDate()
  const month = MONTHS[d.getUTCMonth()]
  const year = d.getUTCFullYear()
  return `${day} de ${month} de ${year}`
}

/**
 * Parsea texto "aC/dC" simple. Acepta:
 *   "1541"           -> 1541
 *   "-1500"          -> -1500
 *   "1500 a.C."      -> -1500
 *   "1500 aC"        -> -1500
 *   "1500 ac"        -> -1500
 *   "siglo XVI"      -> 1550 (mediano del siglo)
 */
export function parseHistoricalYear(input: string): number | null {
  const trimmed = input.trim()
  if (!trimmed) return null

  const sigloMatch = trimmed.match(/siglo\s+([ivxlcdm]+)/i)
  if (sigloMatch) {
    const num = romanToInt(sigloMatch[1].toUpperCase())
    if (num) return (num - 1) * 100 + 50
  }

  const acRegex = /(-?\d+)\s*(a\.?\s*c\.?|ac|antes de cristo)/i
  const m = trimmed.match(acRegex)
  if (m) return -Math.abs(parseInt(m[1], 10))

  const num = parseInt(trimmed.replace(/[^\d-]/g, ''), 10)
  return Number.isNaN(num) ? null : num
}

function romanToInt(s: string): number | null {
  const map: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
  }
  let result = 0
  for (let i = 0; i < s.length; i++) {
    const cur = map[s[i]!]
    const next = map[s[i + 1] ?? '']
    if (cur === undefined) return null
    if (next !== undefined && cur < next) result -= cur
    else result += cur
  }
  return result
}
