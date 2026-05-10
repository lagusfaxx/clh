import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata = { title: 'Sobre el proyecto' }

export default function SobrePage() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-display text-4xl text-text-primary">Sobre Chile Histórico</h1>
        <div className="editorial-prose mt-6 space-y-4">
          <p>
            Chile Histórico es un proyecto de divulgación que combina cartografía,
            archivo digital y herramientas de inteligencia artificial para acercar la
            historia del país a un público amplio. Nuestra base son fuentes verificadas
            provenientes principalmente de la Biblioteca Nacional de Chile y Memoria
            Chilena.
          </p>
          <p>
            Cuando no existen registros visuales históricos, generamos recreaciones
            interpretativas mediante modelos de imagen, siempre acompañadas de un aviso
            claro de que se trata de imágenes generadas y no de documentos.
          </p>
          <p>
            El proyecto es abierto a contribuciones de investigadores, profesores,
            estudiantes y entusiastas de la historia chilena. Cada propuesta pasa por
            curaduría humana antes de ser publicada.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
