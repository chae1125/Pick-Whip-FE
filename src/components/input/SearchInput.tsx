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
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit?.()
        }}
        className="h-12 w-full rounded-[14px] border-[var(--color-sub-gray-50)] border pl-12 pr-5 text-md text-black outline-none bg-white focus:border-main-pink-200"
      />

      <button
        type="button"
        onClick={onSubmit}
        aria-label="검색"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-sub-gray-100)]"
      >
        <Search size={20} />
      </button>
    </div>
  )
}
