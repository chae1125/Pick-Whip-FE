import instance from '@/utils/axios'
import type {
  CustomOrderRequest,
  CustomOrderResponse,
  DraftDetailResponse,
  CreateOrderRequest,
  CreateOrderResponse,
} from '@/types/custom-order'

/**
 * 커스텀 케이크 주문 임시저장 생성
 * @param userId 사용자 ID
 * @param data 커스텀 주문 데이터
 * @returns draftId를 포함한 임시저장 결과
 */
export const createCustomOrderDraft = async (userId: number, data: CustomOrderRequest) => {
  const res = await instance.post<CustomOrderResponse>('/customs', data, {
    params: { userId },
  })

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '임시저장 생성에 실패했습니다.')
  }

  return res.data.result
}

/**
 * 임시저장 상세 조회
 * @param draftId 임시저장 ID
 * @returns 임시저장 상세 정보
 */
export const getDraftDetail = async (draftId: number) => {
  const res = await instance.get<DraftDetailResponse>(`/customs/drafts/${draftId}`)

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '임시저장 정보를 불러오지 못했습니다.')
  }

  return res.data.result
}

/**
 * 주문서 픽업 시간 변경
 * @param userId 사용자 ID
 * @param draftId 임시저장 ID
 * @param pickupDatetime 픽업 날짜시간 (로컬 시간, 예: "2026-02-17T17:46:24")
 */
export const updateDraftPickupTime = async (
  userId: number,
  draftId: number,
  pickupDatetime: string,
) => {
  const res = await instance.patch(
    `/orders/drafts/${draftId}/pickup-time`,
    { pickupDatetime },
    { params: { userId } },
  )

  if (!res.data.isSuccess) {
    throw new Error(res.data.message ?? '픽업 시간 변경에 실패했습니다.')
  }

  return res.data.result
}

/**
 * 주문 생성하기
 * @param data 주문 생성 데이터
 * @returns 생성된 주문 정보
 */
export const createOrder = async (data: CreateOrderRequest) => {
  const res = await instance.post<CreateOrderResponse>('/orders', data)

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '주문 생성에 실패했습니다.')
  }

  return res.data.result
}
