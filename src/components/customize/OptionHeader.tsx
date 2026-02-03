interface OptionHeaderProps {
  title: string
  tag?: string
  value: string | number
}

export default function OptionHeader({ title, tag, value }: OptionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-[16px] font-semibold text-[#1E2939]">{title}</span>

      {tag && (
        <>
          <span className="text-sm text-gray-400">|</span>
          <span className="text-[13.5px] text-[#57504F]">{tag}</span>
        </>
      )}

      <span className="text-[13.5px] text-[#57504F]">{value}</span>
    </div>
  )
}
