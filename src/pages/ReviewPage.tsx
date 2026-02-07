import { useMemo, useState } from 'react'
import { ReviewCard } from '@/components/reviewCard/ReviewCard'
import { mockReviews } from '@/types/review.mock'
import ReviewSummaryCard from '@/components/store-detail/review/ReviewSummaryCard'
import ReviewFilterSheet, {
  type ReviewFilters,
} from '@/components/store-detail/review/ReviewFilterSheet'
import ReviewDetailModal from '@/components/store-detail/review/ReviewDetailModal'
import ReviewListSection from '@/components/store-detail/review/ReviewListSection'
import useReviewDetailModal from '@/hooks/useReviewDetailModal'
import type { ReviewSortKey } from '@/components/store-detail/review/ReviewSortDropdown'

const DEFAULT_FILTERS: ReviewFilters = {
  gallery: [],
  style: [],
  shape: [],
  base: [],
  topping: [],
  special: [],
}

export default function ReviewPage() {
  const summary = useMemo(
    () => ({
      rating: 4.8,
      totalReviews: 342,
      ranks: [
        { label: '디자인만족', percent: 95 },
        { label: '결과물동일', percent: 75 },
        { label: '맛', percent: 60 },
        { label: '소통', percent: 50 },
        { label: '픽업진행', percent: 40 },
      ],
    }),
    [],
  )

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<ReviewFilters>(DEFAULT_FILTERS)
  const [sortKey, setSortKey] = useState<ReviewSortKey>('latest')

  const detail = useReviewDetailModal()

  return (
    <div className="mx-auto w-full pt-5 pb-10">
      <main className="min-h-screen py-10">
        <div className="mx-auto w-full max-w-245 space-y-6">
          <ReviewSummaryCard
            rating={summary.rating}
            totalReviews={summary.totalReviews}
            ranks={summary.ranks}
          />

          <ReviewListSection
            sortKey={sortKey}
            onChangeSort={setSortKey}
            filters={filters}
            onOpenFilter={() => setIsFilterOpen(true)}
          />

          {mockReviews.map((review) => (
            <ReviewCard key={review.id} data={review} onOpen={() => detail.openWith(review)} />
          ))}
        </div>

        {isFilterOpen && (
          <ReviewFilterSheet
            key={String(isFilterOpen)}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            value={filters}
            onApply={setFilters}
          />
        )}

        <ReviewDetailModal isOpen={detail.open} data={detail.selected} onClose={detail.close} />
      </main>
    </div>
  )
}
