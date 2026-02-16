import { useEffect, useState, useCallback, useRef } from 'react'
import StoreTabsHeader, { type StoreTabKey } from '../components/store-detail/StoreTabsHeader'
import StoreCard, { type StoreInfoCard } from '../components/store-detail/StoreCard'
import { getShopDetail } from '@/apis/shop'
import BackHeader from '@/components/BackHeader'
import DesignGalleryPage from '../pages/DesignGalleryPage'
import StoreInfoPage from '../pages/StoreInfoPage'
import ReviewPage from '../pages/ReviewPage'

function formatDistanceKm(distance?: number | null) {
  if (typeof distance !== 'number' || !isFinite(distance)) return '-'
  return `${distance.toFixed(1)}km`
}

const GEO_TIMEOUT = 2000

function getBrowserLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      return reject(new Error('이 브라우저는 위치 정보를 지원하지 않습니다.'))

    const cached = sessionStorage.getItem('user_loc')
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        return resolve(parsed)
      } catch (e) {
        console.warn('세션 스토리지에서 위치 정보 파싱 실패, 새로 요청', e)
      }
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lon: pos.coords.longitude }
        sessionStorage.setItem('user_loc', JSON.stringify(loc))
        resolve(loc)
      },
      (err) => reject(err),
      { enableHighAccuracy: false, timeout: GEO_TIMEOUT },
    )
  })
}

const DEFAULT_LOC = { lat: 37.5665, lon: 126.978 }

type ShopDetailPageProps = {
  shopId: number
  onBack: () => void
  sheetFull?: boolean
}

export default function ShopDetailPage({ shopId, onBack, sheetFull }: ShopDetailPageProps) {
  void onBack

  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [store, setStore] = useState<StoreInfoCard | null>(null)
  const [tab, setTab] = useState<StoreTabKey>('design')

  const isFetching = useRef(false)

  useEffect(() => {
    setTab('design')
  }, [shopId])

  useEffect(() => {
    const run = async () => {
      if (isFetching.current) return
      isFetching.current = true

      setLoading(true)
      setErrorMsg(null)

      try {
        let lat = DEFAULT_LOC.lat
        let lon = DEFAULT_LOC.lon
        try {
          const loc = await getBrowserLocation()
          lat = loc.lat
          lon = loc.lon
        } catch (e) {
          console.warn('위치 정보 가져오기 실패 또는 타임아웃, 기본 위치 사용', e)
        }

        const data = await getShopDetail(shopId, lat, lon)

        const next: StoreInfoCard = {
          shopId: data.shopId,
          shopName: data.shopName,
          shopImageUrl: data.shopImageUrl,
          averageRating: data.averageRating ?? 0,
          reviewCount: data.reviewCount ?? 0,
          distance: formatDistanceKm(data.distanceKm ?? null),
          address: data.address,
          phone: data.phone,
          keywords: data.keywords ?? [],
        }

        setStore(next)
      } catch (e) {
        setErrorMsg(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.')
      } finally {
        setLoading(false)
        isFetching.current = false
      }
    }

    run()
  }, [shopId])

  const handleTabChange = useCallback((next: StoreTabKey) => {
    setTab(next)
  }, [])

  return (
    <div className="w-full">
      {loading ? (
        <div className="p-4" />
      ) : errorMsg || !store ? (
        <div className="p-6">
          <p className="text-sm text-gray-700">매장 정보를 불러오기에 실패했어요.</p>
          <p className="mt-1 text-xs text-gray-500">{errorMsg ?? '데이터가 없습니다.'}</p>
        </div>
      ) : (
        <>
          <BackHeader
            title="매장 상세"
            bgColor="bg-[#FCF4F3]"
            titleClassName="!text-[20px] font-semibold"
            height="h-[66px]"
          />

          <StoreCard {...store} isPage={!sheetFull} />

          <StoreTabsHeader store={store} activeTab={tab} onChange={handleTabChange} />

          <section className="w-full px-4 pb-6 bg-[#FCF4F3]">
            {tab === 'design' && <DesignGalleryPage store={store} sheetFull={sheetFull} />}
            {tab === 'info' && <StoreInfoPage shopId={store.shopId} />}
            {tab === 'review' && <ReviewPage shopId={store.shopId} />}
          </section>
        </>
      )}
    </div>
  )
}
