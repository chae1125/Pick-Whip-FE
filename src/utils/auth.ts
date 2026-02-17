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

export const getTokenExpiry = (): number | null => {
  const token = localStorage.getItem('accessToken')
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp
  } catch {
    return null
  }
}

export const isTokenExpiringSoon = (bufferMinutes: number = 5): boolean => {
  const expiry = getTokenExpiry()
  if (!expiry) return true

  const now = Math.floor(Date.now() / 1000)
  const bufferSeconds = bufferMinutes * 60
  return expiry - now < bufferSeconds
}

export const isTokenExpired = (): boolean => {
  const expiry = getTokenExpiry()
  if (!expiry) return true

  const now = Math.floor(Date.now() / 1000)
  return now >= expiry
}
