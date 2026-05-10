import Link from 'next/link'
import { Button } from '@chile-historico/ui'
import { Compass, BookOpen, Plus } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg-primary/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl tracking-wide text-accent-gold">
            Chile Histórico
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <Compass className="h-4 w-4" />
              Mapa
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/eventos">
              <BookOpen className="h-4 w-4" />
              Catálogo
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/contribuir">
              <Plus className="h-4 w-4" />
              Contribuir
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
