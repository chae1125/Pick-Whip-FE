import axios from '@/utils/axios'

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
