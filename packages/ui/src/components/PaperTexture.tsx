import { cn } from '../cn'

/**
 * Textura sutil de papel envejecido vía SVG inline. No requiere assets externos.
 * Aplicar como overlay decorativo (pointer-events-none) sobre fondos.
 */
export function PaperTexture({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay',
        className,
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.78  0 0 0 0 0.69  0 0 0 0 0.50  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        backgroundSize: '220px 220px',
      }}
    />
  )
}
