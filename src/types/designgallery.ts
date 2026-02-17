export type CakeCardItem = {
  designId: number
  imageUrl: string | null
  cakeName: string
  price: number
  keywords: string[]
  isLiked: boolean
  shopId?: number
}
