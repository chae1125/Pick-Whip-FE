import { useEffect, useRef, useState } from 'react'

type Item = {
  image?: string
  title: string
  subtitle?: string
  ctaText?: string
}

export default function PromoCarousel({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const len = items.length
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (isPaused) return
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % len)
    }, 4000)

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [isPaused, len])

  if (!items || items.length === 0) return null

  const go = (to: number) => setIndex((to + len) % len)

  return (
    <div
      className="relative w-full max-w-lg h-52 mx-auto overflow-hidden rounded-[14px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {items.map((it, i) => (
          <div
            key={i}
            className="min-w-full h-full relative bg-gray-200"
            style={
              it.image
                ? {
                    backgroundImage: `url(${it.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : undefined
            }
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(208, 208, 208, 0.35) 40.38%, rgba(116, 116, 116, 0.75) 69.23%, #464646 100%)',
              }}
            />

            <div className="absolute left-6 bottom-6 max-w-[65%]">
              <h3 className="text-white text-[20px] font-semibold text-shadow-md">{it.title}</h3>

              {it.subtitle && (
                <p className="mt-2 !text-[13px] text-white/90 text-shadow-md leading-[17.5px]">
                  {it.subtitle}
                </p>
              )}

              <div className="mt-3 text-[12px] text-white/80 flex items-center gap-2">
                <button
                  aria-label="이전 페이지"
                  onClick={() => go(index - 1)}
                  className="px-2 hover:text-white"
                >
                  &lt;
                </button>

                <span>
                  {index + 1} / {len}
                </span>

                <button
                  aria-label="다음 페이지"
                  onClick={() => go(index + 1)}
                  className="px-2 hover:text-white"
                >
                  &gt;
                </button>
              </div>
            </div>

            <button
              className="absolute right-6 bottom-6 z-10 rounded-full
                bg-[var(--color-sub-brown-200)]
                px-4 py-1.5 !text-[13.5px] font-medium text-white
                shadow-md hover:bg-opacity-90 transition-colors"
            >
              {it.ctaText ?? '보러가기'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
