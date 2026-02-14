// src/pages/ReviewPage.tsx
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ReviewCard } from '@/components/reviewCard/ReviewCard'
import ReviewSummaryCard from '@/components/store-detail/review/ReviewSummaryCard'
import ReviewFilterSheet, {
  type ReviewFilters,
} from '@/components/store-detail/review/ReviewFilterSheet'
import ReviewDetailModal from '@/components/store-detail/review/ReviewDetailModal'
import ReviewListSection from '@/components/store-detail/review/ReviewListSection'
import useReviewDetailModal from '@/hooks/useReviewDetailModal'
import type { ReviewSortKey } from '@/components/store-detail/review/ReviewSortDropdown'

import {
  getReviewSummary,
  getShopReviews,
  type ReviewSummaryResult,
  type ShopReviewItem,
  type ShopReviewSort,
} from '@/apis/shop'

const DEFAULT_FILTERS: ReviewFilters = {
  gallery: [],
  style: [],
  shape: [],
  base: [],
  topping: [],
  special: [],
}

function toApiSort(sortKey: ReviewSortKey): ShopReviewSort {
  switch (sortKey) {
    case 'latest':
      return 'LATEST'
    case 'helpful':
      return 'HELPFUL'
    case 'rating_desc':
      return 'RATING_HIGH'
    case 'rating_asc':
      return 'RATING_LOW'
    default:
      return 'LATEST'
  }
}

function toApiStyles(styles: string[]) {
  return styles
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s === s.toUpperCase() ? s : s.toUpperCase()))
}

function toDesignIds(gallery: string[]) {
  return gallery.map((v) => Number(v)).filter((n) => Number.isFinite(n) && n > 0)
}

type ReviewPageProps = {
  shopId?: number
}

export default function ReviewPage({ shopId: shopIdProp }: ReviewPageProps) {
  const params = useParams()

  const shopId = useMemo(() => {
    if (typeof shopIdProp === 'number' && Number.isFinite(shopIdProp) && shopIdProp > 0) {
      return shopIdProp
    }
    const n = Number(params.shopId)
    return Number.isFinite(n) && n > 0 ? n : 1
  }, [params.shopId, shopIdProp])

  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [summary, setSummary] = useState<ReviewSummaryResult | null>(null)

  const [items, setItems] = useState<ShopReviewItem[]>([])
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [hasNext, setHasNext] = useState(false)

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<ReviewFilters>(DEFAULT_FILTERS)
  const [sortKey, setSortKey] = useState<ReviewSortKey>('latest')

  const detail = useReviewDetailModal()
  type OpenArg = Parameters<typeof detail.openWith>[0]

  useEffect(() => {
    setItems([])
    setNextCursor(null)
    setHasNext(false)
  }, [shopId])

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setErrorMsg(null)

      const query = {
        sort: toApiSort(sortKey),
        designIds: toDesignIds(filters.gallery),
        styles: toApiStyles(filters.style),
        size: 20,
      }

      try {
        const [s, list] = await Promise.all([
          getReviewSummary(shopId),
          getShopReviews(shopId, query),
        ])

        setSummary(s)
        setItems(list.items ?? [])
        setNextCursor(list.nextCursor ?? null)
        setHasNext(!!list.hasNext)
      } catch (e) {
        setErrorMsg(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [shopId, sortKey, filters])

  const loadMore = async () => {
    if (!hasNext || !nextCursor) return

    const query = {
      sort: toApiSort(sortKey),
      designIds: toDesignIds(filters.gallery),
      styles: toApiStyles(filters.style),
      cursor: nextCursor,
      size: 20,
    }

    try {
      const list = await getShopReviews(shopId, query)
      setItems((prev) => [...prev, ...(list.items ?? [])])
      setNextCursor(list.nextCursor ?? null)
      setHasNext(!!list.hasNext)
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) return <div className="mx-auto w-full pt-5 pb-10" />

  if (errorMsg) {
    return (
      <div className="mx-auto w-full pt-5 pb-10 p-6">
        <p className="text-sm text-gray-700">리뷰 정보를 불러오기에 실패했어요.</p>
        <p className="mt-1 text-xs text-gray-500">{errorMsg}</p>
      </div>
    )
  }

  const rating = summary?.rating ?? 0
  const totalReviews = summary?.count ?? 0
  const keywordRanking = summary?.keywordRanking ?? {
    designSatisfaction: 0,
    sameAsResult: 0,
    taste: 0,
    communication: 0,
    pickup: 0,
  }

  return (
    <div className="mx-auto w-full pt-5 pb-10">
      <main className="min-h-screen py-10">
        <div className="mx-auto w-full max-w-245 space-y-6">
          <ReviewSummaryCard
            rating={rating}
            totalReviews={totalReviews}
            keywordRanking={keywordRanking}
          />

          <ReviewListSection
            sortKey={sortKey}
            onChangeSort={setSortKey}
            filters={filters}
            onOpenFilter={() => setIsFilterOpen(true)}
          />

          {items.map((r) => (
            <ReviewCard
              key={r.reviewId}
              data={{
                reviewId: r.reviewId,
                nickname: r.nickname,
                profileUrl: r.profileUrl,
                rating: r.rating,
                option: r.option,
                content: r.content,
                imageUrls: r.imageUrls ?? [],
                keywords: r.keywords ?? [],
                isLike: r.isLike,
                likeCount: r.likeCount ?? 0,
                createdDate: r.createdDate,
              }}
              onOpen={() => {
                const payload = {
                  reviewId: r.reviewId,
                  nickname: r.nickname,
                  profileUrl: r.profileUrl,
                  rating: r.rating,
                  option: r.option,
                  content: r.content,
                  imageUrls: r.imageUrls ?? [],
                  keywords: r.keywords ?? [],
                  isLike: r.isLike,
                  likeCount: r.likeCount ?? 0,
                  createdDate: r.createdDate,
                  ownerReply: null,
                }

                detail.openWith(payload as unknown as OpenArg)
              }}
            />
          ))}

          {hasNext && (
            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={loadMore}
                className="h-10 px-4 rounded-md border border-black/10 bg-white text-sm"
              >
                더보기
              </button>
            </div>
          )}
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
