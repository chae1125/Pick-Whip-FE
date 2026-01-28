import { useState } from 'react'
import type { ReviewCardData } from '../../types/review'
import { OwnerReply } from './OwnerReply'
import { RatingStars } from './RatingStars'
import { ReviewImages } from './ReviewImage'
import { ReviewTags } from './ReviewTag'
import { ReviewActionSheet } from './ReviewActionSheet'

import IconThumbUp from '../../assets/reviewCard/icon-thumb-up.svg?react'
import IconThumbUpFilled from '../../assets/reviewCard/icon-thumb-up-filled.svg?react'
import IconMoreVertical from '../../assets/reviewCard/icon-more-vertical.svg?react'

export function ReviewCard({ data }: { data: ReviewCardData }) {
  const {
    menuName,
    optionLabel,
    createdAt,
    rating,
    content,
    imageUrls,
    tags,
    extraTagCount,
    helpfulCount,
    ownerReply,
  } = data

  const [isHelpful, setIsHelpful] = useState(false)
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false)

  const handleEdit = () => {
    alert('수정하기 클릭')
    setIsActionSheetOpen(false)
  }

  const handleDelete = () => {
    alert('삭제하기 클릭')
    setIsActionSheetOpen(false)
  }

  return (
    <article className="rounded-2xl bg-white p-7 shadow-card ring-1 ring-zinc-100 text-default">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 text-[#0A0A0A]">
            <span className="text-[15px]">{menuName}</span>
            <span className="text-[#c2c2c2] text-xs">·</span>
            <time className="text-sm text-[#999999] font-normal">{createdAt}</time>
          </div>

          {optionLabel ? (
            <div className="mt-1.5">
              <span className="inline-flex items-center rounded-[4px] bg-[#F2F2F2] px-1.5 py-0.5 text-xs text-[#57504F]">
                옵션&nbsp;&nbsp;{optionLabel}
              </span>
            </div>
          ) : null}

          <div className="mt-1.5">
            <RatingStars rating={rating} />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsActionSheetOpen(true)}
          className="-mr-2 p-1 text-[#999999] rounded-full"
          aria-label="더보기"
        >
          <IconMoreVertical />
        </button>
      </header>
      <div className="mt-4 text-[15px] leading-relaxed text-review-default whitespace-pre-line">
        {content}
      </div>
      <ReviewImages imageUrls={imageUrls} max={3} />
      <ReviewTags tags={tags} extraTagCount={extraTagCount} />
      {/* Helpful */}
      {typeof helpfulCount === 'number' ? (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setIsHelpful(!isHelpful)}
            className={`inline-flex items-center gap-2 rounded-lg border px-2 py-1 transition-colors ${
              isHelpful ? 'border-[#4A5565] text-[#4A5565]' : 'border-[#bebebe] text-[#7D8590]'
            }`}
          >
            {isHelpful ? (
              <IconThumbUpFilled className="h-4 w-4 text-[#4A5565]" />
            ) : (
              <IconThumbUp className="h-4 w-4" />
            )}
            <span className="text-[12px]">
              도움이 됐어요 {isHelpful ? helpfulCount + 1 : helpfulCount}
            </span>
          </button>
        </div>
      ) : null}

      <OwnerReply reply={ownerReply} />

      <ReviewActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </article>
  )
}
