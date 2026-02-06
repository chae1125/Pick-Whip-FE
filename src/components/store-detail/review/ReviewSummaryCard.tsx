import { Star } from 'lucide-react'

type RankItem = {
  label: string
  percent: number
}

type ReviewSummaryCardProps = {
  rating: number
  totalReviews: number
  ranks: RankItem[]
  className?: string
}

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n))
}

function overlayOpacityByRank(idx: number) {
  const ops = [0.32, 0.24, 0.18, 0.13, 0.1]
  return ops[idx] ?? 0.1
}

export default function ReviewSummaryCard({ rating, totalReviews, ranks }: ReviewSummaryCardProps) {
  const filledStars = 5

  return (
    <div className="w-full">
      <p className="mb-3 !text-center !text-[18px] !font-bold !text-[#2B2B2B]"> REVIEW </p>

      <section className="w-full h-[300px] rounded-[10px] bg-white border border-black/5 shadow-[0_2px_0_rgba(0,0,0,0.12)] px-7 py-6 mt-3">
        <div className="mt-2 flex items-center justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={[
                'h-7 w-7',
                i < filledStars ? 'fill-[#F6B233] text-[#F6B233]' : 'text-[#E6E6E6]',
              ].join(' ')}
            />
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="!text-[24px] !font-regular !text-[#1E2A3B]">{rating.toFixed(1)}</p>
          <p className="!text-[12px] !text-[#7C8699]">총 {totalReviews}개 리뷰</p>
        </div>

        <div className="mt-4 space-y-2">
          {ranks.slice(0, 5).map((item, idx) => {
            const leftPct = clamp(item.percent)
            const rightPct = 100 - leftPct
            const overlayOpacity = overlayOpacityByRank(idx)

            return (
              <div key={item.label} className="flex items-center">
                <span className="w-[40px] text-[12px] text-[#4A5565]">{idx + 1}순위</span>
                <div className="flex-1">
                  <div className="h-[16px] w-full overflow-hidden rounded-[3px]">
                    <div className="flex h-full w-full">
                      <div className="relative h-full" style={{ width: `${leftPct}%` }}>
                        <div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(90deg, #FE577A 10%, #F7E6E6 100%)',
                          }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: '#F7E6E6',
                            opacity: overlayOpacity,
                          }}
                        />
                      </div>
                      <div className="h-full bg-[#F7E6E6]" style={{ width: `${rightPct}%` }} />
                    </div>
                  </div>
                </div>
                <span className="w-[65px] text-right text-[12px] text-[#4A5565]">{item.label}</span>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
