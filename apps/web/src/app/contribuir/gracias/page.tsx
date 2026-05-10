import Link from 'next/link'
import { Button } from '@chile-historico/ui'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export default function GraciasPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl text-accent-gold">Gracias por tu aporte</h1>
        <p className="mt-3 text-text-secondary">
          Hemos recibido tu propuesta. Un curador la revisará y, de ser aprobada,
          aparecerá en el mapa público.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/">Volver al mapa</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contribuir">Registrar otro evento</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
