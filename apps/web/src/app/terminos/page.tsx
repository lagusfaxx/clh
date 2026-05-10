import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata = { title: 'Términos de uso' }

export default function TerminosPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-display text-4xl text-text-primary">Términos de uso</h1>
        <div className="prose prose-invert mt-6 space-y-4 text-sm text-text-secondary">
          <p>
            Al usar Chile Histórico aceptas estos términos. El contenido publicado es
            con fines educativos y de divulgación.
          </p>
          <h2 className="text-accent-gold">Contenido de fuentes</h2>
          <p>
            Las imágenes y textos provenientes de Biblioteca Nacional, Memoria Chilena y
            otros archivos se publican respetando sus licencias correspondientes. Si
            detectas un uso indebido, escríbenos a{' '}
            <a className="text-accent-gold underline" href="mailto:legal@chilehistorico.cl">
              legal@chilehistorico.cl
            </a>
            .
          </p>
          <h2 className="text-accent-gold">Recreaciones generadas por IA</h2>
          <p>
            Son interpretativas y se identifican como tales. No deben citarse como
            documentos históricos.
          </p>
          <h2 className="text-accent-gold">Contribuciones</h2>
          <p>
            Al enviar una contribución otorgas a Chile Histórico una licencia no
            exclusiva, gratuita e irrevocable para publicarla. Manteniendo siempre la
            atribución a tu nombre o seudónimo.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
