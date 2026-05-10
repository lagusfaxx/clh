import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-secondary py-8 text-sm text-text-secondary">
      <div className="container grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="mb-2 font-display text-base text-accent-gold">Chile Histórico</h3>
          <p className="text-xs leading-relaxed">
            Proyecto de divulgación histórica con fuentes verificadas, recreaciones
            generadas por IA, y una mirada respetuosa al patrimonio nacional.
          </p>
        </div>
        <div>
          <h4 className="mb-2 text-xs uppercase tracking-wider text-text-secondary/70">
            Navegación
          </h4>
          <ul className="space-y-1 text-xs">
            <li><Link href="/" className="hover:text-accent-gold">Mapa</Link></li>
            <li><Link href="/eventos" className="hover:text-accent-gold">Catálogo</Link></li>
            <li><Link href="/contribuir" className="hover:text-accent-gold">Contribuir</Link></li>
            <li><Link href="/atribuciones" className="hover:text-accent-gold">Atribuciones</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-xs uppercase tracking-wider text-text-secondary/70">
            Legal
          </h4>
          <ul className="space-y-1 text-xs">
            <li><Link href="/privacidad" className="hover:text-accent-gold">Privacidad</Link></li>
            <li><Link href="/terminos" className="hover:text-accent-gold">Términos</Link></li>
            <li><Link href="/sobre" className="hover:text-accent-gold">Sobre el proyecto</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mt-6 border-t border-border pt-4 text-center text-xs">
        © 2026 Chile Histórico · Las recreaciones generadas con inteligencia artificial son
        interpretativas y no constituyen registro histórico documentado.
      </div>
    </footer>
  )
}
