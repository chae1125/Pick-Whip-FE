import { useCallback, useMemo, useState } from 'react'
import { Locate } from 'lucide-react'

import { SearchInput } from '../components/input/SearchInput'
import { BottomSheet } from '../components/BottomSheet'
import StoreCard from '../components/StoreCard'
import PromoCarousel from '../components/home/PromoCarousel'
import CategoryChips from '../components/CategoryChips'
import TopFiveSection from '../components/home/TopFiveSection'
import SortDropdown from '../components/SortDropdown'
import CakeGallery from '../components/home/CakeGallery'
import MyPickBanner from '@/components/home/MyPickBanner'
import PopularCake from '@/components/home/PopularCake'
import PromoCopy from '@/components/home/PromoCopy'
import BestCustomOptionSection from '@/components/home/BestCustomOptionSection'

import PromoBanner from '../assets/img/promoBanner.png'
import PromoBanner2 from '../assets/img/promoBanner2.png'
import PromoBanner3 from '../assets/img/promoBanner3.png'

const PROMO_ITEMS = [
  {
    image: PromoBanner,
    title: '크리스마스 파티 케이크',
    subtitle: '따뜻한 연말, 특별한 케이크와 함께',
  },
  {
    image: PromoBanner2,
    title: '기념일 스페셜',
    subtitle: '소중한 날, 특별한 케이크로 함께하세요',
  },
  {
    image: PromoBanner3,
    title: '홈파티 추천',
    subtitle: '간편하고 예쁜 파티용 케이크 모음',
  },
]

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [sort, setSort] = useState('')

  const handleKeywordChange = useCallback((v: string) => setKeyword(v), [])
  const handleSortChange = useCallback((v: string) => setSort(v), [])
  const openSheet = useCallback(() => setIsSheetOpen(true), [])
  const closeSheet = useCallback(() => setIsSheetOpen(false), [])

  const sheetDescription = useMemo(
    () => '다가오는 크리스마스,\n마음에 쏙 드는 선물을 찾아보세요!',
    [],
  )

  return (
    <div className="mt-14 min-h-screen w-full bg-[#FCF4F3]">
      <div className="container !px-0">
        <section className="px-4 pt-4">
          <SearchInput value={keyword} onChange={handleKeywordChange} onSubmit={openSheet} />
        </section>

        <section className="mt-4 px-4">
          <PromoCarousel items={PROMO_ITEMS} />
        </section>

        <section className="mt-6">
          <TopFiveSection />
        </section>

        <section className="mt-6 px-4">
          <CategoryChips />
        </section>

        <section className="mt-8 px-4">
          <div className="mx-auto flex max-w-[488px] items-center justify-between">
            <SortDropdown value={sort} onChange={handleSortChange} />

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

        <section className="mt-6">
          <MyPickBanner />
        </section>

        <section className="mt-6">
          <PopularCake />
        </section>

        <section className="mt-6">
          <PromoCopy />
        </section>

        <section className="mt-3">
          <BestCustomOptionSection />
        </section>

        <BottomSheet
          isOpen={isSheetOpen}
          onClose={closeSheet}
          title="검색 결과"
          description={sheetDescription}
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
