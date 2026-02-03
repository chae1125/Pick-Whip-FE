import { useMemo, useState } from 'react'

type DayCell = {
  date: Date
  inMonth: boolean
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function buildMonthGrid42(year: number, monthIndex: number): DayCell[] {
  const first = new Date(year, monthIndex, 1)
  const firstDow = first.getDay()

  const prevMonthLast = new Date(year, monthIndex, 0)
  const prevMonthDays = prevMonthLast.getDate()

  const thisMonthLast = new Date(year, monthIndex + 1, 0)
  const thisMonthDays = thisMonthLast.getDate()

  const cells: DayCell[] = []

  for (let i = firstDow - 1; i >= 0; i--) {
    const day = prevMonthDays - i
    cells.push({ date: new Date(year, monthIndex - 1, day), inMonth: false })
  }

  for (let d = 1; d <= thisMonthDays; d++) {
    cells.push({ date: new Date(year, monthIndex, d), inMonth: true })
  }

  let nextDay = 1
  while (cells.length < 35) {
    cells.push({ date: new Date(year, monthIndex + 1, nextDay++), inMonth: false })
  }

  return cells
}

type BorderCalendarProps = {
  value: Date | null
  onChange: (d: Date) => void
  disablePast?: boolean
  minDate?: Date
  initialMonth?: Date
}

export default function PickUpCalendar({
  value,
  onChange,
  disablePast = true,
  minDate,
  initialMonth,
}: BorderCalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const min = useMemo(() => startOfDay(minDate ?? today), [minDate, today])

  const base = initialMonth ?? value ?? min
  const [viewYear, setViewYear] = useState(base.getFullYear())
  const [viewMonth, setViewMonth] = useState(base.getMonth())

  const cells = useMemo(() => buildMonthGrid42(viewYear, viewMonth), [viewYear, viewMonth])
  const dow = ['일', '월', '화', '수', '목', '금', '토']

  const goPrev = () => {
    const d = new Date(viewYear, viewMonth - 1, 1)
    setViewYear(d.getFullYear())
    setViewMonth(d.getMonth())
  }

  const goNext = () => {
    const d = new Date(viewYear, viewMonth + 1, 1)
    setViewYear(d.getFullYear())
    setViewMonth(d.getMonth())
  }

  const pick = (d: Date) => {
    const only = startOfDay(d)
    if (disablePast && only.getTime() < min.getTime()) return
    onChange(only)
  }

  return (
    <div className="mx-auto w-fit rounded-xl border border-[#EAEAEA] bg-white p-3">
      <div className="relative flex items-center justify-center pb-2">
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-0 grid w-7 aspect-square place-items-center rounded-lg border border-[#EFEFEF] bg-white"
          aria-label="이전 달"
        >
          <span className="text-[16px] leading-none text-[#6B7280]">{'‹'}</span>
        </button>

        <div className="text-[13px] font-regular text-[#0A0A0A]">
          {viewMonth + 1}월 {viewYear}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-0 grid w-7 aspect-square place-items-center rounded-lg border border-[#EFEFEF] bg-white"
          aria-label="다음 달"
        >
          <span className="text-[16px] leading-none text-[#6B7280]">{'›'}</span>
        </button>
      </div>

      <div className=" grid grid-cols-7 text-center text-[10px] font-regular text-[#8B90A0]">
        {dow.map((d) => (
          <div key={d} className="py-1.5">
            {d}
          </div>
        ))}
      </div>

      <div className="mx-auto w-fit grid grid-cols-7 gap-y-2">
        {cells.map((cell, idx) => {
          const d = startOfDay(cell.date)
          const disabled = disablePast && d.getTime() < min.getTime()
          const selected = value ? isSameDay(d, value) : false

          let textColor = '#0A0A0A'
          if (!cell.inMonth) textColor = '#8B90A0'
          if (disabled) textColor = '#C9CED6'

          return (
            <button
              key={`${cell.date.toISOString()}-${idx}`}
              type="button"
              onClick={() => pick(d)}
              disabled={disabled}
              className={[
                'mx-auto grid w-9 aspect-square place-items-center rounded-lg !text-[13px] transition',
                disabled && 'cursor-not-allowed',
                !disabled && !selected && 'hover:bg-black/5 active:scale-95',
                selected && 'bg-[#F6DCE6]',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ color: textColor }}
              aria-pressed={selected}
            >
              {cell.date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
