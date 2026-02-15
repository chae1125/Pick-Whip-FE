import axios from '@/utils/axios'

type ApiResponse<T> = {
  isSuccess: boolean
  code: string
  message: string
  result: T | null
  success: boolean
}

//가게 카드
export type ShopDetailResult = {
  shopId: number
  shopName: string
  shopImageUrl: string | null
  averageRating: number
  reviewCount: number
  distance: number
  address: string
  phone: string
  keywords: string[]
  lat: number
  lon: number
}

export async function getShopDetail(
  shopId: number,
  lat: number,
  lon: number,
): Promise<ShopDetailResult> {
  const res = await axios.get<ApiResponse<ShopDetailResult>>(`/shops/${shopId}`, {
    params: { lat, lon },
  })

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '가게 상세 조회 실패')
  }

  const raw = res.data.result as Record<string, unknown>

  const getNumber = (key: string, altKey?: string) => {
    const v = raw[key]
    if (typeof v === 'number') return v
    const alt = altKey ? raw[altKey] : undefined
    if (typeof alt === 'number') return alt
    const s = raw[key]
    if (typeof s === 'string') {
      const n = Number(s)
      return Number.isFinite(n) ? n : 0
    }
    return 0
  }

  const getString = (key: string, altKey?: string) => {
    const v = raw[key]
    if (typeof v === 'string') return v
    const alt = altKey ? raw[altKey] : undefined
    if (typeof alt === 'string') return alt
    return ''
  }

  const getStringArray = (key: string) => {
    const v = raw[key]
    if (Array.isArray(v) && v.every((it) => typeof it === 'string')) return v as string[]
    return []
  }

  const normalized: ShopDetailResult = {
    shopId: getNumber('shopId', 'id'),
    shopName: getString('shopName', 'name'),
    shopImageUrl: (() => {
      const v = raw['shopImageUrl'] ?? raw['imageUrl']
      return typeof v === 'string' ? v : null
    })(),
    averageRating: getNumber('averageRating'),
    reviewCount: getNumber('reviewCount'),
    distance: (() => {
      const v = raw['distanceKm'] ?? raw['distance']
      if (typeof v === 'number') return v
      if (typeof v === 'string') {
        const n = Number(v)
        return Number.isFinite(n) ? n : 0
      }
      return 0
    })(),
    address: getString('address'),
    phone: getString('phone'),
    keywords: getStringArray('keywords'),
    lat: (() => {
      const v = raw['lat'] ?? raw['latitude']
      if (typeof v === 'number') return v
      if (typeof v === 'string') {
        const n = Number(v)
        return Number.isFinite(n) ? n : 0
      }
      return 0
    })(),
    lon: (() => {
      const v = raw['lon'] ?? raw['longitude']
      if (typeof v === 'number') return v
      if (typeof v === 'string') {
        const n = Number(v)
        return Number.isFinite(n) ? n : 0
      }
      return 0
    })(),
  }

  return normalized
}

// 매장 정보
export type ShopInfoResult = {
  priceGuides: { sizeName: string; priceText: string }[]
  sizeGuides: { sizeName: string; diameter: string }[]
  pickupInfo: {
    operationHours: string
    pickupNotice: string
    sameDayOrder: string
    parkingInfo: string
  }
  paymentInfo: {
    paymentMethods: string[]
    paymentNotice: string
    prepaymentInfo: string
  }
  precautionNotices: string[]
  ongoingEvent: {
    title: string
    content: string
    period: string
  } | null
}

export async function getShopInfo(shopId: number): Promise<ShopInfoResult> {
  const res = await axios.get<ApiResponse<ShopInfoResult>>(`/shops/${shopId}/info`)

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '매장 정보 조회 실패')
  }

  return res.data.result
}

//리뷰 요약
export type ReviewSummaryResult = {
  rating: number
  count: number
  keywordRanking: {
    designSatisfaction: number
    sameAsResult: number
    taste: number
    communication: number
    pickup: number
  }
}

export async function getReviewSummary(shopId: number): Promise<ReviewSummaryResult> {
  const res = await axios.get<ApiResponse<ReviewSummaryResult>>(`/shops/${shopId}/reviews/summary`)

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '리뷰 요약 조회 실패')
  }

  return res.data.result
}

//리뷰 정렬/ 목록
export type ShopReviewSort = 'LATEST' | 'HELPFUL' | 'RATING_HIGH' | 'RATING_LOW'

export type ReviewKeyword = {
  code: string
  label: string
}

export type ShopReviewItem = {
  reviewId: number
  nickname: string
  profileUrl: string | null
  rating: number
  option: string
  content: string
  imageUrls: string[]
  keywords: ReviewKeyword[]
  isLike: boolean
  likeCount: number
  createdDate: string
}

export type ShopReviewsResult = {
  items: ShopReviewItem[]
  nextCursor: string | null
  hasNext: boolean
}

export type ShopReviewsQuery = {
  sort?: ShopReviewSort
  designIds?: number[]
  styles?: string[]
  cursor?: string
  size?: number
}

function serializeParams(params: Record<string, unknown>) {
  const sp = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v === undefined || v === null) return
        sp.append(key, String(v))
      })
      return
    }

    sp.append(key, String(value))
  })

  return sp.toString()
}

export async function getShopReviews(
  shopId: number,
  query: ShopReviewsQuery = {},
): Promise<ShopReviewsResult> {
  const res = await axios.get<ApiResponse<ShopReviewsResult>>(`/shops/${shopId}/reviews`, {
    params: query,
    paramsSerializer: serializeParams,
  })

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '리뷰 목록 조회 실패')
  }

  return res.data.result
}

//디자인 갤러리
export type ShopDesignItem = {
  designId: number
  cakeName: string
  price: number
  keywords: string[]
  imageUrl: string
}

export type ShopDesignGalleryResult = {
  designs: ShopDesignItem[]
}

export async function getShopDesignGallery(shopId: number): Promise<ShopDesignGalleryResult> {
  const res = await axios.get<ApiResponse<ShopDesignGalleryResult>>(`/design/shop/${shopId}`)

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '디자인 갤러리 조회 실패')
  }

  return res.data.result
}

export type NearbyShopItem = {
  shopId: number
  shopName: string
  shopImageUrl: string | null
  averageRating: number
  reviewCount?: number | null
  minPrice?: number
  maxPrice?: number
  distance: number
  tags: string[]
  lat: number
  lon: number
}

export type NearbyShopsResult = NearbyShopItem[]

export async function getNearbyShops(
  lat: number,
  lon: number,
  radius = 500,
): Promise<NearbyShopsResult> {
  const res = await axios.get<ApiResponse<NearbyShopsResult>>('/shops/nearby', {
    params: { lat, lon, radius },
  })

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '주변 가게 조회 실패')
  }

  return res.data.result
}

export type ReviewLikeResult = {
  reviewId: number
  isLike: boolean
  likeCount: number
}

export async function likeReview(reviewId: number): Promise<ReviewLikeResult> {
  const res = await axios.put<ApiResponse<ReviewLikeResult>>(`/reviews/${reviewId}/likes`)

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '리뷰 도움 선택 실패')
  }

  return res.data.result
}

export async function unlikeReview(reviewId: number): Promise<ReviewLikeResult> {
  const res = await axios.delete<ApiResponse<ReviewLikeResult>>(`/reviews/${reviewId}/likes`)

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '리뷰 도움 취소 실패')
  }

  return res.data.result
}
