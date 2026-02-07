import type { ProgressStep } from '../order-history/OrderProgressBar'

export default function OrderReviewCta({
  progress,
  onClickReview,
  className,
  label = '리뷰 쓰기',
}: {
  progress: ProgressStep
  onClickReview?: () => void
  className?: string
  label?: string
}) {
  const show = progress === '픽업 완료'
  if (!show) return null

  return (
    <button
      type="button"
      onClick={onClickReview}
      className={[
        'mt-6 w-full h-[56px] rounded-[28px]',
        'bg-[#FF9886] text-white text-[16px] !font-bold',
        'shadow-[0_4px_12px_rgba(0,0,0,0.12)]',
        className ?? '',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
