type BestReviewCardProps = {
  writerName: string
  createdDate: string
  rating: number
  content: string
  keywords?: string[]
}

export default function BestReviewCard({
  writerName,
  createdDate,
  rating,
  content,
  keywords = [],
}: BestReviewCardProps) {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0))

  return (
    <div className="min-w-[300px] rounded-[20px] rounded-bl-none w-full max-w-sm bg-white px-3 py-3">
      <div className="flex items-center gap-1">
        <div className="text-[13px] font-regular text-[#2b2b2b]">{writerName}</div>
        <div className="text-[12px] text-black/45 mr-1">· {createdDate}</div>

        <div className="mr-auto flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < safeRating ? 'text-[#FDC700]' : 'text-black/10'}>
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 whitespace-pre-line text-[14px] text-left leading-4 text-[var(--color-review-owner-title)]">
        {content}
      </div>

      {!!keywords.length && (
        <div className="mt-3 flex flex-wrap gap-2">
          {keywords.slice(0, 3).map((k, idx) => (
            <span
              key={`${k}-${idx}`}
              className="inline-flex items-center gap-2 rounded-[2px] bg-[#E7B2A24D] px-2 py-1 text-[14px] text-[#5b4a4a]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#8b6a6a]" />
              {k}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
