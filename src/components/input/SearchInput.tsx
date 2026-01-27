import { Search } from 'lucide-react'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = '원하는 케이크샵을 검색해 보세요!',
}: SearchInputProps) {
  return (
    <div className="relative w-[90%] max-w-md mx-auto">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit?.()
        }}
        className="h-12 w-full rounded-[14px] border border-input-border px-5 pr text-md text-black outline-none bg-input-bg focus:border-main-pink-200"
      />

      <button
        type="button"
        onClick={onSubmit}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-sub-gray-100"
      >
        <Search size={20} />
      </button>
    </div>
  )
}
