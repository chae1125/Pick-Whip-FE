import { Star } from 'lucide-react'

type ReviewSummaryCardProps = {
  rating: number
  totalReviews: number
  keywordRanking: Record<string, number>
  className?: string
}

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n))
}

function overlayOpacityByRank(idx: number) {
  const ops = [0.32, 0.24, 0.18, 0.13, 0.1]
  return ops[idx] ?? 0.1
}

const LABEL_BY_KEY: Record<string, string> = {
  designSatisfaction: '디자인만족',
  sameAsResult: '결과물동일',
  taste: '맛',
  communication: '소통',
  pickup: '픽업진행',
}

function buildRankItems(keywordRanking: Record<string, number>) {
  const items = Object.entries(keywordRanking ?? {}).map(([key, value]) => ({
    key,
    label: LABEL_BY_KEY[key] ?? key,
    value: Number(value) || 0,
  }))

  items.sort((a, b) => b.value - a.value)
  return items.slice(0, 5)
}

function getStarFillRatios(rating: number) {
  const r = Math.max(0, Math.min(5, rating))
  return Array.from({ length: 5 }, (_, i) => clamp((r - i) * 100, 0, 100) / 100)
}

export default function ReviewSummaryCard({
  rating,
  totalReviews,
  keywordRanking,
  className,
}: ReviewSummaryCardProps) {
  const starFill = getStarFillRatios(rating)
  const rankItems = buildRankItems(keywordRanking)

  const maxValue = rankItems.length ? Math.max(...rankItems.map((x) => x.value)) : 0

  return (
    <div className={['w-full', className ?? ''].join(' ')}>
      <p className="mb-3 !text-center !text-[18px] !font-bold !text-[#2B2B2B]"> REVIEW </p>

      <section className="w-full h-[300px] rounded-[10px] bg-white border border-black/5 shadow-[0_2px_0_rgba(0,0,0,0.12)] px-7 py-6 mt-3">
        <div className="mt-2 flex items-center justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => {
            const fill = starFill[i]
            return (
              <span key={i} className="relative inline-block h-7 w-7">
                <Star className="absolute inset-0 h-7 w-7 text-[#E6E6E6]" />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <Star className="h-7 w-7 fill-[#F6B233] text-[#F6B233]" />
                </span>
              </span>
            )
          })}
        </div>

        <div className="mt-4 text-center">
          <p className="!text-[24px] !font-regular !text-[#1E2A3B]">
            {Number(rating || 0).toFixed(1)}
          </p>
          <p className="!text-[12px] !text-[#7C8699]">총 {totalReviews}개 리뷰</p>
        </div>

        <div className="mt-4 space-y-2">
          {rankItems.map((item, idx) => {
            const leftPct = maxValue > 0 ? clamp((item.value / maxValue) * 100) : 0
            const rightPct = 100 - leftPct
            const overlayOpacity = overlayOpacityByRank(idx)

            return (
              <div key={item.key} className="flex items-center">
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
