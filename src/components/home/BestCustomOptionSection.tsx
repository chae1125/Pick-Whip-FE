import { useMemo, useState } from 'react'
import BestReviewCard from './BestReveiwCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type BestOptionItem = {
  writerName: string
  createdDate: string
  rating: number
  helpfulCount: number
  content: string
  keywords: string[]
  cakeImageUrl: string
  options: {
    designName: string
    taste: string
    deco: string
    additionalRequest: string | null
    colors: {
      icingColor: string | null
      sheetColor: string | null
      creamColor: string | null
    }
  }
}

type BestOptionsResponse = {
  isSuccess: boolean
  code: string
  message: string
  result?: {
    items?: BestOptionItem[]
  }
  success?: boolean
}

const dummyBestOptionsResponse: BestOptionsResponse = {
  isSuccess: true,
  code: 'COMMON200',
  message: '성공입니다.',
  result: {
    items: [
      {
        writerName: '민지',
        createdDate: '2026.01.15',
        rating: 5,
        helpfulCount: 128,
        content:
          '색감 조합이 정말 예뻤고 요청사항도 정확하게 반영해주셨어요. 사진이랑 실물이 거의 똑같았습니다!',
        keywords: ['색감이 예뻐요', '사진이랑 똑같아요'],
        cakeImageUrl: 'https://loremflickr.com/400/500/cake?lock=11',
        options: {
          designName: '2호 하트',
          taste: '바닐라 시트 + 우유 크림',
          deco: '과일 데코',
          additionalRequest: '하트 레터링 강조',
          colors: {
            icingColor: '#FFD6E8',
            sheetColor: '#F5B7B1',
            creamColor: '#FFF5F5',
          },
        },
      },
      {
        writerName: '케이크러버',
        createdDate: '2026.01.28',
        rating: 4,
        helpfulCount: 86,
        content: '전체적으로 만족스러웠어요! 다만 크림이 살짝 달긴 했지만 디자인은 최고였습니다.',
        keywords: ['디자인 만족', '포장 깔끔'],
        cakeImageUrl: 'https://loremflickr.com/400/500/cake?lock=12',
        options: {
          designName: '1호 원형',
          taste: '초코 시트 + 마스카포네',
          deco: '초콜릿 조각',
          additionalRequest: null,
          colors: {
            icingColor: '#E3F2FD',
            sheetColor: '#6D4C41',
            creamColor: '#FFFFFF',
          },
        },
      },
      {
        writerName: '소연',
        createdDate: '2026.02.01',
        rating: 5,
        helpfulCount: 42,
        content: '기념일용으로 주문했는데 받는 사람이 정말 좋아했어요. 다음에도 여기서 주문할게요!',
        keywords: ['기념일 추천'],
        cakeImageUrl: 'https://loremflickr.com/400/500/cake?lock=13',
        options: {
          designName: '미니 1호',
          taste: '레몬 시트 + 요거트 크림',
          deco: '플라워 토핑',
          additionalRequest: '노란색 포인트',
          colors: {
            icingColor: '#FFF9C4',
            sheetColor: '#F0E68C',
            creamColor: '#FFFFFF',
          },
        },
      },
      {
        writerName: '디저트덕후',
        createdDate: '2026.02.03',
        rating: 3,
        helpfulCount: 21,
        content: '디자인은 마음에 들었는데 배송 시간이 조금 아쉬웠어요. 그래도 맛은 괜찮았습니다.',
        keywords: ['맛있어요'],
        cakeImageUrl: 'https://loremflickr.com/400/500/cake?lock=14',
        options: {
          designName: '2단 케이크',
          taste: '녹차 시트 + 생크림',
          deco: '말차 파우더',
          additionalRequest: null,
          colors: {
            icingColor: '#E8F5E9',
            sheetColor: '#81C784',
            creamColor: '#F1F8E9',
          },
        },
      },
      {
        writerName: '하늘',
        createdDate: '2026.02.05',
        rating: 4,
        helpfulCount: 9,
        content: '무난하고 깔끔한 디자인이라 부모님 생신 케이크로 좋았어요.',
        keywords: ['부모님 생신', '깔끔한 디자인'],
        cakeImageUrl: 'https://loremflickr.com/400/500/cake?lock=15',
        options: {
          designName: '3호 원형',
          taste: '고구마 무스',
          deco: '견과류',
          additionalRequest: '문구 작게',
          colors: {
            icingColor: '#F3E5AB',
            sheetColor: '#D7B899',
            creamColor: '#FFFFFF',
          },
        },
      },
    ],
  },
  success: true,
}

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
  const items = useMemo(() => {
    const raw = dummyBestOptionsResponse?.result?.items ?? []
    return raw.slice(0, 5)
  }, [])

  const [idx, setIdx] = useState(0)
  const [errorByUrl, setErrorByUrl] = useState<Record<string, boolean>>({})

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
