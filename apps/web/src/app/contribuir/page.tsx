import { redirect } from 'next/navigation'
import { auth, hasRole } from '@/lib/auth'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { ContributeForm } from '@/components/forms/ContributeForm'
import { Button } from '@chile-historico/ui'
import Link from 'next/link'

export const metadata = { title: 'Contribuir' }

export default async function ContribuirPage() {
  const session = await auth()

  if (!session?.user) {
    return (
      <>
        <SiteHeader />
        <main className="container mx-auto max-w-2xl px-4 py-16">
          <h1 className="font-display text-4xl text-text-primary">Contribuir un evento</h1>
          <p className="mt-3 text-text-secondary">
            Para registrar nuevos eventos históricos necesitas iniciar sesión y tener
            rol de contribuidor.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link href="/login">Iniciar sesión</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/sobre">Cómo participar</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  if (!hasRole(session.user.role, 'CONTRIBUTOR')) {
    return (
      <>
        <SiteHeader />
        <main className="container mx-auto max-w-2xl px-4 py-16">
          <h1 className="font-display text-4xl text-text-primary">Solicitud pendiente</h1>
          <p className="mt-3 text-text-secondary">
            Tu cuenta aún no tiene permisos de contribuidor. Escríbenos a
            <a className="ml-1 text-accent-gold underline" href="mailto:contribuir@chilehistorico.cl">
              contribuir@chilehistorico.cl
            </a>{' '}
            para solicitar el rol.
          </p>
        </main>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl text-text-primary">Contribuir un evento</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Registra un evento histórico con al menos una fuente verificable. Tu propuesta
          quedará en estado <em>Pendiente de revisión</em> hasta que un curador la apruebe.
        </p>
        <div className="mt-8">
          <ContributeForm />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
