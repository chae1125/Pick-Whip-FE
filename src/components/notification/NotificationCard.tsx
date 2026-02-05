import { Clock } from 'lucide-react'
import NotiIcon from './NotiIcon'
import type { NotificationItem } from '../../types/notification'

export default function NotificationCard({
  item,
  onClick,
}: {
  item: NotificationItem
  onClick?: (id: number) => void
}) {
  const isUnread = !item.read
  const bg = isUnread ? 'bg-white' : 'bg-[#F6E1E1]'

  const handleClick = () => {
    onClick?.(item.id)
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
      {item.status ? (
        <NotiIcon variant="status" value={item.status} />
      ) : (
        <NotiIcon variant="type" value={item.type} action={item.action} />
      )}

      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold text-[#5F5F5F]">{item.title}</div>

        {item.body && (
          <div className="mt-1 text-[12.5px] leading-5 text-[#4A5565] font-regular">
            {item.body}
          </div>
        )}

        <div className="mt-3 flex items-center gap-1 text-[11.5px] text-[#BABABA] font-medium">
          <Clock size={12} />
          {item.timeAgo}
        </div>
      </div>

      {isUnread && (
        <span className="absolute right-4 top-4 h-[7px] w-[7px] rounded-full bg-[#E85C5C]" />
      )}
    </div>
  )
}
