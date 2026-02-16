import { useState } from 'react'
import { RatingStars } from './RatingStars'
import { ReviewImages } from './ReviewImage'
import { ReviewTags } from './ReviewTag'
import { ReviewActionSheet } from './ReviewActionSheet'

import IconThumbUp from '../../assets/reviewCard/icon-thumb-up.svg?react'
import IconThumbUpFilled from '../../assets/reviewCard/icon-thumb-up-filled.svg?react'
import IconMoreVertical from '../../assets/reviewCard/icon-more-vertical.svg?react'

import type { ShopReviewItem } from '@/apis/shop'
import { likeReview, unlikeReview } from '@/apis/shop'

export function ReviewCard({ data, onOpen }: { data: ShopReviewItem; onOpen?: () => void }) {
  const {
    reviewId,
    nickname,
    createdDate,
    rating,
    content,
    imageUrls,
    keywords,
    isLike,
    likeCount,
    option,
  } = data

  const [isHelpful, setIsHelpful] = useState(isLike)
  const [helpfulCount, setHelpfulCount] = useState(likeCount)
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false)

  const handleEdit = () => {
    alert('수정하기 클릭')
    setIsActionSheetOpen(false)
  }

  const handleDelete = () => {
    alert('삭제하기 클릭')
    setIsActionSheetOpen(false)
  }

  const handleToggleHelpful = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const result = isHelpful ? await unlikeReview(reviewId) : await likeReview(reviewId)
    setIsHelpful(result.isLike)
    setHelpfulCount(result.likeCount)
  }

  return (
    <article
      className="rounded-2xl bg-white p-7 shadow-card ring-1 ring-zinc-100 text-default cursor-pointer"
      onClick={() => onOpen?.()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen?.()
        }
      }}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 text-[#0A0A0A]">
            <span className="text-[15px]">{nickname}</span>
            <span className="text-[#c2c2c2] text-xs">·</span>
            <time className="text-sm text-[#999999] font-normal">{createdDate}</time>
          </div>

          {option ? (
            <div className="mt-1.5">
              <span className="inline-flex items-center rounded-[4px] bg-[#F2F2F2] px-1.5 py-0.5 text-xs text-[#57504F]">
                옵션&nbsp;&nbsp;{option}
              </span>
            </div>
          ) : null}

          <div className="mt-1.5">
            <RatingStars rating={rating} />
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setIsActionSheetOpen(true)
          }}
          className="-mr-2 p-1 text-[#999999] rounded-full"
          aria-label="더보기"
        >
          <IconMoreVertical />
        </button>
      </header>

      <div className="mt-4 text-[15px] leading-relaxed text-review-default whitespace-pre-line">
        {content}
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <ReviewImages imageUrls={imageUrls} max={3} />
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <ReviewTags keywords={keywords} max={3} />
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleToggleHelpful}
          className={`inline-flex items-center gap-2 rounded-lg border px-2 py-1 transition-colors ${
            isHelpful ? 'border-[#4A5565] text-[#4A5565]' : 'border-[#bebebe] text-[#7D8590]'
          }`}
        >
          {isHelpful ? (
            <IconThumbUpFilled className="h-4 w-4 text-[#4A5565]" />
          ) : (
            <IconThumbUp className="h-4 w-4" />
          )}
          <span className="text-[12px]">도움이 됐어요 {helpfulCount}</span>
        </button>
      </div>

      <ReviewActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </article>
  )
}
