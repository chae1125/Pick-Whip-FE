export interface SizeItem {
  label: string
  circleSize?: string
  additionalPrice?: number
}

interface SizeCardProps {
  item: SizeItem
  isSelected: boolean
  onClick: (label: string) => void
}

export default function SizeCard({ item, isSelected, onClick }: SizeCardProps) {
  return (
    <button
      onClick={() => onClick(item.label)}
      className={`relative bg-white rounded-2xl p-3 h-40 flex flex-col items-center border-2 transition-all ${
        isSelected ? 'border-[#FF9980]' : 'border-transparent'
      }`}
    >
      <div
        className={`absolute top-2.5 left-2.5 w-5 h-5 rounded-full flex items-center justify-center z-10 ${
          isSelected ? 'bg-[#FF9980]' : 'border-2 border-[#E0E0E0] bg-white'
        }`}
      >
        {isSelected && (
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-none stroke-current stroke-3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center mt-4">
        <div
          className={`${item.circleSize ?? 'w-12 h-12'} aspect-square rounded-full bg-main-pink-30 flex items-center justify-center shadow-sm`}
        />
      </div>
      <div className="mt-2 text-center">
        <div className={`font-bold text-[13px] ${isSelected ? 'text-[#222]' : 'text-[#666]'}`}>
          {item.label}
        </div>
        {item.additionalPrice ? (
          <div className="text-[12px] text-[#666]">
            + {Number(item.additionalPrice).toLocaleString()}원
          </div>
        ) : null}
      </div>
    </button>
  )
}
