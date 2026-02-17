import { useEffect } from 'react'

// 쿠키 기반 인증으로 전환했으므로 클라이언트 사이드에서 토큰을 주기적으로
// 갱신할 필요가 없습니다. 이 훅은 no-op으로 남겨두어 호출부를 안전하게 유지합니다.
export const useTokenRefresh = () => {
  useEffect(() => {
    // no-op
    return () => {}
  }, [])
}
