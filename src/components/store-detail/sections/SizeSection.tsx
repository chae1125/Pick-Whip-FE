//made by gpt...🤍

export type SizeRow = {
  cm: number
  label: string
}

export default function SizeSection({ sizes }: { sizes: SizeRow[] }) {
  const visible = sizes.slice(0, 4)
  const circlesize = [38, 62, 74, 86] as const

  const BOX_H = 90
  const ARROW_Y = 44

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-[10px] bg-white px-5 py-6">
        {visible.length === 0 ? (
          <p className="!text-[12px] !text-[var(--color-sub-gray-100)]">사이즈 정보가 없습니다.</p>
        ) : (
          <div className="flex justify-center">
            <div className="flex items-end justify-center gap-10">
              {visible.map((item, i) => {
                const sizePx = circlesize[i]

                return (
                  <div key={`${item.label}-${item.cm}`} className="flex flex-col items-center">
                    <div className="relative" style={{ width: sizePx, height: BOX_H }}>
                      <SizeBubble cm={item.cm} sizePx={sizePx} arrowY={ARROW_Y} />
                    </div>

                    <div className="mt-3">
                      <span className="text-[12px] text-[var(--color-sub-gray-100)]">
                        {item.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SizeBubble({
  cm,
  sizePx,
  arrowY,
}: {
  cm: number
  sizePx: number // 원 지름
  arrowY: number // 원 중심이 맞춰질 기준선 y
}) {
  // 원 위쪽 위치 = (기준선 y) - (원 반지름)
  const circleTop = arrowY - sizePx / 2

  return (
    // 원 위치 정렬
    <div className="absolute left-0" style={{ top: circleTop, width: sizePx, height: sizePx }}>
      {/* 원 그리기 */}
      <div
        className="relative rounded-full bg-[var(--color-main-pink-30)]"
        style={{ width: sizePx, height: sizePx }}
      >
        {/* 원 내부 cm */}
        <div className="absolute inset-0 flex items-center justify-center translate-y-[-8px]">
          <span className="text-[10px] text-[var(--color-sub-gray-100)]">{cm}</span>
        </div>

        {/* 원 중앙에 화살표 배치 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 왼쪽 삼각형 */}
          <div className="w-0 h-0 border-y-[4px] border-y-transparent border-r-[6px] border-r-[var(--color-main-red-200)]" />

          {/* 가운데 선 */}
          <div className="flex-1 h-[1px] bg-[var(--color-main-red-200)]" />

          {/* 오른쪽 삼각형 */}
          <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-[var(--color-main-red-200)]" />
        </div>
      </div>
    </div>
  )
}
