import Link from 'next/link'
import { Button } from '@chile-historico/ui'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-6xl text-accent-gold">404</h1>
        <p className="mt-4 text-text-secondary">
          La página que buscas no existe o aún no ha sido publicada.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Volver al mapa</Link>
        </Button>
      </main>
      <SiteFooter />
    </>
  )
}
