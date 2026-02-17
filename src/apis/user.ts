import axios from '@/utils/axios'
import type { FavoriteShopListResponse, FavoriteShopListResult } from '@/types/favorite'

export type MeResult = {
  userId: number
  email: string
  name: string
  nickname: string
  phone: string
  birthdate: string | null
  profileImageUrl: string | null
  createdAt: string
}

type MeResponse = {
  isSuccess: boolean
  code: string
  message: string
  result: MeResult
  success: boolean
}

export async function getMe(userId: number): Promise<MeResult> {
  const res = await axios.get<MeResponse>('/users/me', {
    params: { userId },
  })

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '내 정보 조회 실패')
  }

  return res.data.result
}

type SaveExtraInfoBody = {
  name: string
  phone: string
  birthdate: string
}

type SaveExtraInfoResponse = {
  isSuccess: boolean
  code: string
  message: string
  result?: string
  success?: boolean
}

export async function saveExtraInfo(userId: number, body: SaveExtraInfoBody): Promise<void> {
  const res = await axios.post<SaveExtraInfoResponse>('/users/extra/info', body, {
    params: { userId },
  })

  if (!res.data.isSuccess) {
    throw new Error(res.data.message ?? '추가 정보 저장 실패')
  }
}

export const logout = async (userId: number) => {
  const res = await axios.post('/users/logout', null, {
    params: { userId },
  })
  return res.data
}

type GetFavoriteShopsParams = {
  userId: number
  cursor?: number
  size?: number
}

export async function getFavoriteShops(
  params: GetFavoriteShopsParams,
): Promise<FavoriteShopListResult> {
  const { userId, cursor, size = 20 } = params

  const res = await axios.get<FavoriteShopListResponse>('/users/favorites', {
    params: {
      userId,
      cursor,
      size,
    },
  })

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '찜한 가게 목록 조회 실패')
  }

  return res.data.result
}
