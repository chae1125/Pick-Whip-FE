import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import CakeCard from './CakeCard'
import { addFavoriteDesign, removeFavoriteDesign } from '@/apis/design'
import { getUserIdFromToken } from '@/utils/auth'

export type Cake = {
  designId: number
  shopId: number
  shopName: string
  rating: number
  productName: string
  price: number
  imageUrl: string
  isLiked: boolean
}

export default function TopFiveCarousel({ items }: { items: Cake[] }) {
  const len = items.length
  const navigate = useNavigate()

  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)
  const [cakes, setCakes] = useState<Cake[]>(items)
  const userId = getUserIdFromToken()

  useEffect(() => {
    setCakes(items)
  }, [items])

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % len)
    }, 3500)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [len])

  const handleToggleLike = useCallback(
    async (designId: number, currentLiked: boolean) => {
      if (!userId) {
        console.error('로그인이 필요합니다')
        return
      }

      setCakes((prev) =>
        prev.map((cake) =>
          cake.designId === designId ? { ...cake, isLiked: !currentLiked } : cake,
        ),
      )

      try {
        if (currentLiked) {
          await removeFavoriteDesign({ designId, userId })
        } else {
          await addFavoriteDesign({ designId, userId })
        }
      } catch (error) {
        console.error('찜하기 토글 실패:', error)
        setCakes((prev) =>
          prev.map((cake) =>
            cake.designId === designId ? { ...cake, isLiked: currentLiked } : cake,
          ),
        )
      }
    },
    [userId],
  )

  const SLIDE_WIDTH = 260
  const GAP = 24

  return (
    <div className="relative w-full max-w-lg mx-auto py-6 bg-[#F4D3D3B2]">
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out
            pl-[calc(50%-130px)] pr-[calc(50%-130px)]"
          style={{ transform: `translateX(-${index * (SLIDE_WIDTH + GAP)}px)` }}
        >
          {cakes.map((s, i) => (
            <div
              key={s.designId}
              className="w-[260px] h-[220px] flex-shrink-0 flex items-center justify-center"
            >
              <div className="relative w-[198px] h-[198px]">
                <span
                  className="pointer-events-none absolute top-1/6 -translate-y-1/2
                    left-[-60px] z-20 font-['Rammetto_One'] text-[55px] text-[#FF9886] leading-none select-none"
                >
                  {i + 1}
                </span>

                <CakeCard
                  shopName={s.shopName}
                  rating={s.rating}
                  productName={s.productName}
                  price={s.price}
                  imageUrl={s.imageUrl}
                  isLiked={s.isLiked}
                  onToggleLike={() => handleToggleLike(s.designId, s.isLiked)}
                  onClick={() => navigate(`/shop/${s.shopId}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="relative h-1 w-20 rounded-full bg-[#FDF4EB]">
          <div
            className="absolute top-0 h-1 w-7 rounded-full
              bg-[var(--color-main-red-100)] transition-all duration-300"
            style={{
              left: `${len > 1 ? (index / (len - 1)) * 65 : 0}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
