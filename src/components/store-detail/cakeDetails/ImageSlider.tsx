import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  imageUrl: string
  alt: string
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
}

export default function CakeDetailImageSlider({
  imageUrl,
  alt,
  canPrev,
  canNext,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="relative w-full aspect-square overflow-hidden bg-black">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 disabled:opacity-30"
        aria-label="이전 케이크"
      >
        <span className="h-[28px] w-[28px] rounded-full bg-white flex items-center justify-center shadow">
          <ChevronLeft className="h-[18px] w-[18px] text-[#2A2929]" />
        </span>
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 disabled:opacity-30"
        aria-label="다음 케이크"
      >
        <span className="h-[28px] w-[28px] rounded-full bg-white flex items-center justify-center shadow">
          <ChevronRight className="h-[18px] w-[18px] text-[#2A2929]" />
        </span>
      </button>

      <img
        src={imageUrl}
        alt={alt}
        className="h-full w-full object-cover select-none"
        draggable={false}
      />
    </div>
  )
}
