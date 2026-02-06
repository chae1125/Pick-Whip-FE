import { useMemo } from 'react'
import ReviewSortDropdown, { type ReviewSortKey } from './ReviewSortDropdown'
import type { ReviewFilters } from './ReviewFilterSheet'

type Props = {
  sortKey: ReviewSortKey
  onChangeSort: (k: ReviewSortKey) => void

  filters: ReviewFilters
  onOpenFilter: () => void
}

export default function ReviewListSection({ sortKey, onChangeSort, filters, onOpenFilter }: Props) {
  const hasActiveFilters = useMemo(
    () =>
      !!(
        filters.gallery.length ||
        filters.style.length ||
        filters.shape.length ||
        filters.base.length ||
        filters.topping.length ||
        filters.special.length
      ),
    [filters],
  )

  return (
    <div className="mt-20 mb-8 flex items-center justify-between">
      <p className="!font-semibold !text-[20px] !text-[#2A2929]">전체 리뷰</p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenFilter}
          className={[
            'w-[68px] h-[24px] inline-flex items-center justify-center rounded-[7px]',
            'border border-[#E8E8E8] px-4 py-1.5',
            '!text-[12px] !text-[#3E3E3E]',
            hasActiveFilters ? 'bg-[#FFE1DC] border-[#FFD9E3]' : 'bg-white',
          ].join(' ')}
        >
          필터
        </button>

        <ReviewSortDropdown value={sortKey} onChange={onChangeSort} />
      </div>
    </div>
  )
}
