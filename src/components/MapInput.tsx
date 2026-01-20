import { Search, SlidersHorizontal } from 'lucide-react'

interface MapInputProps {
  value: string
  onChange: (value: string) => void
  onFilterClick?: () => void
}

export function MapInput({ value, onChange, onFilterClick }: MapInputProps) {
  return (
    <div
      className="
        flex items-center
        w-full h-12
        px-4 py-2
        rounded-xl
        border border-[#B5B5B5]
        bg-white
      "
    >
      {/* 검색 영역 */}
      <div className="flex flex-1 items-center gap-2 min-w-0">
        <Search size={18} className="shrink-0 text-[#666]" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="지역 또는 키워드로 검색"
          className="
            w-full
            min-w-0
            text-md
            outline-none
            placeholder:text-gray-400
          "
        />
      </div>

      <div className="mx-3 h-4 w-px bg-gray-300 shrink-0" />

      <button
        type="button"
        onClick={onFilterClick}
        className="
          flex items-center gap-1
          shrink-0
          text-[#186ADE]
        "
      >
        <SlidersHorizontal size={18} />
        <span className="text-sm font-medium whitespace-nowrap">필터</span>
      </button>
    </div>
  )
}
