type NoticeSectionProps = {
  notices: string[]
}

export default function NoticeSection({ notices }: NoticeSectionProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-[10px] bg-white p-3 flex flex-col gap-2">
        {notices.length === 0 ? (
          <p className="!text-[12px] !text-[var(--color-sub-gray-100)]">유의사항이 없습니다.</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {notices.map((text, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[12px] leading-[18px] text-[var(--color-sub-gray-100)]">
                  •
                </span>
                <span className="text-[12px] leading-[18px] text-[var(--color-sub-gray-100)]">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
