import Anniversary from '../assets/img/anniversary.png'
import Birthday from '../assets/img/birthday.png'
import Christmas from '../assets/img/christmas.png'
import Graduation from '../assets/img/graduation.png'

export type CategoryValue = '전체' | '생일' | '기념일' | '크리스마스' | '졸업'

type Category = {
  id: string
  label: string
  icon?: string
}

const DEFAULT: Category[] = [
  { id: '전체', label: '전체', icon: 'ALL' },
  { id: '생일', label: '생일', icon: Birthday },
  { id: '기념일', label: '기념일', icon: Anniversary },
  { id: '크리스마스', label: '크리스마스', icon: Christmas },
  { id: '졸업', label: '졸업', icon: Graduation },
]

export default function CategoryChips({
  items,
  value,
  onChange,
}: {
  items?: Category[]
  value?: CategoryValue
  onChange?: (value: CategoryValue) => void
}) {
  const cats = items ?? DEFAULT

  return (
    <div className="mx-auto max-w-lg mt-6">
      <div className="grid grid-cols-5 gap-y-6 gap-x-4">
        {cats.map((c) => {
          const active = c.id === value
          return (
            <button
              key={c.id}
              onClick={() => onChange?.(c.id as CategoryValue)}
              className="flex flex-col items-center justify-start bg-transparent"
              aria-pressed={active}
              type="button"
            >
              <div
                className={`flex items-center justify-center h-12 w-12 rounded-full transition-colors duration-150 ${
                  active ? 'bg-[#D65151]' : 'bg-[#F4D3D3]'
                }`}
              >
                {c.icon === 'ALL' ? (
                  <span className="text-sm font-bold text-white">ALL</span>
                ) : (
                  <img src={c.icon} alt={c.label} className="h-7 w-7 object-contain" />
                )}
              </div>

              <div className="mt-2 text-[12px] text-[#38240D] font-medium">
                <span>{c.label}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
