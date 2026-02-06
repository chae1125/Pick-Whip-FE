import type { ReviewTag, ReviewOwnerReply } from '../../../types/review'
import { RatingStars } from '../../reviewCard/RatingStars'
import { ReviewTags } from '../../reviewCard/ReviewTag'
import { OwnerReply } from '../../reviewCard/OwnerReply'

type Props = {
  menuName: string
  optionLabel?: string | null
  createdAt: string
  rating: number
  content: string
  tags?: ReviewTag[]
  extraTagCount?: number
  ownerReply?: ReviewOwnerReply
}

export default function ReviewMeta({
  menuName,
  optionLabel,
  createdAt,
  rating,
  content,
  tags,
  extraTagCount,
  ownerReply,
}: Props) {
  const safeTags: ReviewTag[] = tags ?? []
  const safeExtraTagCount: number = extraTagCount ?? 0

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-1.5 text-[#0A0A0A]">
        <span className="text-[16px] font-semibold">{menuName}</span>
        <span className="text-[#c2c2c2] text-xs">·</span>
        <time className="text-sm text-[#999999] font-normal">{createdAt}</time>
      </div>

      {optionLabel ? (
        <div className="mt-2">
          <span className="inline-flex items-center rounded-[6px] bg-[#F2F2F2] px-2 py-1 text-xs text-[#57504F]">
            옵션&nbsp;&nbsp;{optionLabel}
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
        <ReviewTags tags={safeTags} extraTagCount={safeExtraTagCount} />
      </div>

      <div className="mt-5 mb-15">
        <OwnerReply reply={ownerReply} />
      </div>
    </div>
  )
}
