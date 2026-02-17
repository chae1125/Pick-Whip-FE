import { useEffect, useRef } from 'react'
import axios from 'axios'
import { isTokenExpiringSoon } from '@/utils/auth'

const REFRESH_CHECK_INTERVAL = 60 * 1000

export const useTokenRefresh = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isRefreshingRef = useRef(false)

  const refreshToken = async () => {
    if (isRefreshingRef.current) return

    const token = localStorage.getItem('accessToken')
    if (!token) return

    if (!isTokenExpiringSoon(5)) return

    try {
      isRefreshingRef.current = true
      const response = await axios.post('/api/users/refresh', {}, { withCredentials: true })

      const newToken = response.data?.result?.accessToken
      if (newToken) {
        localStorage.setItem('accessToken', newToken)
        console.log('토큰이 자동으로 갱신되었습니다')
      }
    } catch (error) {
      console.error('토큰 자동 갱신 실패:', error)
      localStorage.removeItem('accessToken')
    } finally {
      isRefreshingRef.current = false
    }
  }

  useEffect(() => {
    refreshToken()

    intervalRef.current = setInterval(() => {
      refreshToken()
    }, REFRESH_CHECK_INTERVAL)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])
}
