import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import CakeThumbCard from './CakeThumbCard'
import type { DesignGalleryItem } from '@/apis/home'

export default function CakeGallery({
  items,
  page,
  totalPages,
  loading,
  onPrev,
  onNext,
  onItemClick,
  onToggleLike,
}: {
  items: DesignGalleryItem[]
  page: number
  totalPages: number
  loading?: boolean
  onPrev: () => void
  onNext: () => void
  onItemClick?: (item: DesignGalleryItem) => void
  onToggleLike?: (item: DesignGalleryItem) => void
}) {
  if (loading) {
    return <div className="py-16 text-center text-xs text-gray-400">불러오는 중...</div>
  }

  if (!items.length) {
    return <div className="py-16 text-center text-[13px] text-gray-400">디자인이 없습니다</div>
  }

  return (
    <div className="mx-auto max-w-[488px] w-full">
      <div className="grid grid-cols-2 gap-6">
        {items.map((it) => (
          <div
            key={it.designId}
            className="flex flex-col py-1 cursor-pointer"
            onClick={() => onItemClick?.(it)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onItemClick?.(it)
            }}
          >
            <CakeThumbCard
              imageUrl={it.imageUrl}
              isLiked={it.myPick}
              onToggleLike={() => onToggleLike?.(it)}
            />

            <div className="mt-3">
              <div className="flex items-center gap-2 border-t border-[#F4D3D3] pt-3 px-1">
                <div className="text-[15px] font-medium text-[#2A2929]">{it.shopName}</div>

                <div className="flex items-center gap-1 text-[15px] text-[#2A2929]">
                  <Star size={15} className="fill-[#FDC700] stroke-none" />
                  <span>{(it.avgRating ?? 0).toFixed(1)}</span>
                </div>
              </div>

              <div className="mt-0.5 px-1 text-[12px] text-[#2A2929]">{it.simpleAddress}</div>

              <div className="mt-2 border-t border-b border-[#F4D3D3] py-1.5 px-1 text-[12px] text-[#2A2929] font-medium">
                ₩ {it.minPrice?.toLocaleString() ?? '-'}~
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#7A6A6A]">
        <button aria-label="이전" onClick={onPrev} className="px-2" disabled={page <= 1}>
          <ChevronLeft size={15} />
        </button>

        <div className="select-none">
          {page} / {totalPages}
        </div>

        <button aria-label="다음" onClick={onNext} className="px-2" disabled={page >= totalPages}>
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}
