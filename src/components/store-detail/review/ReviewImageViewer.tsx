import { ChevronLeft, ChevronRight } from 'lucide-react'

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

type Props = {
  images: string[]
  activeIdx: number
  onChangeActive: (i: number) => void
  onPrev: () => void
  onNext: () => void
}

export default function ReviewImageViewer({
  images,
  activeIdx,
  onChangeActive,
  onPrev,
  onNext,
}: Props) {
  const total = images.length
  if (total <= 0) return null

  const canSlide = total > 1
  const safeIdx = clamp(activeIdx, 0, total - 1)
  const currentUrl = images[safeIdx]

  return (
    <div>
      <div className="relative overflow-hidden rounded-[14px] bg-black">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <img
            src={currentUrl}
            alt={`review-${safeIdx + 1}`}
            className="h-full w-full object-cover select-none"
            draggable={false}
          />
        </div>

        {canSlide && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onPrev()
              }}
              aria-label="이전 이미지"
              className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur hover:bg-white"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              aria-label="다음 이미지"
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur hover:bg-white"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {canSlide && (
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {images.map((url, i) => {
            const active = i === safeIdx
            return (
              <button
                key={url + i}
                type="button"
                onClick={() => onChangeActive(i)}
                className={[
                  'ml-1 mt-1 relative overflow-hidden rounded-[10px] flex-shrink-0',
                  active ? 'ring-[2px] ring-[#FF9886]' : '',
                ].join(' ')}
                aria-label={`${i + 1}`}
              >
                <img
                  src={url}
                  alt={`thumb-${i + 1}`}
                  className="h-[56px] w-[56px] object-cover"
                  draggable={false}
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
