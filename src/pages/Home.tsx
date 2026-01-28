import { useState } from 'react'
import { SearchInput } from '../components/input/SearchInput'
import { Locate } from 'lucide-react'
import { BottomSheet } from '../components/BottomSheet'
import StoreCard from '../components/StoreCard'
import PromoCarousel from '../components/PromoCarousel'
import CategoryChips from '../components/CategoryChips'
import TopFiveSection from '../components/TopFiveSection'
import SortDropdown from '../components/SortDropdown'
import CakeGallery from '../components/CakeGallery'

import PromoBanner from '../assets/img/promoBanner.png'

const PROMO_ITEMS = [
  {
    image: PromoBanner,
    title: '크리스마스 파티 케이크',
    subtitle: '따뜻한 연말, 특별한 케이크와 함께',
  },
  {
    image: PromoBanner,
    title: '기념일 스페셜',
    subtitle: '소중한 날, 특별한 케이크로 함께하세요',
  },
  {
    image: PromoBanner,
    title: '홈파티 추천',
    subtitle: '간편하고 예쁜 파티용 케이크 모음',
  },
]

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [sort, setSort] = useState('')

  return (
    <div className="min-h-screen w-full bg-[#FCF4F3] mt-14">
      <div className="container !px-0">
        <section className="px-4 pt-4">
          <SearchInput
            value={keyword}
            onChange={setKeyword}
            onSubmit={() => setIsSheetOpen(true)}
          />
        </section>

        <section className="px-4 mt-4">
          <PromoCarousel items={PROMO_ITEMS} />
        </section>

        <section className="mt-6">
          <TopFiveSection />
        </section>

        <section className="mt-6 px-4">
          <CategoryChips />
        </section>

        <section className="mt-8 px-4">
          <div className="mx-auto max-w-[488px] flex items-center justify-between">
            <SortDropdown value={sort} onChange={setSort} />

            <div className="flex items-center gap-1.5 text-sm text-[#0A0A0A]">
              <Locate size={20} className="text-[var(--color-main-pink-100)]" />
              <span className="font-medium">현재 위치:</span>
              <span>서울시 마포구</span>
            </div>
          </div>
        </section>

        <section className="mt-4 px-4 pb-10">
          <CakeGallery />
        </section>

        <BottomSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          title="검색 결과"
          description={'다가오는 크리스마스,\n마음에 쏙 드는 선물을 찾아보세요!'}
        >
          <StoreCard
            image=""
            tags={['크리스마스', '기념일', '파티']}
            name="스위트 드림즈 베이커리"
            star={4.25}
            distance={2.5}
            minprice={20000}
            maxprice={100000}
          />
        </BottomSheet>
      </div>
    </div>
  )
}
