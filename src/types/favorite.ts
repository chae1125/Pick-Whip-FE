export type FavoriteShop = {
  favoriteId: number
  shopId: number
  shopName: string
  shopImageUrl: string
  averageRating: number
  minPrice: number
  keywords: string[]
}

export type FavoriteShopListResult = {
  shopList: FavoriteShop[]
  nextCursor: number
  hasNext: boolean
}

export type FavoriteShopListResponse = {
  isSuccess: boolean
  code: string
  message: string
  result: FavoriteShopListResult
  success: boolean
}
