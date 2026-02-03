import SectionCard from '../components/store-detail/info/SectionCard'
import PriceSection, { type PriceRow } from '../components/store-detail/info/PriceSection'
import SizeSection, { type SizeRow } from '../components/store-detail/info/SizeSection'
import PickupSection, { type PickupInfo } from '../components/store-detail/info/PickupSection'
import PaymentSection, { type PaymentMethod } from '../components/store-detail/info/PaymentSection'
import NoticeSection from '../components/store-detail/info/NoticeSection'
import EventSection, { type EventInfo } from '../components/store-detail/info/EventSection'

export default function StoreInfoPage() {
  const prices: PriceRow[] = [
    { label: '도시락', price: '35,000원' },
    { label: '1호', price: '+10,000원' },
    { label: '2호', price: '+20,000원' },
  ]

  const sizes: SizeRow[] = [
    { cm: 10, label: '도시락' },
    { cm: 15, label: '1호' },
    { cm: 20, label: '2호' },
  ]

  const pickup: PickupInfo = {
    operatingHours: '매일 10:00 - 20:00',
    pickupTime: '주문 후 최소 2일 소요',
    sameDayOrder: '재고 케이크 한정 가능',
    parking: '매장 앞 공영주차장 이용',
  }

  const paymentMethods: PaymentMethod[] = [
    'CARD',
    'BANK_TRANSFER',
    'NAVER_PAY',
    'KAKAO_PAY',
    'TOSS_PAY',
  ]

  const notices: string[] = [
    '주문 후 변경은 픽업 2일 전까지 가능합니다.',
    '생과일 케이크는 당일 소비를 권장합니다.',
    '알레르기가 있으신 경우 주문 시 꼭 알려주세요.',
    '픽업 시간을 지키지 못할 경우 사전에 연락 부탁드립니다.',
    '세부 디자인은 실제와 다소 차이가 있을 수 있습니다.',
  ]

  const events: EventInfo[] = [
    {
      title: '🎉 11월 특별 할인',
      body: '레터링 케이크 주문 시 10% 할인',
      period: '2024.11.01 - 11.30',
    },
    {
      title: '🎉 11월 특별 할인',
      body: '테스트',
      period: '2024.11.01 - 11.30',
    },
  ]

  return (
    <main className="bg-[#FCF4F3]">
      <SectionCard title="가격 안내">
        <PriceSection prices={prices} />
      </SectionCard>

      <SectionCard title="사이즈 안내" subtitle="(cm 기준)">
        <SizeSection sizes={sizes} />
      </SectionCard>

      <SectionCard title="픽업 안내">
        <PickupSection pickup={pickup} />
      </SectionCard>

      <SectionCard title="결제 안내">
        <PaymentSection paymentMethods={paymentMethods} />
      </SectionCard>

      <SectionCard title="유의사항">
        <NoticeSection notices={notices} />
      </SectionCard>

      <SectionCard title="진행중인 이벤트">
        <EventSection events={events} />
      </SectionCard>
    </main>
  )
}
