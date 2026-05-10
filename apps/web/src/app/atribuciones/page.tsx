import { prisma } from '@chile-historico/db'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { SOURCE_TYPE_META } from '@/lib/categories'

export const metadata = { title: 'Atribuciones y fuentes' }
export const revalidate = 600

export default async function AtribucionesPage() {
  const sources = await prisma.source.findMany({
    where: { event: { status: 'PUBLISHED' } },
    orderBy: [{ type: 'asc' }, { author: 'asc' }],
    take: 1000,
  })

  const groupedByType = sources.reduce<Record<string, typeof sources>>((acc, s) => {
    if (!acc[s.type]) acc[s.type] = []
    acc[s.type]!.push(s)
    return acc
  }, {})

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl text-text-primary">Atribuciones y fuentes</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Listado completo de las fuentes que sustentan los eventos publicados en Chile
          Histórico. Reconocemos especialmente el aporte de la Biblioteca Nacional de
          Chile, Memoria Chilena y el Archivo Nacional, cuyos catálogos hacen posible
          este proyecto.
        </p>

        <div className="mt-8 rounded-sm border border-accent-gold/30 bg-accent-gold/5 p-4 text-sm text-text-secondary">
          <p>
            <strong className="text-accent-gold">Sobre las recreaciones IA:</strong> Las
            imágenes generadas con inteligencia artificial son interpretativas y no
            constituyen registro histórico documentado. Cada recreación lleva un
            disclaimer visible en su pie de imagen.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {Object.entries(groupedByType).map(([type, items]) => (
            <section key={type}>
              <h2 className="mb-3 font-display text-2xl text-accent-gold">
                {SOURCE_TYPE_META[type as keyof typeof SOURCE_TYPE_META]}
              </h2>
              <ul className="space-y-2 text-sm">
                {items.map((s) => (
                  <li key={s.id} className="border-l-2 border-accent-gold/40 pl-3 text-text-secondary">
                    {s.citation}
                    {s.signature && (
                      <span className="ml-2 font-mono text-xs text-accent-gold">{s.signature}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
