import axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { AxiosHeaders } from 'axios'

type RetryConfig = AxiosRequestConfig & { _retry?: boolean }

const baseURL = import.meta.env.PROD ? 'https://www.picknwhip.shop/api' : '/api'

const instance = axios.create({
  baseURL,
  withCredentials: true,
})

const refreshTokenRequest = async () => {
  return axios.post(`${baseURL}/users/refresh`, {}, { withCredentials: true })
}

instance.interceptors.request.use((config) => config)

let isRefreshing = false

let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
  config: RetryConfig
}> = []

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error)
    else if (token) p.resolve(token)
    else p.reject(new Error('No token'))
  })
  failedQueue = []
}

instance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalConfig = err.config as RetryConfig | undefined
    if (!originalConfig) return Promise.reject(err)

    if (err.response?.status === 401 && !originalConfig._retry) {
      try {
        const headers = originalConfig.headers as AxiosHeaders | Record<string, string> | undefined
        let skip = false

        if (headers instanceof AxiosHeaders) {
          const val = headers.get('x-skip-refresh')
          skip = Boolean(val)
          if (skip && typeof headers.delete === 'function') headers.delete('x-skip-refresh')
        } else if (headers && typeof headers === 'object') {
          // headers may be a plain object
          skip = Boolean((headers as Record<string, string>)['x-skip-refresh'])
          if (skip) delete (headers as Record<string, string>)['x-skip-refresh']
        }

        if (skip) return Promise.reject(err)
      } catch (e) {
        console.warn('Failed to check x-skip-refresh header, proceeding with refresh', e)
      }
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalConfig })
        })
      }

      isRefreshing = true

      try {
        await refreshTokenRequest()

        originalConfig._retry = true
        const retryRes = await instance(originalConfig)

        processQueue(null)
        return retryRes
      } catch (e) {
        processQueue(e)
        console.warn('refresh failed', e)
        return Promise.reject(e)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(err)
  },
)

export default instance
