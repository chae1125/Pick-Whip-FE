import axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { AxiosHeaders } from 'axios'
import { refreshToken } from '@/apis/auth'

type RetryConfig = AxiosRequestConfig & { _retry?: boolean }

const instance = axios.create({
  baseURL: '/api',
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    if (!config.headers) config.headers = new AxiosHeaders()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

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
          failedQueue.push({
            resolve: (token: string) => {
              if (!originalConfig.headers) originalConfig.headers = new AxiosHeaders()
              ;(originalConfig.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`)
              originalConfig._retry = true
              resolve(instance(originalConfig))
            },
            reject,
            config: originalConfig,
          })
        })
      }

      isRefreshing = true

      try {
        const resp = await refreshToken()
        const newToken = resp.data?.result?.accessToken as string | undefined
        if (!newToken) throw new Error('Refresh did not return accessToken')

        localStorage.setItem('accessToken', newToken)
        processQueue(null, newToken)

        if (!originalConfig.headers) originalConfig.headers = new AxiosHeaders()
        ;(originalConfig.headers as AxiosHeaders).set('Authorization', `Bearer ${newToken}`)
        originalConfig._retry = true

        return instance(originalConfig)
      } catch (e) {
        processQueue(e)
        localStorage.removeItem('accessToken')
        console.warn('refresh failed, not redirecting to login automatically', e)
        return Promise.reject(e)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(err)
  },
)

export default instance
