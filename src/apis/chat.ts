import axios from '@/utils/axios'
import type {
  ChatRoomListResponse,
  GetChatListParams,
  ChatRoomListResult,
  CreateChatRoomParams,
  ChatRoomDetail,
  CreateChatRoomResponse,
  GetChatMessageListParams,
  ChatMessageListResult,
  ChatMessageListResponse,
  GetChatImageUrlsParams,
  ChatImageUrl,
  GetChatImageUrlsResponse,
} from '@/types/chat'
import { getResult } from '@/utils/response'

// 내 채팅방 목록 조회
export async function getChatRoomList(params: GetChatListParams): Promise<ChatRoomListResult> {
  const { userId, keyword, cursor, size = 10 } = params

  const res = await axios.get<ChatRoomListResponse>('/api/chats', {
    params: {
      userId,
      keyword,
      cursor,
      size,
    },
  })

  return getResult(res.data, '채팅방 목록 조회 실패')
}

// 채팅방 생성 또는 조회
export async function createChatRoom(params: CreateChatRoomParams): Promise<ChatRoomDetail> {
  const { userId, shopId, orderId } = params

  const res = await axios.post<CreateChatRoomResponse>(
    '/api/chats',
    {
      shopId,
      orderId: orderId ?? 0,
    },
    {
      params: { userId },
    },
  )

  return getResult(res.data, '채팅방 생성/조회 실패')
}

// 채팅 메시지 내역 조회
export async function getChatMessages(
  params: GetChatMessageListParams,
): Promise<ChatMessageListResult> {
  const { roomId, userId, cursor, size = 10 } = params

  const res = await axios.get<ChatMessageListResponse>(`/api/chats/${roomId}/messages`, {
    params: {
      userId,
      cursor,
      size,
    },
  })

  return getResult(res.data, '채팅 메시지 조회 실패')
}

// 채팅방 이미지 전송 URL 발급
export async function getChatImageUrls(params: GetChatImageUrlsParams): Promise<ChatImageUrl[]> {
  const { roomId, userId, fileNames } = params

  const res = await axios.post<GetChatImageUrlsResponse>(
    `/api/chats/${roomId}/images`,
    {
      fileNames,
    },
    {
      params: {
        userId,
      },
    },
  )

  return getResult(res.data, '이미지 업로드 URL 발급 실패')
}
