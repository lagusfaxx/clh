'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@chile-historico/ui'

const STORAGE_KEY = 'ch_cookie_consent_v1'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  function accept() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, at: Date.now() }))
    setVisible(false)
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(640px,92vw)] -translate-x-1/2 rounded-sm border border-border bg-bg-card p-4 shadow-paper">
      <p className="mb-3 text-sm text-text-secondary">
        Usamos cookies estrictamente necesarias para el funcionamiento del sitio y
        cookies analíticas anónimas para mejorar la experiencia. Puedes leer más en{' '}
        <Link href="/privacidad" className="text-accent-gold underline">
          nuestra política de privacidad
        </Link>
        .
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={accept}>
          Solo necesarias
        </Button>
        <Button size="sm" onClick={accept}>
          Aceptar todas
        </Button>
      </div>
    </div>
  )
}
