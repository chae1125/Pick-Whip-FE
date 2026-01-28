import { useState, useMemo } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import CakeThumbCard from './CakeThumbCard'

type Item = {
  id?: string
  imageUrl: string
  shopName?: string
  rating?: number
  location?: string
  price?: number
}

const CAKE_IMAGES = [
  'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1557925923-33b27f891f88?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=60',
]

export default function CakeGallery({ items }: { items?: Item[] }) {
  const sample: Item[] = useMemo(
    () =>
      items ??
      Array.from({ length: 32 }).map((_, i) => ({
        id: String(i + 1),
        imageUrl: CAKE_IMAGES[i % CAKE_IMAGES.length],
        shopName: '올데이치즈',
        rating: 4.7,
        location: '서울 마포구',
        price: 30000,
      })),
    [items],
  )

  const list = items && items.length > 0 ? items : sample

  const PAGE_SIZE = 4
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
  const [page, setPage] = useState(1)

  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({})

  const start = (page - 1) * PAGE_SIZE
  const pageItems = list.slice(start, start + PAGE_SIZE)

  const prev = () => setPage((p) => Math.max(1, p - 1))
  const next = () => setPage((p) => Math.min(totalPages, p + 1))

  return (
    <div className="mx-auto max-w-[488px] w-full">
      <div className="grid grid-cols-2 gap-6">
        {pageItems.map((it, idx) => {
          const key = it.id ?? String(start + idx)
          const liked = !!likedMap[key]

          return (
            <div key={key} className="flex flex-col py-1">
              <CakeThumbCard
                imageUrl={it.imageUrl}
                isLiked={liked}
                onToggleLike={() =>
                  setLikedMap((prev) => ({
                    ...prev,
                    [key]: !prev[key],
                  }))
                }
              />

              <div className="mt-3">
                <div className="flex items-center gap-2 border-t border-[#F4D3D3] pt-3 px-1">
                  <div className="text-[15px] font-medium text-[#2A2929]">{it.shopName}</div>

                  <div className="flex items-center gap-1 text-[15px] text-[#2A2929]">
                    <Star size={15} className="fill-[#FDC700] stroke-none" />
                    <span>{(it.rating ?? 0).toFixed(1)}</span>
                  </div>
                </div>

                <div className="mt-0.5 px-1 text-[12px] text-[#2A2929]">{it.location}</div>

                <div className="mt-2 border-t border-b border-[#F4D3D3] py-1.5 px-1 text-[12px] text-[#2A2929] font-medium">
                  ₩ {it.price?.toLocaleString() ?? '-'}~
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#7A6A6A]">
        <button aria-label="이전" onClick={prev} className="px-2">
          <ChevronLeft size={15} />
        </button>

        <div className="select-none">
          {page} / {totalPages}
        </div>

        <button aria-label="다음" onClick={next} className="px-2">
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}
