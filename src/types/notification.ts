export type NotiType = 'order' | 'review' | 'etc'
export type NotificationTabKey = 'all' | NotiType

export type NotificationTab = {
  key: NotificationTabKey
  label: string
}

export type AlarmStatus = 'success' | 'warning' | 'danger' | 'neutral'

export type NotificationAction = 'default' | 'pickup_ready'

export type NotificationItem = {
  id: number
  type: NotiType
  status?: AlarmStatus
  action?: NotificationAction
  title: string
  body?: string
  timeAgo: string
  read: boolean
}
