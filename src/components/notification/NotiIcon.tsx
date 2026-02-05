import { CircleCheckBig, CircleX, AlertCircle, CreditCard, Star, Gift, Clock } from 'lucide-react'
import type { AlarmStatus, NotificationAction, NotiType } from '../../types/notification'

type Props =
  | { variant: 'status'; value: AlarmStatus }
  | { variant: 'type'; value: NotiType; action?: NotificationAction }

export default function NotiIcon(props: Props) {
  const base = 'h-10 w-10 rounded-full grid place-items-center flex-shrink-0'

  if (props.variant === 'status') {
    const value = props.value

    if (value === 'success')
      return (
        <div className={`${base} bg-[#EDFFAA99]`}>
          <CircleCheckBig size={20} className="text-[#2F9E44]" />
        </div>
      )

    if (value === 'warning')
      return (
        <div className={`${base} bg-[#FFF6E099]`}>
          <AlertCircle size={20} className="text-[#F4B400]" />
        </div>
      )

    if (value === 'danger')
      return (
        <div className={`${base} bg-[#FF3B45]`}>
          <CircleX size={20} className="text-white" />
        </div>
      )

    return (
      <div className={`${base} bg-[#FED8D099]`}>
        <CreditCard size={18} className="text-[var(--color-sub-gray-100)]" />
      </div>
    )
  }

  const value = props.value
  const action = props.action

  if (value === 'order' && action === 'pickup_ready')
    return (
      <div className={`${base} bg-[#FF7C9833]`}>
        <Clock size={18} className="text-[var(--color-main-pink-200)]" />
      </div>
    )

  if (value === 'order')
    return (
      <div className={`${base} bg-[#EDFFAA99]`}>
        <CircleCheckBig size={20} className="text-[#1CB324]" />
      </div>
    )

  if (value === 'review')
    return (
      <div className={`${base} bg-[#FFFDECCC]`}>
        <Star size={18} className="text-[#FFC31A]" />
      </div>
    )

  return (
    <div className={`${base} bg-[#FFF4F4]`}>
      <Gift size={18} className="text-[#FFA6A5]" />
    </div>
  )
}
