import { MapView } from '@/components/map/MapView'
import { Timeline } from '@/components/map/Timeline'
import { FilterSidebar } from '@/components/map/FilterSidebar'
import { EventDetailPanel } from '@/components/map/EventDetailPanel'
import { SiteHeader } from '@/components/SiteHeader'

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col">
      <SiteHeader />
      <div className="relative flex-1">
        <FilterSidebar />
        <div className="absolute inset-0 left-0 md:left-[320px]">
          <MapView />
          <Timeline />
        </div>
        <EventDetailPanel />
      </div>
    </div>
  )
}
