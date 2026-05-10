import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata = { title: 'Política de privacidad' }

export default function PrivacidadPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-display text-4xl text-text-primary">Política de privacidad</h1>
        <p className="mt-3 text-xs text-text-secondary">
          Vigente desde el 1 de enero de 2026 · Conforme a Ley 21.719 de Chile.
        </p>
        <div className="prose prose-invert mt-6 space-y-4 text-sm text-text-secondary">
          <h2 className="text-accent-gold">Datos que recolectamos</h2>
          <ul className="list-disc pl-5">
            <li>
              Datos de cuenta cuando inicias sesión (nombre, correo electrónico, foto).
            </li>
            <li>
              Datos de uso anónimos: páginas visitadas, eventos consultados, agregados
              estadísticos.
            </li>
            <li>Cookies estrictamente necesarias para el funcionamiento del sitio.</li>
          </ul>
          <h2 className="text-accent-gold">Finalidades</h2>
          <p>
            Mantener tu sesión, atribuir tus contribuciones, mejorar el servicio. No
            comerciamos con tus datos.
          </p>
          <h2 className="text-accent-gold">Tus derechos (Ley 21.719)</h2>
          <p>
            Puedes solicitar acceso, rectificación, oposición, supresión, portabilidad y
            bloqueo de tus datos personales. Escríbenos a{' '}
            <a className="text-accent-gold underline" href="mailto:privacidad@chilehistorico.cl">
              privacidad@chilehistorico.cl
            </a>
            .
          </p>
          <h2 className="text-accent-gold">Encargados</h2>
          <p>
            Usamos servicios de terceros (Cloudflare, Replicate, Anthropic, Google) bajo
            sus respectivos términos. Las imágenes generadas por IA permanecen alojadas
            en nuestra infraestructura.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
