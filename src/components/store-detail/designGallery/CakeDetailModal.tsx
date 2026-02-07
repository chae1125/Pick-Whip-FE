import { useEffect, useMemo, useState } from 'react'
import useCarouselIndex from '@/hooks/useCarouselIndex'
import ImageSlider from '@/components/store-detail/cakeDetails/ImageSlider'
import CakeInfo from '@/components/store-detail/cakeDetails/CakeInfo'
import OwnersPick from '@/components/store-detail/cakeDetails/OwnersPick'
import OrderButton from '@/components/store-detail/cakeDetails/OrderButton'

export type CakeDetailItem = {
  id: number
  imageUrl: string
  cakeName: string
  price: number
  keywords?: string[]
  isOwnersPick?: { shape: string; sheet: string; cream: string; icingColor: string }
}

type Props = {
  isOpen: boolean
  items: CakeDetailItem[]
  initialIndex: number
  onClose: () => void
  onGoReview: () => void
  onOrder?: (cakeId: number) => void
  onCustomize?: (cakeId: number) => void
}

export default function CakeDetailModal({
  isOpen,
  items,
  initialIndex,
  onClose,
  onGoReview,
}: Props) {
  const [pickOpen, setPickOpen] = useState(false)

  const { safeIndex, canPrev, canNext, goPrev, goNext } = useCarouselIndex({
    length: items.length,
    initialIndex,
    onMove: () => setPickOpen(false),
  })

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  const item = useMemo(() => items[safeIndex], [items, safeIndex])
  if (!isOpen || !item) return null

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center px-4"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="flex items-center justify-center w-full max-w-[287px] h-[470px]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="rounded-[14px] overflow-hidden bg-white shadow-lg">
          <ImageSlider
            imageUrl={item.imageUrl}
            alt={item.cakeName}
            canPrev={canPrev}
            canNext={canNext}
            onPrev={goPrev}
            onNext={goNext}
          />

          <div className="max-h-[280px] overflow-y-auto">
            <div className="px-5 pt-4 pb-4">
              <CakeInfo
                cakeName={item.cakeName}
                keywords={item.keywords}
                price={item.price}
                onGoReview={onGoReview}
              />

              <OwnersPick
                pick={item.isOwnersPick}
                open={pickOpen}
                onToggle={() => setPickOpen((v) => !v)}
              />

              <div className="h-3" />
            </div>

            <div className="px-5 pb-5">
              <OrderButton onOrder={() => {}} onCustomize={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
