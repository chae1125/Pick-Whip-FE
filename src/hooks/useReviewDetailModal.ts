import { useState } from 'react'
import type { ReviewCardData } from '@/types/review'

export default function useReviewDetailModal() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<ReviewCardData | null>(null)

  const openWith = (review: ReviewCardData) => {
    setSelected(review)
    setOpen(true)
  }

  const close = () => setOpen(false)

  return { open, selected, openWith, close }
}
