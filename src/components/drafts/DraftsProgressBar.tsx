export type ProgressStep = '커스터마이징' | '주문자 정보' | '픽업' | '추가 요청사항'

const STEPS: ProgressStep[] = ['커스터마이징', '주문자 정보', '픽업', '추가 요청사항']

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

export default function DraftsProgressBar({
  progressLabel,
  progress,
  className,
}: {
  progressLabel: string
  progress: ProgressStep
  className?: string
}) {
  const currentIndex = Math.max(0, STEPS.indexOf(progress))
  const currentText = String(currentIndex + 1)
  const CURRENT_STEP_FILL = 0.75

  return (
    <div className={className}>
      {/* 회색 라벨 */}
      <div className="flex items-center justify-between">
        {STEPS.map((s, idx) => {
          const isCurrent = idx === currentIndex
          const isDone = idx < currentIndex

          return (
            <div
              key={s}
              className={[
                'flex-1 text-center',
                'text-[10px] leading-[16px]',
                isCurrent || isDone
                  ? '!text-[#6F6F6F] !font-medium'
                  : '!text-[#6A7282] !font-normal',
              ].join(' ')}
            >
              {s}
            </div>
          )
        })}
      </div>

      {/* 점 */}
      <div className="mt-1 flex items-center justify-between">
        {STEPS.map((s, idx) => {
          const isDone = idx < currentIndex

          return (
            <div key={`dot-${s}`} className="flex-1 flex justify-center">
              <span
                className={[
                  'inline-block rounded-full',
                  'w-[5px] h-[5px]',
                  isDone ? 'bg-[var(--color-main-red-200)]' : 'bg-[var(--color-main-pink-30)]',
                ].join(' ')}
              />
            </div>
          )
        })}
      </div>

      {/* 진행바 */}
      <div className="mt-2 flex w-full gap-2">
        {STEPS.map((_, idx) => {
          const fill = idx < currentIndex ? 1 : idx === currentIndex ? CURRENT_STEP_FILL : 0

          return (
            <div
              key={idx}
              className="h-[9px] flex-1 overflow-hidden rounded-full bg-[var(--color-main-pink-30)]"
              aria-label={`progress-segment-${idx + 1}`}
            >
              <div
                className="h-full rounded-full bg-[var(--color-main-red-200)]"
                style={{ width: `${clamp01(fill) * 100}%` }}
              />
            </div>
          )
        })}
      </div>

      {/* 빨간색 라벨 */}
      <div className="mt-3 flex items-center justify-between">
        <p className="!text-[12px] !font-normal !text-[var(--color-main-red-200)]">
          {progressLabel}
        </p>

        <p className="!text-[12px] !font-normal">
          <span className="text-[var(--color-main-red-200)]">{currentText}</span>
          <span className="text-[#6F6F6F]">/4</span>
        </p>
      </div>
    </div>
  )
}
