import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import BackHeader from '@/components/BackHeader'

import type { NotificationItem, NotificationTabKey, NotificationTab } from '../types/notification'
import Badge from '../components/notification/Badge'
import NotificationCard from '../components/notification/NotificationCard'

import {
  getNotifications,
  patchNotificationRead,
  patchNotificationsReadAll,
} from '@/apis/notification'
import type { NotificationResponseItem, NotificationType } from '@/apis/notification'

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

const toTimeAgo = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number)
  const created = new Date(y, m - 1, d)
  const diff = Date.now() - created.getTime()

  const min = Math.floor(diff / (1000 * 60))
  if (min < 60) return `${Math.max(1, min)}분 전`

  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}시간 전`

  const day = Math.floor(hr / 24)
  return `${day}일 전`
}

const mapNotification = (n: NotificationResponseItem): NotificationItem => ({
  id: n.notificationId,
  type: n.type.toLowerCase() as NotificationItem['type'],
  title: n.title,
  body: n.content,
  timeAgo: toTimeAgo(n.createdDate),
  read: n.isRead,
})

export default function NotificationPage() {
  const [tab, setTab] = useState<NotificationTabKey>('all')
  const [items, setItems] = useState<NotificationItem[]>([])

  const cursorRef = useRef<number | null>(null)
  const hasNextRef = useRef(true)

  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(false)

  const isEmpty = !initialLoading && items.length === 0

  const fetchNotifications = useCallback(
    async (isReset = false) => {
      if (loadingRef.current) return
      if (!isReset && !hasNextRef.current) return

      loadingRef.current = true
      setLoading(true)

      if (isReset) {
        setInitialLoading(true)
      }

      try {
        const res = await getNotifications({
          notificationType: toServerType(tab),
          cursor: isReset ? undefined : (cursorRef.current ?? undefined),
          size: 20,
        })

        const mapped = res.notifications.map(mapNotification)
        const nextHasNext = mapped.length > 0 ? res.hasNext : false

        setItems((prev) => (isReset ? mapped : [...prev, ...mapped]))

        cursorRef.current = res.nextCursor
        hasNextRef.current = nextHasNext
        setHasNext(nextHasNext)
      } catch (error) {
        console.error(error)
      } finally {
        loadingRef.current = false
        setLoading(false)
        if (isReset) {
          setInitialLoading(false)
        }
      }
    },
    [tab],
  )

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

  const counts = useMemo(() => {
    const by: Record<NotificationTabKey, number> = { all: 0, order: 0, review: 0, etc: 0 }
    items.forEach((it) => {
      if (!it.read) {
        by.all += 1
        by[it.type] += 1
      }
    })
    return by
  }, [items])

  const filtered = useMemo(() => {
    if (tab === 'all') return items
    return items.filter((it) => it.type === tab)
  }, [items, tab])

  const markAllRead = async () => {
    const hasUnread = items.some((it) => !it.read)
    if (!hasUnread) return
    const prevItems = items
    setItems((prev) => prev.map((it) => ({ ...it, read: true })))
    try {
      await patchNotificationsReadAll()
    } catch {
      setItems(prevItems)
    }
  }

  const handleRead = async (id: number) => {
    const alreadyRead = items.find((i) => i.id === id)?.read
    if (alreadyRead) return
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, read: true } : it)))
    try {
      await patchNotificationRead(id)
    } catch {
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, read: false } : it)))
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
              const cnt = counts[t.key]
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className="relative flex-1 pb-3 !text-[15px] text-center !font-bold"
                >
                  <span className={active ? 'text-[var(--color-main-pink-200)]' : 'text-[#2B2B2B]'}>
                    {t.label}
                    <Badge count={cnt} active={active} />
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
                {filtered.map((item) => (
                  <NotificationCard key={item.id} item={item} onClick={handleRead} />
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
