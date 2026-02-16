import { useEffect, useState } from 'react'

import BackHeader from '@/components/BackHeader'
import OrderListCard from '@/components/order-history/OrderListCard'
import type { OrderInfo } from '@/components/order-history/OrderListCard'

import { getOrderHistory, type OrderHistoryItem } from '@/apis/order-history'

type Progress = OrderInfo['progress']

function formatPriceKRW(amount: number) {
  return `₩${new Intl.NumberFormat('ko-KR').format(amount)}`
}

function resolveProgress(it: OrderHistoryItem): Progress {
  if (it.stepStatus === 'ERROR') return '제작 불가'

  switch (it.currentStep) {
    case 1:
      return '주문서 완료'
    case 2:
      return '주문서 확인'
    case 3:
      return '제작 확정'
    case 4:
      return '제작 완료'
    default:
      return '픽업 완료'
  }
}

function toOrderInfo(it: OrderHistoryItem): OrderInfo {
  return {
    orderId: it.orderId,
    imageURL: it.imageUrl ?? '',
    createdAt: it.pickupDate,
    storeName: it.shopName,
    cakeName: it.designName,
    pickupDate: it.pickupDate,
    pickupTime: it.pickupTime,
    progressLabel: it.bottomMessage ?? '',
    progress: resolveProgress(it),
    previewText: '프리뷰 보기',
    chipText: it.topMessage ?? '',
    detail: {
      design: it.designName,
      taste: it.flavor ?? '',
      lettering: it.lettering ?? '',
      extraRequest: it.additionalRequest ?? '',
      finalPriceText: formatPriceKRW(it.totalPrice),
      orderCode: it.orderCode,
    },
  }
}

export default function OrderRequestListPage() {
  const [items, setItems] = useState<OrderInfo[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        setError(null)
        const result = await getOrderHistory({ type: 'REQUEST', limit: 10 })
        setItems((result.content ?? []).map(toOrderInfo))
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : '주문 요청 내역 조회 실패'
        setError(message)
      }
    }
    run()
  }, [])

  return (
    <main className="relative pt-10 container w-full bg-white">
      <BackHeader
        title="주문 요청 내역"
        titleClassName="!font-semibold !text-[20px]"
        iconColor="text-[#BA8675]"
        iconSize={30}
      />

      <div className="w-full mt-6 flex flex-col">
        {error && <div className="py-10 text-center text-sm text-red-500">{error}</div>}

        {!error && items.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-400">주문 요청 내역이 없습니다</div>
        )}

        {!error &&
          items.map((item) => (
            <OrderListCard
              key={item.orderId}
              item={{
                ...item,
                onClickOwnerMessage: () => {
                  console.log('Chat clicked for:', item.storeName)
                },
              }}
              onClickPreview={() => {}}
              showMessageButton={true}
            />
          ))}
      </div>
    </main>
  )
}
