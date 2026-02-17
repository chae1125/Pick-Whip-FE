import instance from '@/utils/axios'
import type {
  FavoriteDesignListResponse,
  FavoriteDesignListResult,
  FavoriteDesignToggleResponse,
  FavoriteDesignToggleResult,
} from '@/types/favorite'

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

export async function getFavoriteDesigns(userId: number): Promise<FavoriteDesignListResult> {
  const res = await instance.get<FavoriteDesignListResponse>('/designs/me', {
    params: { userID: userId },
  })

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '찜한 디자인 목록 조회 실패')
  }

  return res.data.result
}

// 디자인 찜하기 추가
type AddFavoriteDesignParams = {
  designId: number
  userId: number
}

export async function addFavoriteDesign(
  params: AddFavoriteDesignParams,
): Promise<FavoriteDesignToggleResult> {
  const { designId, userId } = params

  const res = await instance.post<FavoriteDesignToggleResponse>(
    `/designs/${designId}/favorite`,
    null,
    {
      params: { userID: userId },
    },
  )

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '마이픽 등록 실패')
  }

  return res.data.result
}

type RemoveFavoriteDesignParams = {
  designId: number
  userId: number
}

export async function removeFavoriteDesign(
  params: RemoveFavoriteDesignParams,
): Promise<FavoriteDesignToggleResult> {
  const { designId, userId } = params

  const res = await instance.delete<FavoriteDesignToggleResponse>(`/designs/${designId}/favorite`, {
    params: { userID: userId },
  })

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '마이픽 취소 실패')
  }

  return res.data.result
}

export default null
