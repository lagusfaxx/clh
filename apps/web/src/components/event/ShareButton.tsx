'use client'
import { Share2 } from 'lucide-react'
import { Button } from '@chile-historico/ui'

interface Props {
  title: string
  slug: string
}

export function ShareButton({ title, slug }: Props) {
  async function share() {
    const url = `${window.location.origin}/evento/${slug}`
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        alert('Enlace copiado al portapapeles')
      } catch {
        prompt('Copia el enlace:', url)
      }
    }
  }

  return (
    <Button variant="outline" onClick={share}>
      <Share2 className="h-4 w-4" />
      Compartir
    </Button>
  )
}
