export const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem('accessToken')
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const id = Number(payload.sub)
    return Number.isFinite(id) ? id : null
  } catch {
    return null
  }
}
