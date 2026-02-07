import { Outlet } from 'react-router-dom'
import StoreTabsHeader from '../components/store-detail/StoreTabsHeader'
import type { StoreInfoCard } from '../components/store-detail/StoreCard'

const MOCK_STORE: StoreInfoCard = {
  shopName: '스위트 드림즈 베이커리',
  shopImageUrl: null,
  averageRating: 4.8,
  reviewCount: 342,
  distance: '0.3km',
  address: '서울시 강남구 테헤란로 123',
  phone: '02-1234-5678',
  keywords: ['레터링 케이크', '당일 주문 가능', '픽업 전용'],
}

export default function ShopDetailPage() {
  const store = MOCK_STORE

  return (
    <main className="container w-full min-h-screen bg-[#FCF4F3]">
      <StoreTabsHeader store={store} />

      <section className="w-full">
        <Outlet context={{ store }} />
      </section>
    </main>
  )
}
