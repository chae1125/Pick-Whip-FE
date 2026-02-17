import axios from '@/utils/axios'
import type {
  FavoriteShopListResponse,
  FavoriteShopListResult,
  FavoriteToggleResponse,
  FavoriteToggleResult,
} from '@/types/favorite'

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

export async function saveExtraInfo(body: SaveExtraInfoBody, userId?: number): Promise<void> {
  try {
    const res = await axios.post<SaveExtraInfoResponse>('/users/extra/info', body, {
      params: userId ? { userId } : undefined,
    })

    if (!res.data.isSuccess) {
      throw new Error(res.data.message ?? '추가 정보 저장 실패')
    }
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'response' in err) {
      const resp = (err as { response?: { status?: number; data?: unknown } }).response
      if (resp) {
        const { status, data } = resp
        console.error('saveExtraInfo server error', { status, data })
        let message: string | undefined
        if (typeof data === 'object' && data !== null && 'message' in data) {
          const m = (data as { message?: unknown }).message
          if (typeof m === 'string') message = m
        }
        throw new Error(message ?? `서버 오류: ${status}`)
      }
    }
    console.error('saveExtraInfo error', err)
    throw err
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

  const res = await axios.get<FavoriteShopListResponse>('/shops/favorites', {
    params: {
      userId,
      cursor,
      limit: size,
    },
  })

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '찜한 가게 목록 조회 실패')
  }

  return res.data.result
}

type AddFavoriteShopParams = {
  shopId: number
  userId: number
}

export async function addFavoriteShop(
  params: AddFavoriteShopParams,
): Promise<FavoriteToggleResult> {
  const { shopId, userId } = params

  const res = await axios.post<FavoriteToggleResponse>(`/shops/${shopId}/favorite`, null, {
    params: { userId },
  })

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '마이픽 등록 실패')
  }

  return res.data.result
}

type RemoveFavoriteShopParams = {
  shopId: number
  userId: number
}

export async function removeFavoriteShop(
  params: RemoveFavoriteShopParams,
): Promise<FavoriteToggleResult> {
  const { shopId, userId } = params

  const res = await axios.delete<FavoriteToggleResponse>(`/shops/${shopId}/favorite`, {
    params: { userId },
  })

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '마이픽 취소 실패')
  }

  return res.data.result
}

export async function checkAuthWithCookie(): Promise<MeResult | null> {
  try {
    const res = await axios.get<MeResponse>('/users/me', {
      withCredentials: true,
    })

    if (res.data.isSuccess && res.data.result) {
      return res.data.result
    }
    return null
  } catch {
    // 401 등 인증 실패 시 null 반환
    return null
  }
}
