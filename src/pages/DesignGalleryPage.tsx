// src/pages/DesignGalleryPage.tsx
import { useMemo, useState, useCallback } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

import type { StoreInfoCard } from '@/components/store-detail/StoreCard'
import DesignGallery from '@/components/store-detail/designGallery/DesignGallery'
import CustomizeCtaBar from '@/components/store-detail/designGallery/CustomizeCtaBar'
import PickUpDateTimeModal from '@/components/calendar/PickUpDateTimeModal'

type OutletCtx = { store: StoreInfoCard }
type Props = { store?: StoreInfoCard; sheetFull?: boolean }

function combinePickupDatetimeISO(date: Date, timeRange: string) {
  const [start] = timeRange.split('~')
  const [hh, mm] = start.split(':').map(Number)
  const d = new Date(date)
  d.setHours(hh || 0, mm || 0, 0, 0)

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

export default function DesignGalleryPage({ store: storeProp, sheetFull }: Props) {
  const navigate = useNavigate()
  const outlet = useOutletContext<OutletCtx | undefined>()
  const store = storeProp ?? outlet?.store

  const [pickupOpen, setPickupOpen] = useState(false)
  const [pickupDate, setPickupDate] = useState<Date | null>(null)
  const [pickupTimeRange, setPickupTimeRange] = useState<string | null>(null)

  const resetKey = useMemo(() => {
    const shopId = store?.shopId ?? 0
    return `${shopId}|${pickupDate?.toISOString() ?? 'null'}|${pickupTimeRange ?? 'null'}`
  }, [store?.shopId, pickupDate, pickupTimeRange])

  const openPickup = useCallback(() => setPickupOpen(true), [])
  const closePickup = useCallback(() => setPickupOpen(false), [])

  if (!store) return null

  return (
    <>
      <DesignGallery shopName={store.shopName} shopId={store.shopId} />
      <CustomizeCtaBar onClick={openPickup} visible={sheetFull ?? true} />

      <PickUpDateTimeModal
        key={resetKey}
        open={pickupOpen}
        onClose={closePickup}
        shopId={store.shopId}
        value={pickupDate}
        timeRange={pickupTimeRange}
        onConfirm={({ date, timeRange }: { date: Date; timeRange: string }) => {
          setPickupDate(date)
          setPickupTimeRange(timeRange)

          const pickupDatetime = combinePickupDatetimeISO(date, timeRange)

          closePickup()
          navigate('/customize', {
            state: { shopId: store.shopId, shopName: store.shopName, pickupDatetime },
          })
        }}
      />
    </>
  )
}
