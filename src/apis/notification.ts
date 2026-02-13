import instance from '@/utils/axios'

export type NotificationType = 'ORDER' | 'REVIEW' | 'ETC'

export type Notification = {
  notificationId: number
  type: NotificationType
  kind: string
  targetId: number | null
  title: string
  content: string
  createdDate: string
  isRead: boolean
}

type NotificationListResult = {
  notifications: Notification[]
  nextCursor: number | null
  hasNext: boolean
}

type ApiResponse<T> = {
  isSuccess: boolean
  code: string
  message: string
  result: T
  success: boolean
}

export const getNotifications = async (params: {
  notificationType?: NotificationType
  cursor?: number
  size?: number
}) => {
  const res = await instance.get<ApiResponse<NotificationListResult>>('/notifications', {
    params,
  })
  return res.data.result
}

export const patchNotificationRead = async (notificationId: number) => {
  const res = await instance.patch<ApiResponse<{ notificationId: number }>>(
    `/notifications/${notificationId}/read`,
  )
  return res.data
}

export const patchNotificationsReadAll = async () => {
  const res = await instance.patch<ApiResponse<null>>('/notifications/read-all')
  return res.data
}

export const getUnreadCount = async (): Promise<number> => {
  const res = await instance.get<ApiResponse<{ unread: number }>>('/notifications/unread')
  return res.data.result.unread
}
