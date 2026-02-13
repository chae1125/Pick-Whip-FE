import { CircleCheckBig, CircleX, AlertCircle, Clock, Star, Gift, CreditCard } from 'lucide-react'
import type { NotificationType } from '@/apis/notification'

type Props = {
  type: NotificationType
  kind: string
}

export default function NotiIcon({ type, kind }: Props) {
  const base = 'h-10 w-10 rounded-full grid place-items-center flex-shrink-0'

  if (type === 'ORDER') {
    if (kind === 'ORDER_REJECTED' || kind === 'ORDER_REJECTED_PAYMENT_FAILED') {
      return (
        <div className={`${base} bg-[#FF3B45]`}>
          <CircleX size={20} className="text-white" />
        </div>
      )
    }

    if (kind === 'ORDER_PICKUP_READY') {
      return (
        <div className={`${base} bg-[#FF7C9833]`}>
          <Clock size={18} className="text-[var(--color-main-pink-200)]" />
        </div>
      )
    }

    if (kind === 'ORDER_PAYMENT_REQUESTED') {
      return (
        <div className={`${base} bg-[#FED8D099]`}>
          <CreditCard size={20} className="text-[#57504F]" />
        </div>
      )
    }

    return (
      <div className={`${base} bg-[#EDFFAA99]`}>
        <CircleCheckBig size={20} className="text-[#1CB324]" />
      </div>
    )
  }

  if (type === 'REVIEW') {
    return (
      <div className={`${base} bg-[#FFFDECCC]`}>
        <Star size={18} className="text-[#FFC31A]" />
      </div>
    )
  }

  if (type === 'ETC') {
    if (kind === 'REPORT_RECEIVED' || kind === 'REPORT_REPLIED') {
      return (
        <div className={`${base} bg-[#FFF6E099]`}>
          <AlertCircle size={18} className="text-[#F4B400]" />
        </div>
      )
    }

    return (
      <div className={`${base} bg-[#FFF4F4]`}>
        <Gift size={18} className="text-[#FFA6A5]" />
      </div>
    )
  }

  return (
    <div className={`${base} bg-[#F5F5F5]`}>
      <Gift size={18} className="text-[#999]" />
    </div>
  )
}
