import axios from '@/utils/axios'

type ApiResponse<T> = {
  isSuccess: boolean
  code: string
  message: string
  result: T | null
  success: boolean
}

export type OrderHistoryType = 'REQUEST' | 'COMPLETE'

export type OrderHistoryItem = {
  orderId: number
  orderCode: string
  shopName: string
  pickupDate: string
  pickupTime: string
  totalPrice: number
  imageUrl: string | null
  designName: string
  flavor: string | null
  lettering: string | null
  additionalRequest: string | null
  currentStep: number
  stepStatus: 'DEFAULT' | 'ERROR' | string
  topMessage: string | null
  bottomMessage: string | null
  rejectReason: string | null
}

export type OrderHistoryCursor = {
  statusScore: number
  pickupDatetime: string
  orderId: number
}

export type OrderHistoryResult = {
  content: OrderHistoryItem[]
  hasNext: boolean
  nextCursor: OrderHistoryCursor | null
}

export type OrderHistoryQuery = {
  limit?: number
  type: OrderHistoryType
  lastStatusScore?: number
  lastPickupDatetime?: string
  lastOrderId?: number
}

export async function getOrderHistory(query: OrderHistoryQuery): Promise<OrderHistoryResult> {
  const res = await axios.get<ApiResponse<OrderHistoryResult>>(`/orders/history`, {
    params: query,
  })

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '주문 내역 조회 실패')
  }

  return res.data.result
}

export async function getOrderHistoryWithCursor(params: {
  type: OrderHistoryType
  limit?: number
  cursor?: OrderHistoryCursor | null
}): Promise<OrderHistoryResult> {
  const { type, limit = 10, cursor } = params

  return getOrderHistory({
    type,
    limit,
    lastStatusScore: cursor?.statusScore,
    lastPickupDatetime: cursor?.pickupDatetime,
    lastOrderId: cursor?.orderId,
  })
}
