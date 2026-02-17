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

type PickupDateTimeProps = {
  shopId?: number
  initialPickupDatetime?: string
  onPickupTimeChange?: (datetime: string) => void
}

export default function PickupDateTime({
  shopId,
  initialPickupDatetime,
  onPickupTimeChange,
}: PickupDateTimeProps) {
  const today = useMemo(() => startOfDay(new Date()), [])

  const parsedInitial = useMemo(() => {
    if (!initialPickupDatetime) return null
    try {
      const date = new Date(initialPickupDatetime)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const endMinutes = minutes + 30
      const endHours = endMinutes >= 60 ? hours + 1 : hours
      const finalEndMinutes = endMinutes >= 60 ? endMinutes - 60 : endMinutes

      const timeRange = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}~${String(endHours).padStart(2, '0')}:${String(finalEndMinutes).padStart(2, '0')}`
      return { date, timeRange }
    } catch {
      return null
    }
  }, [initialPickupDatetime])

  const defaultDate = useMemo(
    () => parsedInitial?.date || addDays(today, 1),
    [today, parsedInitial],
  )
  const defaultTime = parsedInitial?.timeRange || '10:30~11:00'

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
        shopId={shopId}
        disablePast
        minDate={today}
        initialMonth={selectedDate ?? today}
        value={selectedDate}
        timeRange={selectedTimeRange}
        onConfirm={({ date, timeRange }) => {
          setSelectedDate(date)
          setSelectedTimeRange(timeRange)
          setOpenCalendar(false)

          if (onPickupTimeChange && date && timeRange) {
            const [startTime] = timeRange.split('~')
            const [hours, minutes] = startTime.split(':').map(Number)
            const datetime = new Date(date)
            datetime.setHours(hours, minutes, 0, 0)

            const year = datetime.getFullYear()
            const month = String(datetime.getMonth() + 1).padStart(2, '0')
            const day = String(datetime.getDate()).padStart(2, '0')
            const hour = String(datetime.getHours()).padStart(2, '0')
            const minute = String(datetime.getMinutes()).padStart(2, '0')
            const second = String(datetime.getSeconds()).padStart(2, '0')
            const datetimeStr = `${year}-${month}-${day}T${hour}:${minute}:${second}`

            onPickupTimeChange(datetimeStr)
          }
        }}
      />
    </section>
  )
}
