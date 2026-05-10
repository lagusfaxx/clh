'use client'
import { useState } from 'react'
import { Headphones, Loader2, Pause, Play } from 'lucide-react'
import { Button } from '@chile-historico/ui'

interface Props {
  eventSlug: string
  hasExisting: boolean
}

export function EventNarration({ eventSlug, hasExisting }: Props) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null)

  async function loadOrGenerate() {
    setLoading(true)
    try {
      let url: string | null = null
      if (hasExisting) {
        const res = await fetch(`/api/events/${eventSlug}/narration`)
        if (res.ok) {
          const data = await res.json()
          url = data.url ?? null
        }
      }

      if (!url) {
        const res = await fetch(`/api/events/${eventSlug}/narration`, { method: 'POST' })
        if (res.ok) {
          const data = await res.json()
          url = data.url ?? null
        }
      }

      if (url) {
        setAudioUrl(url)
        const a = new Audio(url)
        setAudioEl(a)
        a.addEventListener('ended', () => setPlaying(false))
        a.play()
        setPlaying(true)
      }
    } finally {
      setLoading(false)
    }
  }

  function toggle() {
    if (!audioEl) return loadOrGenerate()
    if (playing) {
      audioEl.pause()
      setPlaying(false)
    } else {
      audioEl.play()
      setPlaying(true)
    }
  }

  if (audioUrl) {
    return (
      <Button variant="outline" onClick={toggle}>
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {playing ? 'Pausar' : 'Reanudar'} narración
      </Button>
    )
  }

  return (
    <Button variant="outline" onClick={loadOrGenerate} disabled={loading}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Headphones className="h-4 w-4" />}
      Escuchar narración
    </Button>
  )
}
