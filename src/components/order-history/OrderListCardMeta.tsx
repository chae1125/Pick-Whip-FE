import type { ReactNode } from 'react'
import type { OrderInfo } from './OrderListCard'
import { Calendar, Clock } from 'lucide-react'

export default function OrderListCardMeta({ item, chip }: { item: OrderInfo; chip: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-[110px] w-[110px] overflow-hidden rounded-[12px] bg-[#F3F4F6] flex-shrink-0">
        <img
          src={item.imageURL}
          alt={item.storeName}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          {chip}

          <span className="text-[11px] font-medium text-[#57504F] whitespace-nowrap">
            작성일: {item.createdAt}
          </span>
        </div>

        <div className="mt-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-[#2A2929] truncate">{item.storeName}</p>
            <p className="mt-1 text-[13px] font-normal text-[#2A2929] truncate">{item.cakeName}</p>
          </div>
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
