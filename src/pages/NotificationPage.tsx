import { useEffect, useState, useRef, useCallback } from 'react'
import BackHeader from '@/components/BackHeader'

import Badge from '../components/notification/Badge'
import NotificationCard from '../components/notification/NotificationCard'

import {
  getNotifications,
  patchNotificationRead,
  patchNotificationsReadAll,
  getUnreadCount,
} from '@/apis/notification'
import type { NotificationType, Notification } from '@/apis/notification'

type NotificationTabKey = 'all' | 'order' | 'review' | 'etc'
type NotificationTab = { key: NotificationTabKey; label: string }

const TABS: NotificationTab[] = [
  { key: 'all', label: '전체' },
  { key: 'order', label: '주문' },
  { key: 'review', label: '리뷰' },
  { key: 'etc', label: '기타' },
]

const toServerType = (tab: NotificationTabKey): NotificationType | undefined => {
  if (tab === 'all') return undefined
  return tab.toUpperCase() as NotificationType
}

const toTabKeyFromServerType = (type: Notification['type']): Exclude<NotificationTabKey, 'all'> => {
  return type.toLowerCase() as Exclude<NotificationTabKey, 'all'>
}

export default function NotificationPage() {
  const [tab, setTab] = useState<NotificationTabKey>('all')
  const [items, setItems] = useState<Notification[]>([])

  const [counts, setCounts] = useState<Record<NotificationTabKey, number>>({
    all: 0,
    order: 0,
    review: 0,
    etc: 0,
  })

  const cursorRef = useRef<number | null>(null)
  const hasNextRef = useRef(true)

  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(false)

  const isEmpty = !initialLoading && items.length === 0

  const fetchTotalUnreadCount = useCallback(async () => {
    try {
      const count = await getUnreadCount()
      setCounts((prev) => ({ ...prev, all: count }))
    } catch (error) {
      console.error('Failed to fetch unread count', error)
    }
  }, [])

  const updateTabCountsFromList = useCallback((list: Notification[]) => {
    const byType: Record<Exclude<NotificationTabKey, 'all'>, number> = {
      order: 0,
      review: 0,
      etc: 0,
    }

    list.forEach((it) => {
      if (!it.isRead) {
        const key = toTabKeyFromServerType(it.type)
        byType[key] += 1
      }
    })

    setCounts((prev) => ({
      ...prev,
      order: byType.order,
      review: byType.review,
      etc: byType.etc,
    }))
  }, [])

  const fetchNotifications = useCallback(
    async (isReset = false) => {
      if (loadingRef.current) return
      if (!isReset && !hasNextRef.current) return

      loadingRef.current = true
      setLoading(true)
      if (isReset) setInitialLoading(true)

      try {
        const res = await getNotifications({
          notificationType: toServerType(tab),
          cursor: isReset ? undefined : (cursorRef.current ?? undefined),
          size: 20,
        })

        const fetched = res.notifications as Notification[]
        const nextHasNext = fetched.length > 0 ? res.hasNext : false

        setItems((prev) => (isReset ? fetched : [...prev, ...fetched]))

        if (tab === 'all' && isReset) {
          updateTabCountsFromList(fetched)
        }

        cursorRef.current = res.nextCursor
        hasNextRef.current = nextHasNext
        setHasNext(nextHasNext)
      } catch (error) {
        console.error(error)
      } finally {
        loadingRef.current = false
        setLoading(false)
        if (isReset) setInitialLoading(false)
      }
    },
    [tab, updateTabCountsFromList],
  )

  useEffect(() => {
    fetchTotalUnreadCount()
  }, [fetchTotalUnreadCount])

  useEffect(() => {
    const el = loadMoreRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextRef.current && !loadingRef.current) {
          fetchNotifications(false)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [fetchNotifications])

  useEffect(() => {
    setItems([])
    cursorRef.current = null
    hasNextRef.current = true
    setHasNext(true)
    setInitialLoading(true)
    fetchNotifications(true)
  }, [tab, fetchNotifications])

  const markAllRead = async () => {
    const hasUnread = items.some((it) => !it.isRead)
    if (!hasUnread) return

    const prevItems = items

    setItems((prev) => prev.map((it) => ({ ...it, isRead: true })))
    setCounts({ all: 0, order: 0, review: 0, etc: 0 })

    try {
      await patchNotificationsReadAll()
    } catch {
      setItems(prevItems)
      fetchTotalUnreadCount()
      fetchNotifications(true)
    }
  }

  const handleRead = async (notificationId: number) => {
    const targetItem = items.find((i) => i.notificationId === notificationId)
    if (!targetItem || targetItem.isRead) return

    setItems((prev) =>
      prev.map((it) => (it.notificationId === notificationId ? { ...it, isRead: true } : it)),
    )

    const tabKey = toTabKeyFromServerType(targetItem.type)

    setCounts((prev) => ({
      ...prev,
      all: Math.max(0, prev.all - 1),
      [tabKey]: Math.max(0, prev[tabKey] - 1),
    }))

    try {
      await patchNotificationRead(notificationId)
    } catch {
      setItems((prev) =>
        prev.map((it) => (it.notificationId === notificationId ? { ...it, isRead: false } : it)),
      )
      setCounts((prev) => ({
        ...prev,
        all: prev.all + 1,
        [tabKey]: prev[tabKey] + 1,
      }))
    }
  }

  return (
    <div className="bg-[#FCF4F3]">
      <div className="mx-auto min-h-screen w-full max-w-lg">
        <div className="relative px-2">
          <BackHeader title="알림" bgColor="#FCF4F3" titleClassName="font-bold" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-[var(--color-review-owner-title)]">
            새 알림 <span className="text-[#D65151]">{counts.all}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-1">
            {TABS.map((t) => {
              const active = tab === t.key
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className="relative flex-1 pb-3 !text-[15px] text-center !font-bold"
                >
                  <span className={active ? 'text-[var(--color-main-pink-200)]' : 'text-[#2B2B2B]'}>
                    {t.label}
                    <Badge count={counts[t.key]} active={active} />
                  </span>
                  {active && (
                    <span className="absolute left-0 right-0 -bottom-[1px] mx-auto h-[2px] w-full rounded-full bg-[#E85C5C]" />
                  )}
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={markAllRead}
            className="pb-3 px-1 !text-[11.5px] font-bold text-[var(--color-main-pink-200)]"
          >
            모두 읽음으로 표시
          </button>
        </div>

        <div className="h-[1px] w-full bg-[#F1DADA]" />

        <main className="pb-10 pt-5">
          <div className="flex flex-col gap-4 px-4">
            {initialLoading ? (
              <div className="py-16 text-center text-xs text-gray-400">불러오는 중...</div>
            ) : isEmpty ? (
              <div className="py-16 text-center text-[13px] text-gray-400">알림이 없습니다</div>
            ) : (
              <>
                {items.map((item) => (
                  <NotificationCard
                    key={item.notificationId}
                    item={{
                      ...item,
                    }}
                    onClick={handleRead}
                  />
                ))}

                {hasNext && !initialLoading && <div ref={loadMoreRef} className="h-10 w-full" />}

                {!initialLoading && loading && (
                  <div className="px-4 py-4 text-center text-xs text-gray-400">불러오는 중...</div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
