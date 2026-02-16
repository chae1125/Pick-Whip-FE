import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { ProgressStep } from '../order-history/OrderProgressBar'
import OrderListCardMeta from './OrderListCardMeta'
import OrderListCardExpanded from './OrderListCardEx'
import OrderReviewCta from '@/components/order-history/OrderReviewCta'
import { StatusChip, OrderProgressSection, UnavailableActions } from './UnavailableActions'

export type OrderInfo = {
  orderId: number
  imageURL: string
  createdAt: string
  storeName: string
  cakeName: string
  pickupDate: string
  pickupTime: string
  progressLabel: string
  progress: ProgressStep
  chipText?: string
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
  onClickDetail?: () => void
}

export default function OrderListCard({
  item,
  className,
  onClickPreview,
  simpleView,
  showMessageButton,
}: {
  item: OrderInfo
  className?: string
  onClickPreview?: () => void
  simpleView?: boolean
  showMessageButton?: boolean
}) {
  const [open, setOpen] = useState(false)
  const chipText = item.chipText ?? item.progressLabel

  return (
    <div className={['pt-4 pb-4', className].join(' ')}>
      <div className="w-full rounded-[16px] bg-white px-5 pt-5 pb-5 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
        <OrderListCardMeta
          item={item}
          chip={<StatusChip progress={item.progress} chipText={chipText} />}
          showMessageButton={showMessageButton}
        />

        <OrderListCardExpanded
          open={open}
          item={item}
          onClickPreview={onClickPreview}
          showDetailButton={simpleView}
        />

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

        {!simpleView && (
          <>
            <OrderProgressSection progressLabel={item.progressLabel} progress={item.progress} />

            <UnavailableActions
              progressLabel={item.progressLabel}
              progress={item.progress}
              onClickOwnerMessage={item.onClickOwnerMessage}
              onClickRetryPayment={item.onClickRetryPayment}
            />

            <OrderReviewCta progress={item.progress} onClickReview={item.onClickWriteReview} />
          </>
        )}
      </div>
    </div>
  )
}
