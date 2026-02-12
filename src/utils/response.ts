import type { ApiResponse } from '@/types/common'

export function getResult<T>(response: ApiResponse<T>, errorMessage = 'API 요청 실패'): T {
  if (!response.isSuccess || !response.result) {
    throw new Error(response.message || errorMessage)
  }
  return response.result
}
