import type { ReviewKeyword } from '@/apis/shop'
import { RatingStars } from '../../reviewCard/RatingStars'
import { ReviewTags } from '../../reviewCard/ReviewTag'
import { OwnerReply } from '../../reviewCard/OwnerReply'

type ReviewOwnerReply = {
  title?: string
  content: string
}

type Props = {
  nickname: string
  option?: string | null
  createdDate: string
  rating: number
  content: string
  keywords?: ReviewKeyword[]
  max?: number
  reply?: string | null
}

export default function ReviewMeta({
  nickname,
  option,
  createdDate,
  rating,
  content,
  keywords,
  max,
  reply,
}: Props) {
  const safeTags: ReviewKeyword[] = keywords ?? []
  const safeExtraTagCount: number = max ?? 3

  const ownerReply: ReviewOwnerReply | undefined =
    typeof reply === 'string' && reply.trim() ? { content: reply } : undefined

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-1.5 text-[#0A0A0A]">
        <span className="text-[16px] font-semibold">{nickname}</span>
        <span className="text-[#c2c2c2] text-xs">·</span>
        <time className="text-sm text-[#999999] font-normal">{createdDate}</time>
      </div>

      {option ? (
        <div className="mt-2">
          <span className="inline-flex items-center rounded-[6px] bg-[#F2F2F2] px-2 py-1 text-xs text-[#57504F]">
            옵션&nbsp;&nbsp;{option}
          </span>
        </div>
      ) : null}

      <div className="mt-2">
        <RatingStars rating={rating} />
      </div>

      <div className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-review-default">
        {content}
      </div>

      <div className="mt-4">
        <ReviewTags keywords={safeTags} max={safeExtraTagCount} />
      </div>

      <div className="mt-5 mb-15">
        <OwnerReply reply={ownerReply} />
      </div>
    </div>
  )
}
