import type { ReactNode } from 'react'
import type { OrderInfo } from './OrderListCard'
import { Calendar, Clock, MessageCircle } from 'lucide-react'

export default function OrderListCardMeta({
  item,
  chip,
  showMessageButton,
}: {
  item: OrderInfo
  chip: ReactNode
  showMessageButton?: boolean
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-[110px] w-[110px] flex-shrink-0 overflow-hidden rounded-[12px] bg-[#F3F4F6]">
        <img
          src={item.imageURL}
          alt={item.storeName}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          {chip}

          <span className="whitespace-nowrap text-[11px] font-medium text-[#57504F]">
            작성일: {item.createdAt}
          </span>
        </div>

        <div className="mt-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-bold text-[#2A2929]">{item.storeName}</p>
            <p className="mt-1 truncate text-[13px] font-normal text-[#2A2929]">{item.cakeName}</p>
          </div>
          {showMessageButton && (
            <button
              type="button"
              onClick={item.onClickOwnerMessage}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#57504F] bg-white transition-colors hover:bg-[#f5f5f5]"
              aria-label="message"
            >
              <MessageCircle size={18} className="text-[#57504F]" strokeWidth={1.5} />
            </button>
          )}
        </div>

        <div className="mt-2 flex items-center gap-7 text-[#4A5565]">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#4A5565]" />
            <span className="text-[13px] font-medium">{item.pickupDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#4A5565]" />
            <span className="text-[13px] font-medium">{item.pickupTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
