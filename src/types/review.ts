import type { ReactNode } from 'react'

// 리뷰 태그
export type ReviewTag = {
  label: string
  icon?: ReactNode
}

// 사장님 댓글
export type ReviewOwnerReply = {
  title?: string
  content: string
}

// 리뷰 카드 안 데이터
export type ReviewCardData = {
  id: string

  menuName: string
  optionLabel?: string
  createdAt: string

  rating: number
  content: string

  imageUrls?: string[]
  tags?: ReviewTag[]
  extraTagCount?: number
  helpfulCount?: number

  ownerReply?: ReviewOwnerReply
}
