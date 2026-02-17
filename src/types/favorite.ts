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

export type FavoriteToggleResult = {
  shopId: number
  isFavorited: boolean
}

export type FavoriteToggleResponse = {
  isSuccess: boolean
  code: string
  message: string
  result: FavoriteToggleResult
  success: boolean
}

export type FavoriteDesign = {
  designId: number
  cakeName: string
  price: number
  keywords: string[]
  imageUrl: string
  shopId?: number
}

export type FavoriteDesignListResult = {
  designs: FavoriteDesign[]
}

export type FavoriteDesignListResponse = {
  isSuccess: boolean
  code: string
  message: string
  result: FavoriteDesignListResult
  success: boolean
}

export type FavoriteDesignToggleResult = {
  DesignId: number
  isFavorited: boolean
}

export type FavoriteDesignToggleResponse = {
  isSuccess: boolean
  code: string
  message: string
  result: FavoriteDesignToggleResult
  success: boolean
}
