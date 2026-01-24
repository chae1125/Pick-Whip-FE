import { useEffect, useRef, useState } from 'react'
import CakeCard from './CakeCard'

type Cake = {
  shopName: string
  rating: number
  productName: string
  price: number
  imageUrl: string
}

export default function TopFiveCarousel({ items }: { items?: Cake[] }) {
  const defaultItems: Cake[] = items ?? [
    {
      shopName: '베리케이크',
      rating: 4.8,
      productName: '레드벨벳 케이크',
      price: 25000,
      imageUrl:
        'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=1000&auto=format&fit=crop', // red velvet cake
    },
    {
      shopName: '슈가하우스',
      rating: 4.7,
      productName: '티라미수 케이크',
      price: 22000,
      imageUrl:
        'https://images.unsplash.com/photo-1542326237-94b1c5a538d4?q=80&w=1000&auto=format&fit=crop',
    },
    {
      shopName: '밀크앤베리',
      rating: 4.6,
      productName: '초코 무스 케이크',
      price: 27000,
      imageUrl:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop', // chocolate cake
    },
    {
      shopName: '허니베이커',
      rating: 4.5,
      productName: '치즈 케이크',
      price: 23000,
      imageUrl:
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop', // cheesecake
    },
    {
      shopName: '블룸베이커리',
      rating: 4.4,
      productName: '과일 생크림 케이크',
      price: 30000,
      imageUrl:
        'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop', // fruit cream cake
    },
  ]

  const slides = items && items.length > 0 ? items : defaultItems
  const len = slides.length
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % len)
    }, 3500)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [len])

  const SLIDE_WIDTH = 260
  const GAP = 24
  const fraction = len > 1 ? index / (len - 1) : 0
  const TRACK_W = 60
  const PILL_W = 20
  const pillPercent = (PILL_W / TRACK_W) * 100
  const leftPercent = fraction * (100 - pillPercent)

  return (
    <div className="relative w-full max-w-lg mx-auto py-6 bg-[#F4D3D3B2]">
      <div className="relative overflow-hidden">
        <div
          className="flex items-center gap-6 transition-transform duration-500 ease-out
                 pl-[calc(50%-130px)] pr-[calc(50%-130px)]"
          style={{ transform: `translateX(-${index * (SLIDE_WIDTH + GAP)}px)` }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="w-[260px] h-[220px] flex-shrink-0 overflow-visible flex items-center justify-center"
            >
              <div className="relative w-[198px] h-[198px] overflow-visible">
                <span
                  className="pointer-events-none absolute top-1/6 -translate-y-1/2
                    left-[-60px] z-20 font-['Rammetto_One'] text-[55px] text-[#FF9886] leading-none select-none"
                >
                  {i + 1}
                </span>

                <div className="w-full h-full overflow-visible">
                  <CakeCard
                    shopName={s.shopName}
                    rating={s.rating}
                    productName={s.productName}
                    price={s.price}
                    imageUrl={s.imageUrl}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="relative flex items-center">
          <div className="h-1 w-20 rounded-full bg-[#FDF4EB]" aria-hidden />

          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={Math.max(0, len - 1)}
            aria-valuenow={index}
            className="absolute top-0 h-1 w-7 rounded-full bg-[var(--color-main-red-100)] shadow-sm transition-all duration-300 ease-out"
            style={{ left: `${leftPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}
