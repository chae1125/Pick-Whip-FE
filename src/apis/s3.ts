import axios from '@/utils/axios'

type PresignRequest = {
  fileName: string
}

type PresignResult = {
  keyName: string
  url: string
}

type PresignResponse = {
  isSuccess: boolean
  code: string
  message: string
  result: PresignResult
  success: boolean
}

export async function getPresignedUpload(fileName: string): Promise<PresignResult> {
  const body: PresignRequest = { fileName }
  const res = await axios.post<PresignResponse>('/s3/upload', body)

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? '프리사인 URL 생성 실패')
  }

  return res.data.result
}
