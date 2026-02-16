import { useState } from 'react'
import type { ReviewDetailModalData } from '@/components/store-detail/review/ReviewDetailModal'

export default function useReviewDetailModal() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<ReviewDetailModalData | null>(null)

  const openWith = (review: ReviewDetailModalData) => {
    setSelected(review)
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
    setSelected(null)
  }

  return { open, selected, openWith, close }
}
