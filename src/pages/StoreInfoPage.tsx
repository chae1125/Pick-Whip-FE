import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import SectionCard from '../components/store-detail/info/SectionCard'
import PriceSection, { type PriceRow } from '../components/store-detail/info/PriceSection'
import SizeSection, { type SizeRow } from '../components/store-detail/info/SizeSection'
import PickupSection, { type PickupInfo } from '../components/store-detail/info/PickupSection'
import PaymentSection, { type PaymentMethod } from '../components/store-detail/info/PaymentSection'
import NoticeSection from '../components/store-detail/info/NoticeSection'
import EventSection, { type EventInfo } from '../components/store-detail/info/EventSection'

import { getShopInfo } from '@/apis/shop'

function parseCm(diameter: string): number {
  const only = diameter.replace(/[^\d.]/g, '')
  const n = Number(only)
  return Number.isFinite(n) ? n : 0
}

const ALLOWED_PAYMENT_METHODS = new Set<PaymentMethod>([
  'CARD',
  'BANK_TRANSFER',
  'NAVER_PAY',
  'KAKAO_PAY',
  'TOSS_PAY',
])

function toPaymentMethods(raw: string[]): PaymentMethod[] {
  return raw
    .map((v) => v.trim())
    .filter((v): v is PaymentMethod => ALLOWED_PAYMENT_METHODS.has(v as PaymentMethod))
}

type StoreInfoPageProps = {
  shopId?: number
}

export default function StoreInfoPage({ shopId: shopIdProp }: StoreInfoPageProps) {
  const params = useParams()

  const shopId = useMemo(() => {
    if (typeof shopIdProp === 'number' && Number.isFinite(shopIdProp) && shopIdProp > 0) {
      return shopIdProp
    }
    const n = Number(params.shopId)
    return Number.isFinite(n) && n > 0 ? n : 1
  }, [params.shopId, shopIdProp])

  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [prices, setPrices] = useState<PriceRow[]>([])
  const [sizes, setSizes] = useState<SizeRow[]>([])
  const [pickup, setPickup] = useState<PickupInfo | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [notices, setNotices] = useState<string[]>([])
  const [events, setEvents] = useState<EventInfo[]>([])

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setErrorMsg(null)

      try {
        const data = await getShopInfo(shopId)

        setPrices(
          (data.priceGuides ?? []).map((p) => ({
            label: p.sizeName,
            price: p.priceText,
          })),
        )

        setSizes(
          (data.sizeGuides ?? []).map((s) => ({
            cm: parseCm(s.diameter),
            label: s.sizeName,
          })),
        )

        setPickup({
          operatingHours: data.pickupInfo?.operationHours ?? '',
          pickupTime: data.pickupInfo?.pickupNotice ?? '',
          sameDayOrder: data.pickupInfo?.sameDayOrder ?? '',
          parking: data.pickupInfo?.parkingInfo ?? '',
        })

        setPaymentMethods(toPaymentMethods(data.paymentInfo?.paymentMethods ?? []))

        const mergedNotices = [
          ...(data.precautionNotices ?? []),
          ...(data.paymentInfo?.paymentNotice ? [data.paymentInfo.paymentNotice] : []),
          ...(data.paymentInfo?.prepaymentInfo ? [data.paymentInfo.prepaymentInfo] : []),
        ].filter(Boolean)

        setNotices(mergedNotices)

        const e = data.ongoingEvent
        const nextEvents: EventInfo[] =
          e && (e.title || e.content || e.period)
            ? [
                {
                  title: e.title ?? '',
                  body: e.content ?? '',
                  period: e.period ?? '',
                },
              ]
            : []
        setEvents(nextEvents)
      } catch (e) {
        setErrorMsg(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [shopId])

  if (loading) return <main className="bg-[#FCF4F3] min-h-screen" />

  if (errorMsg) {
    return (
      <main className="bg-[#FCF4F3] min-h-screen p-6">
        <p className="text-sm text-gray-700">매장 정보 불러오기에 실패했어요.</p>
        <p className="mt-1 text-xs text-gray-500">{errorMsg}</p>
      </main>
    )
  }

  return (
    <main className="bg-[#FCF4F3]">
      <SectionCard title="가격 안내">
        <PriceSection prices={prices} />
      </SectionCard>

      <SectionCard title="사이즈 안내" subtitle="(cm 기준)">
        <SizeSection sizes={sizes} />
      </SectionCard>

      <SectionCard title="픽업 안내">
        <PickupSection
          pickup={pickup ?? { operatingHours: '', pickupTime: '', sameDayOrder: '', parking: '' }}
        />
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
