import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider'
import { CookieBanner } from '@/components/CookieBanner'
import '../styles/globals.css'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXTAUTH_URL ?? 'https://chilehistorico.cl',
  ),
  title: {
    default: 'Chile Histórico — Mapa interactivo de la historia de Chile',
    template: '%s · Chile Histórico',
  },
  description:
    'Explora eventos, lugares y personajes de la historia de Chile en un mapa interactivo, con fuentes verificadas y recreaciones generadas por inteligencia artificial.',
  keywords: [
    'historia de Chile',
    'mapa histórico',
    'Memoria Chilena',
    'Biblioteca Nacional',
    'patrimonio Chile',
  ],
  authors: [{ name: 'Equipo Chile Histórico' }],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: '/',
    siteName: 'Chile Histórico',
    title: 'Chile Histórico',
    description:
      'Mapa interactivo de la historia de Chile, con fuentes verificadas y recreaciones IA.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0F0E0C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es-CL"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="paper-bg min-h-screen antialiased">
        <ReactQueryProvider>
          {children}
          <CookieBanner />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
