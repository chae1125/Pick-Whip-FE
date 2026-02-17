export type CakeCardItem = {
  designId: number
  imageUrl: string | null
  cakeName: string
  price: number
  keywords: string[]
  isLiked: boolean
  shopId?: number
}

export type LetteringLineCount = 'ONE_LINE' | 'TWO_LINE'
export type LetteringAlignment = 'CENTER' | 'LEFT' | 'RIGHT' | 'CURVE_UP' | 'CURVE_UP_DOWN'
export type OptionCategory = 'SHEET' | 'ICING' | 'TOPPING' | 'CREAM' | 'SHAPE'

export type AvailOption = {
  category: OptionCategory
  name: string
  colorCode: string | null
  price: number
}

export type ToppingPosition = {
  optionId: number
  name: string
  additionalPrice: number
  colorRgbCode: string | null
  x: number
  y: number
}

export type DesignOption = {
  optionId: number
  category: OptionCategory
  optionName: string
  additionalPrice: number
  colorRgbCode: string | null
}

export type DesignDetailData = {
  cakeName: string
  cakeSize: string
  price: number
  imageUrl: string
  allergyInfo: string | null
  description: string | null
  letteringText: string | null
  letteringLineCount: LetteringLineCount | null
  letteringAlignment: LetteringAlignment | null
  letteringColor: string | null
  availOptions: AvailOption[]
  keywords: string[]
  toppings: ToppingPosition[]
  options: DesignOption[]
}
