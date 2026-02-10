import { motion, AnimatePresence } from 'framer-motion'
import type { OrderInfo } from './OrderListCard'

export default function OrderListCardEx({
  open,
  item,
  onClickPreview,
  showDetailButton,
}: {
  open: boolean
  item: OrderInfo
  onClickPreview?: () => void
  showDetailButton?: boolean
}) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="expanded"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="mt-5 flex items-start">
            <div className="w-[110px] flex-shrink-0 flex justify-center">
              <button
                type="button"
                onClick={onClickPreview}
                className="!text-[11px] font-medium text-[#57504F] underline underline-offset-4"
              >
                {item.previewText ?? '프리뷰 보기'}
              </button>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="w-[240px] space-y-1">
                <InfoRow label="디자인" value={item.detail?.design ?? '-'} />
                <InfoRow label="맛" value={item.detail?.taste ?? '-'} />
                <InfoRow label="레터링" value={item.detail?.lettering ?? '-'} />
                <InfoRow label="추가요청" value={item.detail?.extraRequest ?? '-'} />
              </div>
            </div>
          </div>

          <div className="mt-4 pl-[25px]">
            <div className="space-y-2">
              <KeyValueRow label="확정 금액" value={item.detail?.finalPriceText ?? '-'} />
              <KeyValueRow label="주문 코드" value={item.detail?.orderCode ?? '-'} />
            </div>

            {showDetailButton && (
              <div className="mt-4 pr-5">
                <button
                  type="button"
                  onClick={item.onClickDetail}
                  className="w-full rounded-lg bg-[#57504F] py-3 text-[13px] font-medium text-white transition-colors hover:bg-[#453f3e]"
                >
                  주문서 상세보기
                </button>
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-5">
      <div className="w-[56px] text-[10px] font-medium text-[#2A2929]">{label}</div>
      <div className="flex-1 text-[10px] font-normal text-[#2A2929] break-words">{value}</div>
    </div>
  )
}

function KeyValueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline">
      <div className="w-[80px] text-[13px] font-medium text-[#0A0A0A]">{label}</div>
      <div className="text-[13px] font-medium text-[#0A0A0A]">{value}</div>
    </div>
  )
}
