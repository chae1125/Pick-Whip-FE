import OrderProgressBar, { type ProgressStep } from '../order-history/OrderProgressBar'
import { X } from 'lucide-react'

function isOwnerMessageCase(label: string) {
  return label.includes('사장')
}
function isPaymentCase(label: string) {
  return label.includes('결제')
}

export function StatusChip({ progress, chipText }: { progress: ProgressStep; chipText: string }) {
  const isMakeUnavailable = progress === '제작 불가'

  return (
    <span
      className={[
        'inline-flex items-center gap-[5px]',
        'h-[26px] px-[13px] rounded-full',
        isMakeUnavailable ? 'bg-[#F7DEDD]' : 'bg-white',
        'border-[1.3px] border-[#D65151]',
      ].join(' ')}
    >
      {isMakeUnavailable ? (
        <span className="inline-flex items-center justify-center">
          <span className="inline-flex items-center justify-center w-[15px] h-[15px] rounded-full border-[2px] border-[#EA113B]">
            <X size={9} strokeWidth={4} className="text-[#E7000B]" />
          </span>
        </span>
      ) : null}

      <span
        className={[
          'text-[11px] font-medium',
          isMakeUnavailable ? 'text-[#E7000B]' : 'text-[#2A2929]',
        ].join(' ')}
      >
        {chipText}
      </span>
    </span>
  )
}

export function OrderProgressSection({
  progressLabel,
  progress,
}: {
  progressLabel: string
  progress: ProgressStep
}) {
  return (
    <div className="mt-2">
      <OrderProgressBar progressLabel={progressLabel} progress={progress} />
    </div>
  )
}

export function UnavailableActions({
  progressLabel,
  progress,
  onClickOwnerMessage,
  onClickRetryPayment,
  showOwnerBtn: showOwnerBtnProp,
  showPayBtn: showPayBtnProp,
}: {
  progressLabel: string
  progress: ProgressStep
  onClickOwnerMessage?: () => void
  onClickRetryPayment?: () => void
  showOwnerBtn?: boolean
  showPayBtn?: boolean
}) {
  const isMakeUnavailable = progress === '제작 불가'
  if (!isMakeUnavailable) return null

  const showOwnerBtn = showOwnerBtnProp ?? isOwnerMessageCase(progressLabel)
  const showPayBtn = showPayBtnProp ?? isPaymentCase(progressLabel)

  return (
    <>
      {showOwnerBtn ? (
        <button
          type="button"
          onClick={onClickOwnerMessage}
          className={[
            'mt-8 w-full h-[56px] rounded-[28px]',
            'bg-white',
            'text-[#57504F] text-[16px] !font-bold',
            'shadow-[0_4px_12px_rgba(0,0,0,0.12)]',
            'border-[2px] border-[#57504F]',
          ].join(' ')}
        >
          사장님 메시지 확인하기
        </button>
      ) : null}

      {showPayBtn ? (
        <button
          type="button"
          onClick={onClickRetryPayment}
          className={[
            'mt-8 w-full h-[56px] rounded-[28px]',
            'bg-[#FF9886]',
            'text-white text-[16px] !font-bold',
            'shadow-[0_4px_12px_rgba(0,0,0,0.12)]',
          ].join(' ')}
        >
          결제 다시 진행하기
        </button>
      ) : null}
    </>
  )
}
