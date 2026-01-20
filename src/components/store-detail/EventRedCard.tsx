type EventRedCardProps = {
  title: string
  body: string
  period: string
}

export default function EventRedCard({ title, body, period }: EventRedCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-[10px] bg-white">
      <div className="h-[44px] bg-[var(--color-main-red-200)] px-5 flex items-center">
        <p className="!text-[14px] !font-normal !text-white">{title}</p>
      </div>
      <div className="px-5 pt-4 pb-5">
        <p className="!text-[12px] !font-normal !text-[var(--color-sub-gray-100)]">
          <HighlightNumbers text={body} />
        </p>
        <p className="!mt-2 !text-[12px] !font-normal !text-[#6A7282]">기간: {period}</p>
      </div>
    </div>
  )
}

function HighlightNumbers({ text }: { text: string }) {
  const parts = text.split(/(\d+%?)/g).filter(Boolean)

  return (
    <>
      {parts.map((p, i) => {
        const isNumberOrPercent = /^\d+%?$/.test(p)

        return (
          <span
            key={`${p}-${i}`}
            className={
              isNumberOrPercent ? 'text-[var(--color-main-red-200)] font-semibold' : undefined
            }
          >
            {p}
          </span>
        )
      })}
    </>
  )
}
