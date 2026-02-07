import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { ProgressStep } from '../order-history/OrderProgressBar'
import OrderListCardMeta from './OrderListCardMeta'
import OrderListCardExpanded from './OrderListCardEx'
import OrderReviewCta from '@/components/order-history/OrderReviewCta'
import { StatusChip, OrderProgressSection, UnavailableActions } from './UnavailableActions'

export type OrderInfo = {
  imageURL: string
  createdAt: string
  storeName: string
  cakeName: string
  pickupDate: string
  pickupTime: string
  progressLabel: string
  progress: ProgressStep
  previewText?: string

  detail?: {
    design?: string
    taste?: string
    lettering?: string
    extraRequest?: string
    finalPriceText?: string
    orderCode?: string
  }

  onClickOwnerMessage?: () => void
  onClickRetryPayment?: () => void
  onClickWriteReview?: () => void
}

function chipTextFromProgress(progress: ProgressStep) {
  const MAP: Record<ProgressStep, string> = {
    '주문서 완료': '주문서 확인 중',
    '주문서 확인': '결제 요청 중',
    '제작 확정': '제작 중',
    '제작 불가': '제작 불가',
    '제작 완료': '픽업 대기 중',
    '픽업 완료': '픽업 완료',
  }
  return MAP[progress]
}

export default function OrderListCard({
  item,
  className,
  onClickPreview,
  onClickMessage,
}: {
  item: OrderInfo
  className?: string
  onClickPreview?: () => void
  onClickMessage?: () => void
}) {
  const [open, setOpen] = useState(false)

  const chipText = useMemo(() => chipTextFromProgress(item.progress), [item.progress])

  return (
    <div className={['pt-4 pb-4', className].join(' ')}>
      <div className="w-full rounded-[16px] bg-white px-5 pt-5 pb-5 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
        <OrderListCardMeta
          item={item}
          chip={<StatusChip progress={item.progress} chipText={chipText} />}
          onClickMessage={onClickMessage}
        />

        <OrderListCardExpanded open={open} item={item} onClickPreview={onClickPreview} />

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="w-[34px] h-[34px] flex items-center justify-center"
            aria-label={open ? 'collapse' : 'expand'}
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <ChevronDown size={22} className="text-[#6A7282]" />
            </motion.div>
          </button>
        </div>

        <OrderProgressSection progressLabel={item.progressLabel} progress={item.progress} />

        <UnavailableActions
          progressLabel={item.progressLabel}
          progress={item.progress}
          onClickOwnerMessage={item.onClickOwnerMessage}
          onClickRetryPayment={item.onClickRetryPayment}
        />

        <OrderReviewCta progress={item.progress} onClickReview={item.onClickWriteReview} />
      </div>
    </div>
  )
}
