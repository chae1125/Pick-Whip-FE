import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import OrderDetailsCard, { type OrderDetail } from '../components/OrderDetailsCard'
import letter from '../assets/img/letter.png'
import { MessageCircle, CircleX, CircleCheckBig } from 'lucide-react'
import type { CreateOrderResult } from '@/types/custom-order'
import type { DraftDetailResult } from '@/types/custom-order'
import { getShopCustomOptions } from '@/apis/shop'
import type { CakeSize } from '@/apis/shop'

function StatusIcon({ status }: { status: OrderDetail['status'] }) {
  if (status === 'PENDING' || status === 'ACCEPTED') {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-full bg-[#FDF4EB] shadow-md">
        <CircleCheckBig size={25} className="text-[#1CB324]" />
      </div>
    )
  }

  return (
    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#D65151] shadow-md">
      <CircleX size={25} className="text-white" />
    </div>
  )
}

export default function OrderSheet() {
  const { orderId } = useParams<{ orderId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)

  const orderResult = location.state?.orderResult as CreateOrderResult | undefined
  const draftData = location.state?.draftData as DraftDetailResult | undefined
  const shopId = location.state?.shopId as number | undefined
  const cakeName = location.state?.cakeName as string | undefined

  useEffect(() => {
    let alive = true

    const buildOrderDetail = async () => {
      if (!orderResult || !draftData || !shopId) {
        console.warn('OrderSheet - 필수 데이터 없음. 직접 URL 접근일 수 있습니다.')
        setLoading(false)
        return
      }

      try {
        const shopCustoms = await getShopCustomOptions(shopId)
        if (!alive) return

        const cakeSizes: CakeSize[] = shopCustoms.cakeSizes

        const pickupDateObj = new Date(orderResult.pickupDatetime)
        const formatDate = (date: Date) => {
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const day = String(date.getDate()).padStart(2, '0')
          const weekdays = ['일', '월', '화', '수', '목', '금', '토']
          const weekday = weekdays[date.getDay()]
          return `${year}.${month}.${day} (${weekday})`
        }
        const formatTime = (date: Date) => {
          const hours = date.getHours()
          const minutes = String(date.getMinutes()).padStart(2, '0')
          const period = hours >= 12 ? 'PM' : 'AM'
          const displayHours = hours % 12 || 12
          return `${String(displayHours).padStart(2, '0')}:${minutes} ${period}`
        }

        const pickupDate = formatDate(pickupDateObj)
        const pickupTime = formatTime(pickupDateObj)

        const cakeSize = cakeSizes.find((size) => size.id === draftData.shopCakeSizeId)
        const sizeLabel = cakeSize ? cakeSize.name : `${draftData.shopCakeSizeId}호`
        const shapes = draftData.options.filter((o) => o.category === 'SHAPE')
        const shapeLabel = shapes.length > 0 ? shapes[0].optionName.replace(' 쉐입', '') : ''

        const sheets = draftData.options.filter((o) => o.category === 'SHEET')
        const creams = draftData.options.filter((o) => o.category === 'CREAM')
        const icings = draftData.options.filter((o) => o.category === 'ICING')

        const toppingNames: string[] = []
        const toppingsFromOptions = draftData.options.filter((o) => o.category === 'TOPPING')
        if (toppingsFromOptions.length > 0) {
          toppingNames.push(...toppingsFromOptions.map((t) => t.optionName))
        }
        const toppingsArray = draftData.toppings || []
        if (toppingsArray.length > 0) {
          toppingNames.push(...toppingsArray.map((t) => t.name))
        }

        const rows: { label: string; value: string | string[] }[] = [
          {
            label: '디자인',
            value: shapeLabel ? `${sizeLabel} ${shapeLabel}` : sizeLabel,
          },
        ]

        if (sheets.length > 0 || creams.length > 0) {
          const sheetNames = sheets.map((s) => s.optionName).join(', ')
          const creamNames = creams.map((c) => c.optionName).join(', ')
          rows.push({
            label: '맛',
            value: [sheetNames, creamNames].filter(Boolean).join(' + '),
          })
        }

        if (draftData.letteringText) {
          rows.push({ label: '레터링', value: draftData.letteringText })
        }

        const decoParts: string[] = []
        if (icings.length > 0) {
          decoParts.push(icings.map((i) => i.optionName).join(', '))
        }
        if (toppingNames.length > 0) {
          decoParts.push(toppingNames.join(', '))
        }
        if (decoParts.length > 0) {
          rows.push({
            label: '데코',
            value: decoParts.join(' + '),
          })
        }

        if (draftData.additionalRequest) {
          rows.push({ label: '추가요청', value: draftData.additionalRequest })
        }

        const orderDetail: OrderDetail = {
          id: orderResult.orderId,
          shopName: orderResult.shopName,
          productName: cakeName || '커스텀 케이크',
          pickupDate,
          pickupTime,
          orderCode: orderResult.orderCode,
          items: [
            {
              imageUrl:
                draftData.referenceImageUrl ??
                'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=1000&auto=format&fit=crop',
              rows,
            },
          ],
          status: 'PENDING',
          progress: [
            {
              key: 'CREATED',
              title: '주문서 작성',
              at: new Date().toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }),
            },
          ],
        }

        if (alive) {
          setOrder(orderDetail)
          setLoading(false)
        }
      } catch (error) {
        console.error('주문 정보 구성 실패:', error)
        if (alive) {
          setLoading(false)
        }
      }
    }

    buildOrderDetail()
    return () => {
      alive = false
    }
  }, [orderId, orderResult, draftData, shopId, cakeName])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7eeee] flex items-center justify-center">
        <div className="text-center text-sm text-gray-500">주문 정보를 불러오는 중이에요…</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f7eeee] flex items-center justify-center">
        <div className="py-20 text-center text-sm text-gray-500">주문 정보를 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7eeee]">
      <div className="mx-auto max-w-[420px] px-4">
        <div className="relative">
          <div className="absolute top-[140px] left-0 w-full h-[200px] bg-[#C09C9C] z-5 rounded-[10px] border border-[#D9B7B7]" />
          <img
            src={letter}
            alt="letter header"
            className="pointer-events-none select-none w-full relative z-20"
            draggable={false}
          />

          <div className="-mt-[100px] relative flex flex-col items-center gap-8 z-50">
            <StatusIcon status={order.status} />
          </div>

          <div className="-mt-[160px] relative z-10">
            <div className="mx-auto w-full max-w-[340px] rounded-[18px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.10)] overflow-hidden">
              <div className={`px-5 pt-[150px] ${order.status === 'REJECTED' ? 'pb-30' : 'pb-15'}`}>
                <OrderDetailsCard order={order} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div
          className="px-5 py-4"
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(254, 250, 249, 0.7) 28.85%, #FCF4F3 100%)',
          }}
        >
          <div className="mx-auto max-w-[420px]">
            {order.status === 'REJECTED' ? (
              <div className="flex flex-col gap-3">
                <button
                  className="w-full rounded-full bg-white py-3 !text-[15px] font-bold text-[#2b2b2b] shadow-lg"
                  onClick={() => {
                    navigate('/order-request')
                  }}
                >
                  목록 보기
                </button>

                <button
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#57504F] py-3 !text-[15px] font-bold text-white shadow-lg"
                  onClick={() => {
                    if (shopId) {
                      navigate(`/chat/${shopId}`)
                    }
                  }}
                >
                  <MessageCircle size={15} />
                  사장님과 채팅하기
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  className="flex-1 rounded-full bg-white py-3 !text-[15px] font-bold text-[#2b2b2b] shadow-lg"
                  onClick={() => {
                    navigate('/')
                  }}
                >
                  홈으로
                </button>

                <button
                  className="flex-1 rounded-full bg-[#57504F] py-3 !text-[15px] font-bold text-white shadow-lg"
                  onClick={() => {
                    navigate('/request-history')
                  }}
                >
                  목록 보기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
