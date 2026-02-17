import { useEffect, useState } from 'react'
import TopFiveCarousel, { type Cake } from './TopFiveCarousel'
import { getTopFiveCakes } from '@/apis/home'
import { getUserIdWithCookie } from '@/utils/auth'

export default function TopFiveSection() {
  const [items, setItems] = useState<Cake[]>([])
  const [userId, setUserId] = useState<number>(0)

  useEffect(() => {
    getUserIdWithCookie().then((id) => setUserId(id ?? 0))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopFiveCakes(userId)

        const mappedItems: Cake[] = data.map((item) => ({
          designId: item.designId,
          shopId: item.shopId,
          shopName: item.shopName,
          rating: item.averageRating,
          productName: item.cakeName,
          price: item.minPrice,
          imageUrl: item.cakeImageUrl,
          isLiked: item.myPick,
        }))

        setItems(mappedItems)
      } catch (error) {
        console.error('TOP 5 로딩 실패:', error)
      }
    }

    fetchData()
  }, [userId])

  if (items.length === 0) {
    return null
  }

  return (
    <section className="mt-6">
      <div className="mx-auto max-w-lg bg-[#F7DEDD] rounded-sm py-5 px-6 text-center relative">
        <div className="absolute left-0 right-0 top-0 h-[1.5px] bg-[#D65151]" />
        <div className="absolute left-0 right-0 top-2 h-[0.8px] bg-[#EFA8A3]" />

        <h2 className="font-['Rammetto_One'] text-[#D65151]">Pick ! &amp; Order</h2>
        <p className="mt-2 !text-[11px] font-bold text-[var(--color-sub-gray-100)]">
          인기 케이크 TOP 5를 만나보세요
        </p>

        <div className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#D65151]" />
        <div className="absolute left-0 right-0 bottom-2 h-[0.8px] bg-[#EFA8A3]" />
      </div>

      <div>
        <TopFiveCarousel items={items} />
      </div>
    </section>
  )
}
