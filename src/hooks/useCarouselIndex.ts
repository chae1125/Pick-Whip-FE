import { useCallback, useMemo, useState } from 'react'

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

export default function useCarouselIndex(opts: {
  length: number
  initialIndex: number
  onMove?: () => void
}) {
  const { length, initialIndex, onMove } = opts

  const safeInitial = useMemo(
    () => clamp(initialIndex, 0, Math.max(0, length - 1)),
    [initialIndex, length],
  )

  const [index, setIndex] = useState(() => safeInitial)

  const safeIndex = useMemo(() => (length <= 0 ? 0 : clamp(index, 0, length - 1)), [index, length])

  const canPrev = safeIndex > 0
  const canNext = safeIndex < length - 1

  const goPrev = useCallback(() => {
    if (!canPrev) return
    setIndex((p) => p - 1)
    onMove?.()
  }, [canPrev, onMove])

  const goNext = useCallback(() => {
    if (!canNext) return
    setIndex((p) => p + 1)
    onMove?.()
  }, [canNext, onMove])

  return { safeIndex, canPrev, canNext, goPrev, goNext, setIndex }
}
