/**
 * 쿠키 기반으로 로그인 여부를 확인합니다.
 * 백엔드가 HttpOnly 쿠키를 설정한 환경에서 `/users/me`를 호출하여 판별합니다.
 * @returns userId 또는 null
 */
export const getUserIdWithCookie = async (): Promise<number | null> => {
  const { checkAuthWithCookie } = await import('@/apis/user')
  const user = await checkAuthWithCookie()
  return user?.userId ?? null
}
