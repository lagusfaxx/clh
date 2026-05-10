'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X, Edit3 } from 'lucide-react'
import { Button } from '@chile-historico/ui'

export function CurateActions({ eventId }: { eventId: string }) {
  const [busy, setBusy] = useState(false)
  const router = useRouter()

  async function act(action: 'approve' | 'reject' | 'request_changes') {
    setBusy(true)
    try {
      const res = await fetch(`/api/admin/curaduria/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      if (!res.ok) throw new Error()
      router.refresh()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-2">
      <Button size="sm" disabled={busy} onClick={() => act('approve')}>
        <Check className="h-4 w-4" />
        Publicar
      </Button>
      <Button size="sm" variant="outline" disabled={busy} onClick={() => act('request_changes')}>
        <Edit3 className="h-4 w-4" />
        Pedir cambios
      </Button>
      <Button size="sm" variant="rust" disabled={busy} onClick={() => act('reject')}>
        <X className="h-4 w-4" />
        Rechazar
      </Button>
    </div>
  )
}
