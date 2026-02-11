import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import type { DesignSort } from '@/apis/home'

const OPTIONS: Array<{ label: string; value: DesignSort }> = [
  { label: '가나다순', value: 'NAME' },
  { label: '가까운 순', value: 'NEARBY' },
  { label: '평점순', value: 'RATING' },
]

export default function SortDropdown({
  value,
  onChange,
}: {
  value: DesignSort
  onChange: (v: DesignSort) => void
}) {
  const [open, setOpen] = useState(false)
  const selected = OPTIONS.find((o) => o.value === value)

  return (
    <div className="relative text-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[#0A0A0A] hover:bg-gray-50 active:scale-[0.98] transition"
      >
        <span className="font-medium">{selected?.label ?? '정렬'}</span>
        <span className="text-[15px] text-[var(--color-sub-gray-100)]">
          <ChevronDownIcon size={20} />
        </span>
      </button>

      {open && (
        <ul className="absolute left-0 top-full z-20 mt-2 w-30 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`w-full px-3 py-2 text-left transition ${
                  option.value === value
                    ? 'bg-[#D65151] font-semibold text-white hover:bg-[#D65151]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
