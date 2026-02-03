import { useMemo, useState } from 'react'
import BackHeader from '@/components/BackHeader'

import type { NotificationItem, NotificationTabKey, NotificationTab } from '../types/notification'
import Badge from '../components/notification/Badge'
import NotificationCard from '../components/notification/NotificationCard'

const TABS: NotificationTab[] = [
  { key: 'all', label: '전체' },
  { key: 'order', label: '주문' },
  { key: 'review', label: '리뷰' },
  { key: 'etc', label: '기타' },
]

const dummy: NotificationItem[] = [
  {
    id: 1,
    type: 'order',
    title: '주문서가 전달되었습니다',
    body: '스위트 드림즈 베이커리에서 주문서를 확인 후 알려드릴게요!',
    timeAgo: '1시간 전',
    read: false,
  },
  {
    id: 2,
    type: 'order',
    action: 'pickup_ready',
    title: '케이크 픽업이 준비되었습니다',
    body: '달콤한 순간에서 케이크가 준비되었어요. 픽업 시간을 확인해주세요.',
    timeAgo: '3시간 전',
    read: false,
  },
  {
    id: 3,
    type: 'review',
    title: '사장님이 답변을 남겼어요',
    body: '작성하신 리뷰에 메종 드 가토 사장님이 답변을 남겼습니다.',
    timeAgo: '2일 전',
    read: false,
  },
  {
    id: 4,
    type: 'review',
    title: '리뷰를 작성해주세요',
    body: '케이크는 어떠셨나요? 소중한 후기를 남겨주세요!',
    timeAgo: '2일 전',
    read: false,
  },
  {
    id: 5,
    type: 'etc',
    title: '크리스마스 특별 할인',
    body: '12월 한정! 크리스마스 케이크 10% 할인 이벤트가 진행중이에요.',
    timeAgo: '6일 전',
    read: false,
  },
]

const systemDummy: NotificationItem[] = [
  {
    id: 101,
    type: 'etc',
    status: 'success',
    title: '주문서가 전달되었습니다',
    body: '스위트 드림즈 베이커리에서 주문서를 확인 후 알려드릴게요!',
    timeAgo: '1시간 전',
    read: false,
  },
  {
    id: 102,
    type: 'etc',
    status: 'warning',
    title: '신고가 접수되었습니다',
    body: '3~5 영업일 내에 검토하여 답변 드리겠습니다.',
    timeAgo: '1시간 전',
    read: false,
  },
  {
    id: 103,
    type: 'etc',
    status: 'neutral',
    title: '결제가 완료되면 주문이 확정됩니다',
    body: '스위트 드림즈 베이커리에서 주문을 확정했어요. 결제를 진행해주세요.',
    timeAgo: '1시간 전',
    read: false,
  },
  {
    id: 104,
    type: 'etc',
    status: 'warning',
    title: '접수하신 신고에 대해 안내드립니다',
    body: '신고하신 내용에 대한 답변 드립니다.',
    timeAgo: '1시간 전',
    read: false,
  },
  {
    id: 105,
    type: 'etc',
    status: 'success',
    title: '사장님이 결제를 확인했어요',
    body: '스위트 드림즈 베이커리에서 케이크 제작을 시작했어요. 조금만 기다려주시면 정성껏 준비해드릴게요!',
    timeAgo: '1시간 전',
    read: false,
  },
  {
    id: 106,
    type: 'etc',
    status: 'danger',
    title: '결제가 정상적으로 처리되지 않았어요',
    body: '결제가 완료되지 않았거나, 결제 과정에 오류가 있을 수 있으니 다시 결제를 진행해주세요.',
    timeAgo: '1시간 전',
    read: false,
  },
]

export default function NotificationPage() {
  const [tab, setTab] = useState<NotificationTabKey>('all')
  const [items, setItems] = useState<NotificationItem[]>(() => [...systemDummy, ...dummy])

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

  const markAllRead = () => setItems((prev) => prev.map((it) => ({ ...it, read: true })))

  const handleRead = (id: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, read: true } : it)))
  }

  return (
    <div className="bg-[#FCF4F3]">
      <div className="mx-auto min-h-screen w-full max-w-lg ">
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
              const key = t.key
              const cnt = counts[key]
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
            {filtered.map((item) => (
              <NotificationCard key={item.id} item={item} onClick={handleRead} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
