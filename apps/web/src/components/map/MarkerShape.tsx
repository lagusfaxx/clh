'use client'
import type { CategoryShape } from '@/lib/categories'

interface Props {
  shape: CategoryShape | string
  color: string
  size?: number
  ringColor?: string
  highlight?: boolean
}

/**
 * Marcador SVG con forma según categoría. Tamaño y color personalizables.
 * Si highlight=true se dibuja un anillo dorado externo (eventos featured
 * o con foto histórica / recreación IA disponible).
 */
export function MarkerShape({ shape, color, size = 18, ringColor, highlight }: Props) {
  const half = size / 2
  const ring = highlight ? ringColor ?? '#C9A75C' : 'transparent'
  const stroke = '#0F0E0C'
  const strokeW = 1.5
  const totalSize = size + (highlight ? 8 : 0)

  function path() {
    switch (shape) {
      case 'circle':
        return <circle cx={half} cy={half} r={half - strokeW} fill={color} stroke={stroke} strokeWidth={strokeW} />
      case 'square':
        return (
          <rect
            x={strokeW}
            y={strokeW}
            width={size - strokeW * 2}
            height={size - strokeW * 2}
            fill={color}
            stroke={stroke}
            strokeWidth={strokeW}
          />
        )
      case 'diamond':
        return (
          <polygon
            points={`${half},${strokeW} ${size - strokeW},${half} ${half},${size - strokeW} ${strokeW},${half}`}
            fill={color}
            stroke={stroke}
            strokeWidth={strokeW}
          />
        )
      case 'triangle':
        return (
          <polygon
            points={`${half},${strokeW} ${size - strokeW},${size - strokeW} ${strokeW},${size - strokeW}`}
            fill={color}
            stroke={stroke}
            strokeWidth={strokeW}
          />
        )
      case 'hexagon': {
        const r = half - strokeW
        const points = Array.from({ length: 6 }, (_, i) => {
          const a = (Math.PI / 3) * i - Math.PI / 2
          return `${half + r * Math.cos(a)},${half + r * Math.sin(a)}`
        }).join(' ')
        return <polygon points={points} fill={color} stroke={stroke} strokeWidth={strokeW} />
      }
      case 'star': {
        const rOuter = half - strokeW
        const rInner = rOuter / 2.4
        const points = Array.from({ length: 10 }, (_, i) => {
          const a = (Math.PI / 5) * i - Math.PI / 2
          const r = i % 2 === 0 ? rOuter : rInner
          return `${half + r * Math.cos(a)},${half + r * Math.sin(a)}`
        }).join(' ')
        return <polygon points={points} fill={color} stroke={stroke} strokeWidth={strokeW} />
      }
      case 'cross':
        return (
          <g fill={color} stroke={stroke} strokeWidth={strokeW}>
            <rect x={half - 2.5} y={strokeW} width={5} height={size - strokeW * 2} />
            <rect x={strokeW} y={half - 2.5} width={size - strokeW * 2} height={5} />
          </g>
        )
      default:
        return <circle cx={half} cy={half} r={half - strokeW} fill={color} stroke={stroke} strokeWidth={strokeW} />
    }
  }

  return (
    <svg
      width={totalSize}
      height={totalSize}
      viewBox={`${highlight ? -4 : 0} ${highlight ? -4 : 0} ${totalSize} ${totalSize}`}
      style={{ display: 'block' }}
    >
      {highlight && (
        <circle
          cx={half}
          cy={half}
          r={half + 2}
          fill="none"
          stroke={ring}
          strokeWidth={2}
          opacity={0.9}
        />
      )}
      {path()}
    </svg>
  )
}
