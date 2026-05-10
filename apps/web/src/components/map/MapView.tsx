'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Map, {
  Layer,
  type MapRef,
  Marker,
  NavigationControl,
  Source,
  type ViewStateChangeEvent,
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { clientEnv } from '@/lib/env'
import { useEventsGeo, type GeoEventFeature } from '@/hooks/useEventsGeo'
import { useMapStore } from '@/store/map-store'
import { CATEGORY_META } from '@/lib/categories'
import useSupercluster from 'use-supercluster'
import type { BBox } from 'geojson'

const INITIAL_VIEW = { longitude: -71.5, latitude: -35.5, zoom: 4.5 }

export function MapView() {
  const mapRef = useRef<MapRef | null>(null)
  const [view, setView] = useState(INITIAL_VIEW)
  const [bounds, setBounds] = useState<BBox | undefined>(undefined)

  const { data, isLoading } = useEventsGeo()
  const setSelected = useMapStore((s) => s.setSelectedEventId)
  const userLocation = useMapStore((s) => s.userLocation)
  const flyToTarget = useMapStore((s) => s.flyToTarget)
  const setFlyToTarget = useMapStore((s) => s.setFlyToTarget)

  useEffect(() => {
    if (!flyToTarget) return
    mapRef.current?.flyTo({
      center: [flyToTarget.longitude, flyToTarget.latitude],
      zoom: flyToTarget.zoom ?? 16,
      essential: true,
    })
    setFlyToTarget(null)
  }, [flyToTarget, setFlyToTarget])

  const points = useMemo(() => {
    if (!data?.features) return []
    return data.features.map((e) => ({
      type: 'Feature' as const,
      properties: {
        cluster: false as const,
        eventId: e.id,
        slug: e.slug,
        title: e.title,
        category: e.category,
        yearStart: e.yearStart,
        hasHistoricMedia: e.hasHistoricMedia,
        hasRecreation: e.hasRecreation,
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [e.longitude, e.latitude],
      },
    }))
  }, [data])

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: view.zoom,
    options: { radius: 60, maxZoom: 12 },
  })

  function onMove(e: ViewStateChangeEvent) {
    setView({
      longitude: e.viewState.longitude,
      latitude: e.viewState.latitude,
      zoom: e.viewState.zoom,
    })
    const map = mapRef.current?.getMap()
    if (map) {
      const b = map.getBounds()
      if (b) {
        setBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()])
      }
    }
  }

  if (!clientEnv.mapboxToken) {
    return (
      <div className="flex h-full items-center justify-center bg-bg-secondary">
        <div className="max-w-md p-6 text-center">
          <p className="font-display text-2xl text-accent-gold">Mapbox no configurado</p>
          <p className="mt-2 text-sm text-text-secondary">
            Define <code className="font-mono">NEXT_PUBLIC_MAPBOX_TOKEN</code> en{' '}
            <code className="font-mono">.env</code> para visualizar el mapa.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={clientEnv.mapboxToken}
      mapStyle={clientEnv.mapboxStyle}
      initialViewState={INITIAL_VIEW}
      onMove={onMove}
      onLoad={(e) => {
        const b = e.target.getBounds()
        if (b) setBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()])
      }}
      style={{ width: '100%', height: '100%' }}
      attributionControl={true}
    >
      <NavigationControl position="top-right" />

      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates
        const isCluster = cluster.properties.cluster

        if (isCluster) {
          const count = cluster.properties.point_count
          const size = 30 + Math.min(40, Math.log2(count) * 8)
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
              anchor="center"
            >
              <button
                style={{ width: size, height: size }}
                className="flex items-center justify-center rounded-full border-2 border-accent-gold bg-bg-card/90 font-mono text-xs text-accent-gold shadow-warm transition-transform hover:scale-110"
                onClick={() => {
                  if (!supercluster) return
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(Number(cluster.id)),
                    14,
                  )
                  mapRef.current?.flyTo({ center: [longitude, latitude], zoom: expansionZoom })
                }}
              >
                {count}
              </button>
            </Marker>
          )
        }

        const props = cluster.properties as unknown as Pick<
          GeoEventFeature,
          'category' | 'title' | 'hasHistoricMedia' | 'hasRecreation'
        > & { eventId: string }
        const meta = CATEGORY_META[props.category as keyof typeof CATEGORY_META]
        return (
          <Marker
            key={props.eventId}
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setSelected(props.eventId)
            }}
          >
            <button
              title={props.title}
              className="group relative -translate-y-1 transition-transform hover:scale-110"
            >
              <span
                className="block h-4 w-4 rounded-full border-2 border-bg-primary shadow-warm"
                style={{ backgroundColor: meta?.color ?? '#C9A75C' }}
              />
              {(props.hasHistoricMedia || props.hasRecreation) && (
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent-gold ring-2 ring-bg-primary" />
              )}
            </button>
          </Marker>
        )
      })}

      {userLocation && (
        <Marker
          longitude={userLocation.longitude}
          latitude={userLocation.latitude}
          anchor="center"
        >
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-gold opacity-60" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-bg-primary bg-accent-gold" />
          </span>
        </Marker>
      )}

      <Source id="events" type="geojson" data={{ type: 'FeatureCollection', features: [] }}>
        <Layer id="events-noop" type="circle" paint={{ 'circle-radius': 0 }} />
      </Source>

      {isLoading && (
        <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-sm bg-bg-card/90 px-3 py-1 text-xs text-text-secondary">
          Cargando eventos…
        </div>
      )}
    </Map>
  )
}
