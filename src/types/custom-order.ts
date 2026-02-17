export type ToppingPosition = {
  optionId: number
  x: number
  y: number
}

export type DraftTopping = {
  optionId: number
  name: string
  additionalPrice: number
  colorRgbCode: string | null
  x: number
  y: number
}

export type CustomOrderRequest = {
  shopId: number
  shopCakeSizeId: number
  pickupDatetime: string
  letteringText: string | null
  letteringLineCount: 'ONE_LINE' | 'TWO_LINE' | null
  letteringAlignment: 'CENTER' | 'LEFT' | 'RIGHT' | 'CURVE_UP' | 'CURVE_UP_DOWN' | null
  additionalRequest: string | null
  referenceImageUrl: string | null
  paymentMethod: string | null
  customOptionIds: number[]
  toppings: ToppingPosition[]
}

export type CustomOrderResult = {
  customId: number
  createAt: string
}

export type CustomOrderResponse = {
  isSuccess: boolean
  code: string
  message: string
  result: CustomOrderResult
  success: boolean
}

export type DraftOption = {
  optionId: number
  category: 'SHAPE' | 'SHEET' | 'CREAM' | 'ICING' | 'TOPPING'
  optionName: string
  additionalPrice: number
  colorRgbCode: string | null
}

export type DraftDetailResult = {
  draftId: number
  shopCakeSizeId: number
  pickupDatetime: string
  letteringText: string | null
  letteringLineCount: 'ONE_LINE' | 'TWO_LINE' | null
  letteringAlignment: 'CENTER' | 'LEFT' | 'RIGHT' | 'CURVE_UP' | 'CURVE_UP_DOWN' | null
  additionalRequest: string | null
  referenceImageUrl: string | null
  options: DraftOption[]
  toppings: DraftTopping[]
}

export type DraftDetailResponse = {
  isSuccess: boolean
  code: string
  message: string
  result: DraftDetailResult
  success: boolean
}

export type CreateOrderRequest = {
  draftId: number
  customerName: string
  customerPhone: string
  additionalRequest: string | null
}

export type CreateOrderResult = {
  orderId: number
  orderCode: string
  shopName: string
  pickupDatetime: string
  totalPrice: number
}

export type CreateOrderResponse = {
  isSuccess: boolean
  code: string
  message: string
  result: CreateOrderResult
  success: boolean
}
