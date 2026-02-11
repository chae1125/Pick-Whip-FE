import instance from '@/utils/axios'

export type NotificationType = 'ORDER' | 'REVIEW' | 'ETC'

export type NotificationResponseItem = {
  notificationId: number
  type: NotificationType
  kind: string
  targetId: number
  title: string
  content: string
  createdDate: string
  isRead: boolean
}

export type NotificationListResult = {
  notifications: NotificationResponseItem[]
  nextCursor: number | null
  hasNext: boolean
}

export type NotificationListResponse = {
  isSuccess: boolean
  code: string
  message: string
  result: NotificationListResult
  success: boolean
}

export const getNotifications = async (params: {
  notificationType?: NotificationType
  cursor?: number
  size?: number
}) => {
  const res = await instance.get<NotificationListResponse>('/api/notifications', {
    params,
  })

  return res.data.result
}

type ReadOneResponse = {
  isSuccess: boolean
  code: string
  message: string
  result?: { notificationId: number }
  success: boolean
}

export const patchNotificationRead = async (notificationId: number) => {
  const res = await instance.patch<ReadOneResponse>(`/api/notifications/${notificationId}/read`)
  return res.data
}

type CommonResponse<T = unknown> = {
  isSuccess: boolean
  code: string
  message: string
  result: T
  success: boolean
}

export const patchNotificationsReadAll = async () => {
  const res = await instance.patch<CommonResponse<null>>('/api/notifications/read-all')
  return res.data
}

export const getUnreadCount = async (): Promise<number> => {
  const res = await instance.get<{
    result: { unread: number }
  }>('/api/notifications/unread')

  return res.data.result.unread
}
