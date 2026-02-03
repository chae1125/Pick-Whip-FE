import { useMemo, useState } from 'react'
import { Calendar } from 'lucide-react'
import BottomSheetCalendar from '../BottomSheetCalendar'

const times = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
]

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

export default function PickupDateTime() {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [selectedDate, setSelectedDate] = useState<Date | null>(today)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [openCalendar, setOpenCalendar] = useState(false)

  return (
    <section className="max-w-lg mx-auto mb-6 border-b border-[var(--color-main-pink-30)] pb-6">
      <span className="block pb-3 text-[17px] font-semibold text-[#364153]">픽업 날짜 및 시간</span>

      <span className="mb-1 block text-[12px] text-[#4A5565]">날짜 선택</span>
      <button
        type="button"
        onClick={() => setOpenCalendar(true)}
        className="mb-4 flex w-full items-center rounded-xl bg-white px-4 py-3 text-left"
      >
        <Calendar size={18} className="mr-2" />
        <span className="text-[14px]">
          {selectedDate ? formatKoreanDate(selectedDate) : '날짜를 선택해 주세요'}
        </span>
      </button>

      <BottomSheetCalendar
        open={openCalendar}
        onClose={() => setOpenCalendar(false)}
        value={selectedDate}
        onChange={(d) => setSelectedDate(d)}
      />

      <span className="mb-1 block text-[12px] text-[#4A5565]">시간 선택</span>
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {times.map((time) => {
          const isSelected = selectedTime === time
          return (
            <button
              key={time}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={[
                'flex-shrink-0 rounded-xl px-4 py-2 !text-[12px] transition',
                isSelected
                  ? 'bg-white border border-[#FF9886] text-[#0A0A0A0] !font-medium'
                  : 'bg-[#E5E7EB] text-[#0A0A0A]',
              ].join(' ')}
              aria-pressed={isSelected}
            >
              {time}
            </button>
          )
        })}
      </div>
    </section>
  )
}
