import type { ReviewTag } from '../../types/review'

function TagPill({ tag }: { tag: ReviewTag }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[5px] bg-[#E7B2A24D] px-2 py-1 text-[12px] text-review-default">
      {tag.icon ? <span className="text-review-default">{tag.icon}</span> : null}
      <span className="text-[12px]">{tag.label}</span>
    </span>
  )
}

export function ReviewTags({
  tags,
  extraTagCount,
}: {
  tags?: ReviewTag[]
  extraTagCount?: number
}) {
  if (!tags?.length && !extraTagCount) return null

  return (
    <div className="mt-5 flex flex-wrap gap-1">
      {tags?.map((t, i) => (
        <TagPill key={`${t.label}-${i}`} tag={t} />
      ))}
      {extraTagCount ? (
        <span className="inline-flex items-center rounded-[5px] bg-[#E7B2A24D] px-2 py-1 text-[12px] text-review-default">
          +{extraTagCount}
        </span>
      ) : null}
    </div>
  )
}
