const SEGMENTS = ['주문서 완료', '주문서 확인', '제작 확정', '제작 완료', '픽업 완료'] as const
export type SegmentLabel = (typeof SEGMENTS)[number]
export type ProgressStep = SegmentLabel | '제작 불가'

const MAKE_SEGMENT_INDEX = 2
const stepToIndex = (s: ProgressStep) =>
  s === '제작 불가' ? MAKE_SEGMENT_INDEX : SEGMENTS.indexOf(s)

export default function OrderProgressBar({
  progressLabel,
  progress,
  className,
}: {
  progressLabel: string
  progress: ProgressStep
  className?: string
}) {
  const currentIndex = stepToIndex(progress)
  const isMakeUnavailable = progress === '제작 불가'

  const state = (idx: number) => {
    const isMake = idx === MAKE_SEGMENT_INDEX
    const isActive = idx <= currentIndex
    const shownLabel = isMake && isMakeUnavailable ? '제작 불가' : SEGMENTS[idx]
    return { isMake, isActive, shownLabel }
  }

  const labelCls = (isMake: boolean, isActive: boolean) =>
    [
      'flex-1 text-center text-[10px] leading-[16px]',
      isMake && isMakeUnavailable
        ? '!text-[#EA113B] !font-medium'
        : isActive
          ? '!text-[#6F6F6F] !font-medium'
          : '!text-[#6A7282] !font-normal',
    ].join(' ')

  const dotCls = (isMake: boolean, isActive: boolean) =>
    [
      'inline-block rounded-full w-[5px] h-[5px]',
      isMake && isMakeUnavailable
        ? 'bg-[#EA113B]'
        : isActive
          ? 'bg-[var(--color-main-red-200)]'
          : 'bg-[var(--color-main-pink-30)]',
    ].join(' ')

  return (
    <div className={className}>
      {/* 라벨 */}
      <div className="flex items-center justify-between px-6">
        {SEGMENTS.map((_, idx) => {
          const { isMake, isActive, shownLabel } = state(idx)
          return (
            <div key={`label-${idx}`} className={labelCls(isMake, isActive)}>
              {shownLabel}
            </div>
          )
        })}
      </div>

      {/* 점 */}
      <div className="mt-1 flex items-center justify-between px-6">
        {SEGMENTS.map((_, idx) => {
          const { isMake, isActive } = state(idx)
          return (
            <div key={`dot-${idx}`} className="flex-1 flex justify-center">
              <span className={dotCls(isMake, isActive)} />
            </div>
          )
        })}
      </div>

      {/* 바 */}
      <div className="mt-2 px-6 flex w-full gap-2">
        {SEGMENTS.map((_, idx) => {
          const { isMake, isActive } = state(idx)

          if (isMake && isMakeUnavailable) {
            return (
              <div
                key={`seg-${idx}`}
                className="h-[9px] flex-1 overflow-hidden rounded-full bg-[#F7DEDD] border-[3px] border-[#EA113B]"
                aria-label={`progress-segment-${idx + 1}`}
              />
            )
          }

          return (
            <div
              key={`seg-${idx}`}
              className="h-[9px] flex-1 overflow-hidden rounded-full bg-[var(--color-main-pink-30)]"
              aria-label={`progress-segment-${idx + 1}`}
            >
              <div
                className="h-full rounded-full bg-[var(--color-main-red-200)]"
                style={{ width: isActive ? '100%' : '0%' }}
              />
            </div>
          )
        })}
      </div>

      {/* 하단 */}
      <div className="mt-3 flex items-center justify-between px-6">
        <p className="!text-[12px] !font-normal !text-[var(--color-main-red-200)]">
          {progressLabel}
        </p>
        <p className="!text-[12px] !font-normal">
          <span className="text-[var(--color-main-red-200)]">{currentIndex + 1}</span>
          <span className="text-[#6F6F6F]">/5</span>
        </p>
      </div>
    </div>
  )
}
