import { useEffect, useState, useCallback } from 'react'
import StoreTabsHeader, { type StoreTabKey } from '../components/store-detail/StoreTabsHeader'
import StoreCard, { type StoreInfoCard } from '../components/store-detail/StoreCard'
import { getShopDetail } from '@/apis/shop'
import BackHeader from '@/components/BackHeader'
import DesignGalleryPage from '../pages/DesignGalleryPage'
import StoreInfoPage from '../pages/StoreInfoPage'
import ReviewPage from '../pages/ReviewPage'

function formatDistanceKm(distance: number) {
  return `${distance.toFixed(1)}km`
}

function getBrowserLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      return reject(new Error('이 브라우저는 위치 정보를 지원하지 않습니다.'))
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 8000 },
    )
  })
}

type ShopDetailPageProps = {
  shopId: number
  onBack: () => void
}

export default function ShopDetailPage({ shopId, onBack }: ShopDetailPageProps) {
  void onBack

  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [store, setStore] = useState<StoreInfoCard | null>(null)

  const [tab, setTab] = useState<StoreTabKey>('design')

  useEffect(() => {
    setTab('design')
  }, [shopId])

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setErrorMsg(null)

      try {
        let lat = 37
        let lon = 127

        try {
          const loc = await getBrowserLocation()
          lat = loc.lat
          lon = loc.lon
        } catch (e) {
          console.error(e)
        }

        const data = await getShopDetail(shopId, lat, lon)

        const next: StoreInfoCard = {
          shopId: data.shopId,
          shopName: data.shopName,
          shopImageUrl: data.shopImageUrl,
          averageRating: data.averageRating,
          reviewCount: data.reviewCount,
          distance: formatDistanceKm(data.distanceKm),
          address: data.address,
          phone: data.phone,
          keywords: data.keywords ?? [],
        }

        setStore(next)
      } catch (e) {
        setErrorMsg(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.')
      } finally {
        setLoading(false)
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

          <StoreCard {...store} />

          <StoreTabsHeader store={store} activeTab={tab} onChange={handleTabChange} />

          <section className="w-full px-4 pb-6">
            {tab === 'design' && <DesignGalleryPage store={store} />}
            {tab === 'info' && <StoreInfoPage shopId={store.shopId} />}
            {tab === 'review' && <ReviewPage shopId={store.shopId} />}
          </section>
        </>
      )}
    </div>
  )
}
