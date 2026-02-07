import { useMemo, useState } from 'react'
import { Calendar } from 'lucide-react'
import PickupDateTimeModal from '../calendar/PickUpDateTimeModal'

function pad2(n: number) {
  return String(n).padStart(2, '0')
}
function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
function formatKoreanDate(d: Date) {
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `${d.getFullYear()}.${pad2(d.getMonth() + 1)}.${pad2(d.getDate())} (${days[d.getDay()]})`
}

function addDays(d: Date, days: number) {
  const next = new Date(d)
  next.setDate(d.getDate() + days)
  return next
}

export default function PickupDateTime() {
  const today = useMemo(() => startOfDay(new Date()), [])

  const defaultDate = useMemo(() => addDays(today, 1), [today])
  const defaultTime = '10:30~11:00'

  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDate)
  const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>(defaultTime)
  const [openCalendar, setOpenCalendar] = useState(false)

  return (
    <section className="mx-auto mb-6 max-w-lg border-b border-[var(--color-main-pink-30)] pb-6">
      <span className="block pb-3 text-[17px] font-semibold text-[#364153]">픽업 날짜 및 시간</span>

      <span className="mb-1 block text-[12px] text-[#4A5565]">날짜 선택</span>
      <button
        type="button"
        onClick={() => setOpenCalendar(true)}
        className="mb-2 flex w-full items-center rounded-xl bg-white px-4 py-3 text-left"
      >
        <Calendar size={18} className="mr-2" />
        <span className="text-[14px]">
          {selectedDate ? formatKoreanDate(selectedDate) : '날짜를 선택해 주세요'}
        </span>
      </button>

      <span className="mb-1 block text-[12px] text-[#4A5565]">시간 선택</span>
      <button
        type="button"
        onClick={() => setOpenCalendar(true)}
        className="mb-4 flex w-full items-center rounded-xl bg-white px-4 py-3 text-left"
      >
        <Calendar size={18} className="mr-2" />
        <span className="text-[14px]">{selectedTimeRange ?? '시간을 선택해 주세요'}</span>
      </button>

      <PickupDateTimeModal
        open={openCalendar}
        onClose={() => setOpenCalendar(false)}
        disablePast
        minDate={today}
        initialMonth={selectedDate ?? today}
        value={selectedDate}
        timeRange={selectedTimeRange}
        onConfirm={({ date, timeRange }) => {
          setSelectedDate(date)
          setSelectedTimeRange(timeRange)
          setOpenCalendar(false)
        }}
      />
    </section>
  )
}
