import type { ReviewKeyword } from '@/apis/shop'

function TagPill({ tag }: { tag: ReviewKeyword }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[5px] bg-[#E7B2A24D] px-2 py-1 text-[12px] text-review-default">
      <span className="text-[12px]">{tag.label}</span>
    </span>
  )
}

export function ReviewTags({ keywords, max = 3 }: { keywords?: ReviewKeyword[]; max?: number }) {
  if (!keywords?.length) return null

  const shown = keywords.slice(0, max)
  const extra = keywords.length - shown.length

  return (
    <div className="mt-5 flex flex-wrap gap-1">
      {shown.map((t, i) => (
        <TagPill key={`${t.code}-${i}`} tag={t} />
      ))}
      {extra > 0 ? (
        <span className="inline-flex items-center rounded-[5px] bg-[#E7B2A24D] px-2 py-1 text-[12px] text-review-default">
          +{extra}
        </span>
      ) : null}
    </div>
  )
}
