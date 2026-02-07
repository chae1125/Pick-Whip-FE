import { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'

export type ReviewSortKey = 'latest' | 'helpful' | 'rating_desc' | 'rating_asc'

const OPTIONS: { label: string; value: ReviewSortKey }[] = [
  { label: '최신순', value: 'latest' },
  { label: '도움순', value: 'helpful' },
  { label: '별점높은순', value: 'rating_desc' },
  { label: '별점낮은순', value: 'rating_asc' },
]

export default function ReviewSortDropdown({
  value,
  onChange,
}: {
  value: ReviewSortKey
  onChange: (v: ReviewSortKey) => void
}) {
  const [open, setOpen] = useState(false)
  const [touched, setTouched] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const selected = OPTIONS.find((o) => o.value === value)
  const isSelected = touched

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div ref={ref} className="relative text-sm">
      <button
        type="button"
        onClick={() => {
          setTouched(true)
          setOpen((v) => !v)
        }}
        className={[
          'w-[90px] h-[24px] inline-flex items-center justify-center',
          '!text-[12px] !text-[#3E3E3E] rounded-[7px] border border-[#E8E8E8]',
          isSelected ? 'bg-[#FFE1DC] border-[#FFD9E3]' : 'bg-white',
        ].join(' ')}
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-1">
          <span className="font-medium leading-none">{selected?.label ?? '정렬'}</span>
          <ChevronDownIcon
            size={12}
            className={['transition-transform duration-200', open ? 'rotate-180' : 'rotate-0'].join(
              ' ',
            )}
            color="#3E3E3E"
          />
        </span>
      </button>

      {open && (
        <ul
          className={[
            'absolute right-0 top-full z-50 mt-2 w-[83px] overflow-hidden rounded-[2px]',
            'border border-[#ECEDEE] bg-white shadow-lg text-[12px]',
          ].join(' ')}
        >
          {OPTIONS.map((option) => (
            <li key={option.value} className="border-b border-[#EFEFEF] last:border-b-0">
              <button
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={
                  'w-full px-3 py-2 text-left text-[#4A5565] hover:bg-[#F7F7F7] transition'
                }
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
