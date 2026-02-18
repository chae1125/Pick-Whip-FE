function formatPhoneForView(digitsRaw: string) {
  const digits = digitsRaw.replace(/\D/g, '')
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  if (digits.length === 10) return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`
  return digitsRaw
}

function formatBirthdateForView(birthdate: string | null): string {
  if (!birthdate) return ''
  if (birthdate.length >= 7) {
    return birthdate.slice(0, 6)
  }
  return birthdate
}

function formatBirthdateWithGender(birthdate: string, genderCode: 0 | 1 | 2): string {
  return `${birthdate}${genderCode}`
}

export { formatPhoneForView, formatBirthdateForView, formatBirthdateWithGender }
