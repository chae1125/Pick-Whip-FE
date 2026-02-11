import instance from '@/utils/axios'

export type DesignSort = 'NAME' | 'NEARBY' | 'RATING'

export type DesignGalleryItem = {
  designId: number
  imageUrl: string
  shopName: string
  simpleAddress: string
  minPrice: number | null
  avgRating: number
  myPick: boolean
}

type DesignGalleryResponse = {
  isSuccess: boolean
  code: string
  message: string
  result?: {
    currentRegion: string
    designs: DesignGalleryItem[]
    totalPage: number
    totalElements: number
    isFirst: boolean
    isLast: boolean
  }
  success?: boolean
}

export type GetDesignGalleryParams = {
  category?: string
  sort?: DesignSort
  lat: number
  lon: number
  page?: number
  seed?: number
  userId: number
}

export const getDesignGallery = async (params: GetDesignGalleryParams) => {
  const res = await instance.get<DesignGalleryResponse>('/api/design/gallery', { params })
  const result = res.data?.result

  return {
    currentRegion: result?.currentRegion ?? '',
    designs: result?.designs ?? [],
    totalPage: result?.totalPage ?? 0,
    totalElements: result?.totalElements ?? 0,
    isFirst: !!result?.isFirst,
    isLast: !!result?.isLast,
  }
}
