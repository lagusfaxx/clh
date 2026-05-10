import Link from 'next/link'
import { signIn } from '@/lib/auth'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Button } from '@chile-historico/ui'

export const metadata = { title: 'Iniciar sesión' }

export default function LoginPage() {
  const hasGoogle = !!process.env.GOOGLE_CLIENT_ID

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-4xl text-text-primary">Iniciar sesión</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Inicia sesión para contribuir eventos y participar en la curaduría.
        </p>
        <div className="mt-8 space-y-3">
          {hasGoogle ? (
            <form
              action={async () => {
                'use server'
                await signIn('google', { redirectTo: '/contribuir' })
              }}
            >
              <Button type="submit" className="w-full">
                Iniciar sesión con Google
              </Button>
            </form>
          ) : (
            <p className="rounded-sm border border-border bg-bg-secondary p-3 text-xs text-text-secondary">
              No hay proveedores de autenticación configurados. Define
              <code className="mx-1 font-mono">GOOGLE_CLIENT_ID</code> y
              <code className="mx-1 font-mono">GOOGLE_CLIENT_SECRET</code> en tu archivo
              <code className="mx-1 font-mono">.env</code>.
            </p>
          )}
        </div>
        <p className="mt-6 text-center text-xs text-text-secondary">
          Al iniciar sesión aceptas nuestros{' '}
          <Link href="/terminos" className="text-accent-gold underline">
            términos
          </Link>{' '}
          y{' '}
          <Link href="/privacidad" className="text-accent-gold underline">
            política de privacidad
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
