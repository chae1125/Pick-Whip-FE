import axios from '@/utils/axios'

type TestTokenResponse = {
  isSuccess: boolean
  code: string
  message: string
  result: string
  success: boolean
}

export const getTestToken = async (userId: number): Promise<TestTokenResponse> => {
  const res = await axios.get<TestTokenResponse>('/api/test/token', {
    params: { userId },
  })
  return res.data
}
