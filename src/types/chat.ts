import type { ApiResponse } from '@/types/common'

// 채팅방 목록 아이템
export type ChatRoom = {
  roomId: number
  shopName: string
  shopImageUrl: string | null
  lastMessage: string | null
  lastMessageTime: string | null
  unreadCount: number
}

// 채팅방 목록 조회 결과
export type ChatRoomListResult = {
  chatRooms: ChatRoom[]
  nextCursor: number | null
  hasNext: boolean
}

export type ChatCode = string
export type ChatStatus = string
export type ChatSuccess = boolean

// 채팅방 목록 응답 타입
export type ChatRoomListResponse = ApiResponse<ChatRoomListResult>

// 채팅방 목록 조회 파라미터
export type GetChatListParams = {
  userId: number
  keyword?: string
  cursor?: number
  size?: number
}

// 채팅방 내 주문 정보
export type OrderSummary = {
  orderId: number
  orderCode: string
  cakeSize: string
  pickupDatetime: string
  totalPrice: number
  status: string
}

// 채팅방 상세 정보 (생성/조회)
export type ChatRoomDetail = {
  roomId: number
  shopName: string
  orderSummary: OrderSummary | null
}

// 채팅방 생성/조회 파라미터
export type CreateChatRoomParams = {
  userId: number
  shopId: number
  orderId?: number
}

// 채팅방 생성/조회 응답 타입
export type CreateChatRoomResponse = ApiResponse<ChatRoomDetail>

// 채팅 메시지 타입
export type ChatMessage = {
  messageId: number
  senderId: number
  content: string
  imageUrl: string | null
  type: 'TEXT' | 'IMAGE'
  createdAt: string
  read: boolean
}

// 채팅 메시지 목록 결과
export type ChatMessageListResult = {
  messageList: ChatMessage[]
  nextCursor: number | null
  hasNext: boolean
}

// 채팅 메시지 목록 응답 타입
export type ChatMessageListResponse = ApiResponse<ChatMessageListResult>

// 채팅 메시지 목록 조회 파라미터
export type GetChatMessageListParams = {
  roomId: number
  userId: number
  cursor?: number
  size?: number
}

// 채팅방 이미지 URL 정보
export type ChatImageUrl = {
  keyName: string
  url: string
}

// 채팅방 이미지 URL 발급 파라미터
export type GetChatImageUrlsParams = {
  roomId: number
  userId: number
  fileNames: string[]
}

// 채팅방 이미지 URL 발급 응답 타입
export type GetChatImageUrlsResponse = ApiResponse<ChatImageUrl[]>
