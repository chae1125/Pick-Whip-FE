import { useState } from 'react'

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

type Dir = 'prev' | 'next' | null

export default function usePageSlider<T>(opts: {
  items: T[]
  pageSize: number
  pageIndex: number
  onChangePage: (next: number) => void
}) {
  const { items, pageSize, pageIndex, onChangePage } = opts

  const totalPages = Math.ceil(items.length / pageSize)
  const safeIndex = totalPages === 0 ? 0 : clamp(pageIndex, 0, totalPages - 1)
  const canPrev = totalPages > 1 && safeIndex > 0
  const canNext = totalPages > 1 && safeIndex < totalPages - 1

  const getPage = (i: number) =>
    i < 0 || i >= totalPages ? ([] as T[]) : items.slice(i * pageSize, i * pageSize + pageSize)

  const windowPages: T[][] = [getPage(safeIndex - 1), getPage(safeIndex), getPage(safeIndex + 1)]

  const [animDir, setAnimDir] = useState<Dir>(null)
  const [transitionOn, setTransitionOn] = useState(true)

  const offset = animDir === 'prev' ? 0 : animDir === 'next' ? 2 : 1

  const goPrev = () => {
    if (!canPrev || animDir) return
    setAnimDir('prev')
  }

  const goNext = () => {
    if (!canNext || animDir) return
    setAnimDir('next')
  }

  const onTransitionEnd = () => {
    if (!animDir) return

    const nextIndex = safeIndex + (animDir === 'next' ? 1 : -1)

    setTransitionOn(false)
    setAnimDir(null)
    onChangePage(nextIndex)

    requestAnimationFrame(() => requestAnimationFrame(() => setTransitionOn(true)))
  }

  return {
    totalPages,
    safeIndex,
    canPrev,
    canNext,
    animDir,
    offset,
    transitionOn,
    windowPages,
    goPrev,
    goNext,
    onTransitionEnd,
  }
}
