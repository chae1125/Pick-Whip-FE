import instance from '@/utils/axios'

export type DesignDetailResult = {
  designId: number
  cakeName?: string
  imageUrl?: string
  price?: number
  keywords?: string[]
  description?: string | null
  allergyInfo?: string[]
  sizes?: { label: string; cm?: string; price?: number }[]
  options?: { id: number; name: string; price?: number }[]
}

type DesignDetailResponse = {
  isSuccess?: boolean
  code?: string
  message?: string
  result?: DesignDetailResult
}

export const getDesignDetail = async (designId: number) => {
  const res = await instance.get<DesignDetailResponse>(`/design/${designId}`)
  return res.data?.result ?? null
}

export default null
