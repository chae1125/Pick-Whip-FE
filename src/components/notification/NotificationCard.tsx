import { Clock } from 'lucide-react'
import NotiIcon from './NotiIcon'
import type { Notification } from '@/apis/notification'

type Props = {
  item: Notification
  onClick?: (notificationId: number) => void
}

export default function NotificationCard({ item, onClick }: Props) {
  const isUnread = !item.isRead
  const bg = isUnread ? 'bg-white' : 'bg-[#F6E1E1]'

  const handleClick = () => {
    onClick?.(item.notificationId)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick()
      }}
      className={`relative flex gap-3 rounded-[18px] ${bg} p-4 shadow-[0_8px_20px_rgba(0,0,0,0.06)] cursor-pointer`}
    >
      <NotiIcon type={item.type} kind={item.kind} />

      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold text-[#5F5F5F]">{item.title}</div>

        <div className="mt-1 text-[12.5px] leading-5 text-[#4A5565] font-regular">
          {item.content}
        </div>

        <div className="mt-3 flex items-center gap-1 text-[11.5px] text-[#BABABA] font-medium">
          <Clock size={12} />
          {new Date(item.createdDate).toLocaleDateString('ko-KR')}
        </div>
      </div>

      {isUnread && (
        <span className="absolute right-4 top-4 h-[7px] w-[7px] rounded-full bg-[#E85C5C]" />
      )}
    </div>
  )
}
