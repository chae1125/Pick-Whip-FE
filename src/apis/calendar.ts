import axios from '@/utils/axios'

export type ApiResponse<T> = {
  isSuccess: boolean
  code: string
  message: string
  result: T
  success: boolean
}

export type ShopCalendarDay = {
  date: string
  closed: boolean
}

export type ShopSlotItem = {
  time: string
  timeLabel: string
  reason?: string
  available: boolean
}

export type ShopSlotsResult = {
  date: string
  formattedDate?: string
  slots: ShopSlotItem[]
  closed: boolean
}

export async function getShopCalendar(shopId: number, year: number, month: number) {
  const res = await axios.get<ApiResponse<ShopCalendarDay[]>>(`/shops/${shopId}/calendar`, {
    params: { year, month },
  })
  return res.data
}

export async function getShopSlots(shopId: number, date: string) {
  const res = await axios.get<ApiResponse<ShopSlotsResult>>(`/shops/${shopId}/slots`, {
    params: { date },
  })
  return res.data
}
