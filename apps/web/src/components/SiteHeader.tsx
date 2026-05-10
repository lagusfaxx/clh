import Link from 'next/link'
import { Button } from '@chile-historico/ui'
import { Compass, BookOpen, Plus } from 'lucide-react'
import { SearchBar } from './SearchBar'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg-primary/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between gap-2 px-3 md:gap-4 md:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="font-display text-base tracking-wide text-accent-gold md:text-xl">
            Chile Histórico
          </span>
        </Link>

        <div className="min-w-0 flex-1">
          <SearchBar />
        </div>

        <nav className="flex shrink-0 items-center gap-1 text-sm">
          <Button asChild variant="ghost" size="sm" className="px-2 md:px-3">
            <Link href="/" aria-label="Mapa">
              <Compass className="h-4 w-4" />
              <span className="hidden md:inline">Mapa</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="px-2 md:px-3">
            <Link href="/eventos" aria-label="Catálogo">
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">Catálogo</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="px-2 md:px-3">
            <Link href="/contribuir" aria-label="Contribuir">
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">Contribuir</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
