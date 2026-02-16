import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Locate } from 'lucide-react'

import { SearchInput } from '../components/input/SearchInput'
import { BottomSheet } from '../components/BottomSheet'
import StoreCard from '../components/StoreCard'
import PromoCarousel from '../components/home/PromoCarousel'
import CategoryChips, { type CategoryValue } from '../components/CategoryChips'
import TopFiveSection from '../components/home/TopFiveSection'
import SortDropdown from '../components/SortDropdown'
import CakeGallery from '../components/home/CakeGallery'
import MyPickBanner from '@/components/home/MyPickBanner'
import PopularCake from '@/components/home/PopularCake'
import PromoCopy from '@/components/home/PromoCopy'
import BestCustomOptionSection from '@/components/home/BestCustomOptionSection'

import { getDesignGallery } from '@/apis/home'
import type { DesignGalleryItem, DesignSort } from '@/apis/home'
import { getUserIdFromToken } from '@/utils/auth'

import PromoBanner from '../assets/img/PromoBanner1.png'
import PromoBanner2 from '../assets/img/PromoBanner2.png'
import PromoBanner3 from '../assets/img/PromoBanner3.png'
import ShopDetailPage from './ShopDetailPage'

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
  const shopId = 2 // 지금은 임시
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [category, setCategory] = useState<CategoryValue>('전체')
  const [sort, setSort] = useState<DesignSort>('NAME')
  const [page, setPage] = useState(0)

  const [region, setRegion] = useState('')
  const [items, setItems] = useState<DesignGalleryItem[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const lat = 37
  const lon = 127
  const userId = getUserIdFromToken() ?? 0

  const [sheetMode, setSheetMode] = useState<'list' | 'detail'>('list')
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null)

  const handleKeywordChange = useCallback((v: string) => setKeyword(v), [])

  const openSheet = useCallback(() => {
    setIsSheetOpen(true)
    setSheetMode('list')
    setSelectedShopId(null)
  }, [])

  const closeSheet = useCallback(() => {
    setIsSheetOpen(false)
    setSheetMode('list')
    setSelectedShopId(null)
  }, [])

  const openDetail = useCallback((id: number) => {
    setSelectedShopId(id)
    setSheetMode('detail')
    setIsSheetOpen(true)
  }, [])

  const backToList = useCallback(() => {
    setSheetMode('list')
    setSelectedShopId(null)
  }, [])

  const sheetDescription = useMemo(
    () => '다가오는 크리스마스,\n마음에 쏙 드는 선물을 찾아보세요!',
    [],
  )

  useEffect(() => {
    const token = params.get('accessToken')
    if (token) {
      localStorage.setItem('accessToken', token)
      navigate('/', { replace: true })
    }
  }, [params, navigate])

  const fetchGallery = useCallback(async () => {
    setLoading(true)
    try {
      const categoryParam = category === '전체' ? undefined : category

      const res = await getDesignGallery({
        category: categoryParam,
        sort,
        lat,
        lon,
        page,
        userId,
      })

      setRegion(res.currentRegion)
      setItems(res.designs)
      setTotalPages(Math.max(1, res.totalPage))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [category, sort, page, lat, lon, userId])

  useEffect(() => {
    fetchGallery()
  }, [fetchGallery])

  const handleCategoryChange = (newCategory: CategoryValue) => {
    if (category === newCategory) return
    setCategory(newCategory)
    setPage(0)
  }

  const handleSortChange = (value: DesignSort) => {
    setSort(value)
    setPage(0)
  }

  return (
    <div className="mt-14 min-h-screen w-full bg-[#FCF4F3]">
      <div className="container !px-0">
        <section className="px-4 pt-4">
          <SearchInput
            value={keyword}
            onChange={handleKeywordChange}
            onSubmit={openSheet}
            goToMapOnFocus
          />
        </section>

        <section className="mt-4 px-4">
          <PromoCarousel items={PROMO_ITEMS} />
        </section>

        <section className="mt-6">
          <TopFiveSection />
        </section>

        <section className="mt-6 px-4">
          <CategoryChips value={category} onChange={handleCategoryChange} />
        </section>

        <section className="mt-8 px-4">
          <div className="mx-auto flex max-w-[488px] items-center justify-between">
            <SortDropdown value={sort} onChange={handleSortChange} />

            <div className="flex items-center gap-1.5 text-sm text-[#0A0A0A]">
              <Locate size={20} className="text-[var(--color-main-pink-100)]" />
              <span className="font-medium">현재 위치:</span>
              <span className="font-medium">{region || '위치 확인 중...'}</span>
            </div>
          </div>
        </section>

        <section className="mt-4 px-4 pb-10">
          <CakeGallery
            items={items}
            page={page + 1}
            totalPages={totalPages}
            loading={loading}
            onPrev={() => setPage((p) => Math.max(0, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          />
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
          title={sheetMode === 'list' ? '검색 결과' : ''}
          description={sheetMode === 'list' ? sheetDescription : undefined}
          sheetBg="#FCF4F3"
        >
          {sheetMode === 'list' ? (
            <StoreCard
              image=""
              tags={['크리스마스', '기념일', '파티']}
              name="스위트 드림즈 베이커리"
              star={4.25}
              distance={2.5}
              minprice={20000}
              maxprice={100000}
              onClick={() => openDetail(shopId)}
            />
          ) : (
            <ShopDetailPage shopId={selectedShopId ?? shopId} onBack={backToList} />
          )}
        </BottomSheet>
      </div>
    </div>
  )
}
