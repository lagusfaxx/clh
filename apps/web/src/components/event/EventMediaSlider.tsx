'use client'
import { useEffect, useState } from 'react'
import { Camera, Sparkles, Map as MapIcon, Loader2 } from 'lucide-react'
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@chile-historico/ui'
import { clientEnv } from '@/lib/env'

interface MediaItem {
  id: string
  url: string
  thumbnailUrl?: string | null
  caption?: string | null
  attribution: string
  yearTaken?: number | null
}

interface Recreation {
  id: string
  imageUrl: string | null
  thumbnailUrl?: string | null
  targetYear: number
  status: string
}

interface Props {
  eventId: string
  eventSlug: string
  media: MediaItem[]
  recreations: Recreation[]
  latitude: number
  longitude: number
  targetYearDefault: number
}

export function EventMediaSlider({
  eventId,
  media,
  recreations,
  latitude,
  longitude,
  targetYearDefault,
}: Props) {
  const [tab, setTab] = useState<'historic' | 'ai' | 'now'>(
    media.length > 0 ? 'historic' : recreations.length > 0 ? 'ai' : 'now',
  )
  const [generating, setGenerating] = useState(false)
  const [pollId, setPollId] = useState<string | null>(null)
  const [aiList, setAiList] = useState<Recreation[]>(recreations)

  async function requestRecreation() {
    if (generating) return
    setGenerating(true)
    try {
      const res = await fetch('/api/recreations/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, targetYear: targetYearDefault }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Error desconocido')
      setPollId(data.recreation.id)
    } catch (err) {
      console.error(err)
      setGenerating(false)
    }
  }

  useEffect(() => {
    if (!pollId) return
    const interval = setInterval(async () => {
      const r = await fetch(`/api/recreations/${pollId}`)
      if (r.ok) {
        const data = await r.json()
        if (data.recreation.status === 'COMPLETED' && data.recreation.imageUrl) {
          setAiList((prev) => {
            const exists = prev.find((x) => x.id === data.recreation.id)
            return exists
              ? prev.map((x) => (x.id === data.recreation.id ? data.recreation : x))
              : [...prev, data.recreation]
          })
          setGenerating(false)
          setPollId(null)
          setTab('ai')
        }
        if (data.recreation.status === 'FAILED') {
          setGenerating(false)
          setPollId(null)
        }
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [pollId])

  const historic = media.find((m) => m.url) ?? null
  const aiActive = aiList.find((r) => r.imageUrl)

  return (
    <div className="overflow-hidden rounded-sm border border-border bg-bg-card shadow-paper">
      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <TabsList className="m-3 grid w-fit grid-cols-3">
          <TabsTrigger value="historic" disabled={media.length === 0}>
            <Camera className="mr-1 h-3 w-3" />
            Histórica
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Sparkles className="mr-1 h-3 w-3" />
            Recreación IA
          </TabsTrigger>
          <TabsTrigger value="now">
            <MapIcon className="mr-1 h-3 w-3" />
            Hoy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="historic" className="mt-0">
          {historic ? (
            <figure>
              <img
                src={historic.url}
                alt={historic.caption ?? ''}
                className="aspect-[4/3] w-full object-cover transition-opacity duration-500"
              />
              <figcaption className="bg-bg-secondary p-3 text-xs text-text-secondary">
                {historic.caption}
                <div className="mt-1 text-[10px] text-text-secondary/70">
                  {historic.attribution}
                  {historic.yearTaken && <> · {historic.yearTaken}</>}
                </div>
              </figcaption>
            </figure>
          ) : (
            <Empty label="Sin foto histórica disponible" />
          )}
        </TabsContent>

        <TabsContent value="ai" className="mt-0">
          {aiActive?.imageUrl ? (
            <figure>
              <img
                src={aiActive.imageUrl}
                alt={`Recreación IA del año ${aiActive.targetYear}`}
                className="aspect-[4/3] w-full object-cover transition-opacity duration-500"
              />
              <figcaption className="bg-bg-secondary p-3 text-xs text-text-secondary">
                Recreación generada por IA · año {aiActive.targetYear}
                <div className="mt-1 text-[10px] text-accent-rust">
                  Imagen interpretativa generada con inteligencia artificial. No es
                  registro histórico documentado.
                </div>
              </figcaption>
            </figure>
          ) : (
            <div className="flex aspect-[4/3] flex-col items-center justify-center bg-bg-secondary p-6 text-center">
              <Sparkles className="mb-3 h-10 w-10 text-accent-gold" />
              <p className="mb-4 text-sm text-text-secondary">
                Aún no existe una recreación generada por IA para este evento.
              </p>
              <Button onClick={requestRecreation} disabled={generating}>
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generando ({targetYearDefault})…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Ver cómo era en {targetYearDefault}
                  </>
                )}
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="now" className="mt-0">
          <iframe
            title="Vista actual"
            className="aspect-[4/3] w-full"
            src={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${longitude},${latitude},14,0/720x540@2x?access_token=${clientEnv.mapboxToken}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Empty({ label }: { label: string }) {
  return (
    <div className="flex aspect-[4/3] items-center justify-center bg-bg-secondary text-sm text-text-secondary">
      {label}
    </div>
  )
}
