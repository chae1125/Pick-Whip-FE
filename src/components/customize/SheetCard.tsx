export interface SheetItem {
  label: string
  color: string
  additionalPrice?: number
}

interface SheetCardProps {
  sheet: SheetItem
  selectedSheet: string
  onClick: (label: string) => void
}

export default function SheetCard({ sheet, selectedSheet, onClick }: SheetCardProps) {
  return (
    <button
      onClick={() => onClick(sheet.label)}
      className={`bg-white rounded-3xl p-5 flex flex-col items-center border-2 transition-all ${
        selectedSheet === sheet.label ? 'border-[#FF9980]' : 'border-transparent'
      }`}
    >
      <div className="flex flex-col gap-1.5 mb-5 mt-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{ backgroundColor: sheet.color }}
            className="w-16 h-4 rounded-sm shadow-sm"
          />
        ))}
      </div>
      <div>
        <div className="font-bold text-[15px]">{sheet.label}</div>
        {sheet.additionalPrice ? (
          <div className="text-[12px] text-[#666]">
            +₩{Number(sheet.additionalPrice).toLocaleString()}
          </div>
        ) : null}
      </div>
    </button>
  )
}
