import instance from '../utils/axios'

export type BestOptionItem = {
  writerName: string
  createdDate: string
  rating: number
  helpfulCount: number
  content: string
  keywords: string[]
  cakeImageUrl: string
  options: {
    designName: string
    taste: string
    deco: string
    additionalRequest: string | null
    colors: {
      icingColor: string | null
      sheetColor: string | null
      creamColor: string | null
    }
  }
}

type BestOptionsResponse = {
  isSuccess: boolean
  code: string
  message: string
  result?: {
    items?: BestOptionItem[]
  }
  success?: boolean
}

export const getBestReviews = async (): Promise<BestOptionItem[]> => {
  const res = await instance.get<BestOptionsResponse>('/api/reviews/best')

  return res.data?.result?.items ?? []
}
