import instance from '@/utils/axios'
import { getUserIdFromToken } from '@/utils/auth'

export interface MapShop {
  shopId: number
  shopName: string
  latitude: number
  longitude: number
  isPicked: boolean
}

export interface MapBounds {
  lowLat: number
  highLat: number
  lowLon: number
  highLon: number
}

type MapResponse = {
  isSuccess: boolean
  code: string
  message: string
  result?: {
    shops: MapShop[]
  }
  success?: boolean
}

export const getShopsInMap = async (bounds: MapBounds) => {
  const userId = getUserIdFromToken() ?? 1 // 테스트면 1 추천(0은 위험)
  const res = await instance.get<MapResponse>('/shops/maps', {
    params: { ...bounds, userId },
  })
  return res.data
}
