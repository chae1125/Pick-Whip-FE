import { useEffect, useMemo, useState } from 'react'
import type { ReviewCardData } from '../../../types/review'
import { ArrowLeft } from 'lucide-react'
import ReviewImageViewer from './ReviewImageViewer'
import ReviewMeta from './ReviewMeta'

type Props = {
  isOpen: boolean
  data: ReviewCardData | null
  onClose: () => void
}

export default function ReviewDetailModal({ isOpen, data, onClose }: Props) {
  const open = isOpen && !!data

  const images = useMemo(() => data?.imageUrls ?? [], [data])
  const total = images.length
  const canSlide = total > 1

  const [activeIdx, setActiveIdx] = useState(0)

  const goPrev = () => {
    if (!canSlide) return
    setActiveIdx((p) => (p - 1 + total) % total)
  }

  const goNext = () => {
    if (!canSlide) return
    setActiveIdx((p) => (p + 1) % total)
  }

  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  if (!open) return null

  const { menuName, optionLabel, createdAt, rating, content, tags, extraTagCount, ownerReply } =
    data!

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div className="absolute inset-x-0 top-0 mx-auto h-full w-full max-w-[520px] bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white">
          <button
            type="button"
            onClick={onClose}
            aria-label="뒤로가기"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        <div className="h-full overflow-y-auto px-7 pb-6">
          <ReviewImageViewer
            images={images}
            activeIdx={activeIdx}
            onChangeActive={setActiveIdx}
            onPrev={goPrev}
            onNext={goNext}
          />

          <ReviewMeta
            menuName={menuName}
            optionLabel={optionLabel}
            createdAt={createdAt}
            rating={rating}
            content={content}
            tags={tags}
            extraTagCount={extraTagCount}
            ownerReply={ownerReply}
          />
        </div>
      </div>
    </div>
  )
}
