import { Search, SlidersHorizontal, X } from 'lucide-react'

interface MapInputProps {
  value: string
  onChange: (value: string) => void
  onFilterClick?: () => void
  onSearch?: (value: string) => void
  isSearchMode?: boolean
  onClearSearch?: () => void
}

export function MapInput({
  value,
  onChange,
  onFilterClick,
  onSearch,
  isSearchMode,
  onClearSearch,
}: MapInputProps) {
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
      <div className="flex flex-1 items-center gap-2 min-w-0">
        <Search size={18} className="shrink-0 text-[#666]" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur()
              onSearch?.(value)
            }
          }}
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

      {isSearchMode ? (
        <button
          type="button"
          onClick={onClearSearch}
          className="shrink-0 text-gray-500"
          aria-label="검색 취소"
        >
          <X size={15} />
        </button>
      ) : null}

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
