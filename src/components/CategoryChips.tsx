import { useState } from 'react'
import Anniversary from '../assets/img/anniversary.png'
import Birthday from '../assets/img/birthday.png'
import Christmas from '../assets/img/christmas.png'
import Graduation from '../assets/img/graduation.png'

type Category = {
  id: string
  label: string
  icon?: string
}

const DEFAULT: Category[] = [
  { id: 'all', label: '전체', icon: 'ALL' },
  { id: 'birthday', label: '생일', icon: Birthday },
  { id: 'anniv', label: '기념일', icon: Anniversary },
  { id: 'christmas', label: '크리스마스', icon: Christmas },
  { id: 'graduation', label: '졸업', icon: Graduation },
]

export default function CategoryChips({ items }: { items?: Category[] }) {
  const cats = items ?? DEFAULT
  const [selected, setSelected] = useState<string>('all')

  return (
    <div className="mx-auto max-w-lg mt-6">
      <div className="grid grid-cols-5 gap-y-6 gap-x-4">
        {cats.map((c) => {
          const active = c.id === selected
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className="flex flex-col items-center justify-start bg-transparent"
              aria-pressed={active}
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
