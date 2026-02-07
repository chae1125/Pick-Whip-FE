import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  safeIndex: number
  totalPages: number
  canPrev: boolean
  canNext: boolean
  animating: boolean
  onPrev: () => void
  onNext: () => void
}

export default function CakeCardPagination({
  safeIndex,
  totalPages,
  canPrev,
  canNext,
  animating,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="mt-4 flex items-center justify-center gap-3 text-[12px]">
      <button
        type="button"
        onClick={onPrev}
        className="h-[24px] w-[24px] flex items-center justify-center text-[#6A7282]"
        aria-label="이전 페이지"
        disabled={!canPrev || animating}
      >
        <ChevronLeft className="h-[14px] w-[14px]" />
      </button>

      <span className="font-semibold">
        <span style={{ color: '#666666' }}>{totalPages === 0 ? 0 : safeIndex + 1}</span>
        <span style={{ color: '#909090', opacity: 0.6 }}> / {totalPages}</span>
      </span>

      <button
        type="button"
        onClick={onNext}
        className="h-[24px] w-[24px] flex items-center justify-center text-[#6A7282]"
        aria-label="다음 페이지"
        disabled={!canNext || animating}
      >
        <ChevronRight className="h-[14px] w-[14px]" />
      </button>
    </div>
  )
}
