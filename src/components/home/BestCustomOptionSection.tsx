import { useEffect, useState } from 'react'
import BestReviewCard from './BestReveiwCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getBestReviews } from '@/apis/review'
import type { BestOptionItem } from '@/apis/review'

function PillLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border-[1.5px] border-[var(--color-main-red-100)] bg-transparent px-2 py-0.5 text-[15px] font-medium text-black">
      {children}
    </span>
  )
}

function ColorSwatch({ color }: { color: string | null | undefined }) {
  const bg = color || '#E9E9E9'
  return <div className="h-[52px] w-[42px] rounded-[10px]" style={{ backgroundColor: bg }} />
}

export default function BestCustomOptionSection() {
  const [data, setData] = useState<BestOptionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [idx, setIdx] = useState(0)
  const [errorByUrl, setErrorByUrl] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchBest = async () => {
      setLoading(true)
      setErrorMsg(null)

      try {
        const items = await getBestReviews()
        setData(items.slice(0, 5))
      } catch (e) {
        setErrorMsg(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.')
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchBest()
  }, [])

  useEffect(() => {
    if (!data.length) return
    setIdx((prev) => Math.min(prev, data.length - 1))
  }, [data.length])

  const items = data

  if (loading) return null
  if (errorMsg) return null
  if (!items.length) return null

  const current = items[idx]
  const imgUrl = current?.cakeImageUrl ?? ''
  const isImgError = !!(imgUrl && errorByUrl[imgUrl])

  const goPrev = () => {
    if (!items.length) return
    setIdx((prev) => (prev - 1 + items.length) % items.length)
  }
  const goNext = () => {
    if (!items.length) return
    setIdx((prev) => (prev + 1) % items.length)
  }

  const optionRows: Array<[string, string]> = [
    ['디자인', current?.options?.designName || '-'],
    ['맛', current?.options?.taste || '-'],
    ['데코', current?.options?.deco ? current.options.deco : '-'],
    ['추가요청', current?.options?.additionalRequest || '-'],
  ]

  const colors = current?.options?.colors

  return (
    <section className="relative mx-auto flex w-full max-w-md flex-col items-center px-6 py-5 text-center">
      <div className="w-full rounded-[10px] bg-[var(--color-main-pink-30)] px-3 py-3">
        <div className="flex items-center">
          <h2 className="pl-2 !text-[17px] !font-semibold text-black">BEST 커스텀 옵션</h2>

          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="prev"
              className="grid h-[44px] w-[44px] place-items-center rounded-full border-[1.5px] border-[var(--color-main-red-100)] text-[var(--color-main-red-100)] hover:bg-white/20 active:scale-[0.98]"
            >
              <ChevronLeft size={35} className="leading-none" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="next"
              className="grid h-[44px] w-[44px] place-items-center rounded-full border-[1.5px] border-[var(--color-main-red-100)] text-[var(--color-main-red-100)] hover:bg-white/20 active:scale-[0.98]"
            >
              <ChevronRight size={35} className="leading-none" />
            </button>
          </div>
        </div>

        <div className="mt-2 h-[1px] w-full bg-[var(--color-main-red-100)]" />

        <div className="mt-4">
          <BestReviewCard
            writerName={current.writerName}
            createdDate={current.createdDate}
            rating={current.rating}
            content={current.content}
            keywords={current.keywords}
          />
        </div>

        <div className="mt-2 mb-6 grid grid-cols-2 gap-3">
          <div>
            <div className="mb-2 justify-left flex">
              <PillLabel>Design</PillLabel>
            </div>

            <div className="overflow-hidden rounded-[10px] bg-white">
              <div className="relative aspect-[4/5] w-full bg-black/5">
                {!isImgError && imgUrl && (
                  <img
                    key={imgUrl}
                    src={imgUrl}
                    alt="cake"
                    className="h-full w-full object-cover"
                    onError={() =>
                      setErrorByUrl((prev) => ({
                        ...prev,
                        [imgUrl]: true,
                      }))
                    }
                  />
                )}

                {(isImgError || !imgUrl) && (
                  <div className="absolute inset-0 grid place-items-center text-[13px] text-black/40">
                    이미지가 없습니다
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <div className="mb-2 justify-left flex">
                <PillLabel>Option</PillLabel>
              </div>

              <div className="rounded-[10px] border-[1.5px] border-[var(--color-main-red-100)] bg-transparent p-2">
                <div className="space-y-1 text-[11px] text-left">
                  {optionRows.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[40px_1fr] gap-2">
                      <div className="font-semibold text-black/80">{k}</div>
                      <div className="text-black/70">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 justify-left flex">
                <PillLabel>Color</PillLabel>
              </div>

              <div className="flex items-start gap-1.5">
                <ColorSwatch color={colors?.icingColor} />
                <ColorSwatch color={colors?.sheetColor} />
                <ColorSwatch color={colors?.creamColor} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
