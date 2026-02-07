import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import PickUpCalendar from './PickUpCalendar'
import FilterChipsGroup from '../FilterChipsGroup'

type Props = {
  open: boolean
  onClose: () => void
  disablePast?: boolean
  minDate?: Date
  initialMonth?: Date
  onConfirm?: (payload: { date: Date; timeRange: string }) => void
  value?: Date | null
  timeRange?: string | null
}

const AM_OPTIONS = [
  { value: '10:00~10:30', label: '10:00~10:30' },
  { value: '10:30~11:00', label: '10:30~11:00' },
  { value: '11:00~11:30', label: '11:00~11:30' },
  { value: '11:30~12:00', label: '11:30~12:00' },
]

const PM_OPTIONS = [
  { value: '12:00~12:30', label: '12:00~12:30' },
  { value: '12:30~13:00', label: '12:30~13:00' },
  { value: '13:00~13:30', label: '13:00~13:30' },
  { value: '13:30~14:00', label: '13:30~14:00' },
  { value: '14:00~14:30', label: '14:00~14:30' },
  { value: '14:30~15:00', label: '14:30~15:00' },
]

export default function PickUpDateTimeModal({
  open,
  onClose,
  disablePast = true,
  minDate,
  initialMonth,
  onConfirm,
  value,
  timeRange,
}: Props) {
  const resetKey = useMemo(
    () => `${value?.toISOString() ?? 'null'}|${timeRange ?? 'null'}`,
    [value, timeRange],
  )

  return open ? (
    <PickUpDateTimeModalInner
      key={resetKey}
      onClose={onClose}
      disablePast={disablePast}
      minDate={minDate}
      initialMonth={initialMonth}
      onConfirm={onConfirm}
      value={value}
      timeRange={timeRange}
    />
  ) : null
}

type InnerProps = Omit<Props, 'open'>

function PickUpDateTimeModalInner({
  onClose,
  disablePast = true,
  minDate,
  initialMonth,
  onConfirm,
  value,
  timeRange,
}: InnerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? null)
  const [selectedTime, setSelectedTime] = useState<string[]>(timeRange ? [timeRange] : [])

  const handleSingle = (next: string[]) => {
    setSelectedTime(next.length ? [next[next.length - 1]] : [])
  }

  const canConfirm = Boolean(selectedDate && selectedTime.length === 1)

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
        aria-label="닫기"
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg overflow-hidden rounded-[18px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
          <div className="flex max-h-[90vh] flex-col">
            <div className="relative flex-shrink-0 px-5 pt-5">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full hover:bg-black/5"
                aria-label="닫기"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-4">
              <div className="pt-2">
                <PickUpCalendar
                  value={selectedDate}
                  onChange={(d) => setSelectedDate(d)}
                  disablePast={disablePast}
                  minDate={minDate}
                  initialMonth={initialMonth ?? selectedDate ?? value ?? undefined}
                />
              </div>

              <div className="px-4 pt-5">
                <FilterChipsGroup
                  title="오전"
                  options={AM_OPTIONS}
                  value={selectedTime}
                  onChange={handleSingle}
                />
                <div className="h-5" />
                <FilterChipsGroup
                  title="오후"
                  options={PM_OPTIONS}
                  value={selectedTime}
                  onChange={handleSingle}
                />
              </div>
            </div>

            <div className="flex-shrink-0 border-t border-[#F1F1F1] bg-white px-9 py-4">
              <button
                type="button"
                disabled={!canConfirm}
                onClick={() => {
                  if (!selectedDate || selectedTime.length !== 1) return
                  onConfirm?.({ date: selectedDate, timeRange: selectedTime[0] })
                  onClose()
                }}
                className={[
                  'w-full rounded-xl py-3 text-[14px] font-bold transition',
                  canConfirm
                    ? 'bg-[var(--color-sub-gray-100)] text-white active:scale-[0.99]'
                    : 'bg-[#F2F2F2] text-[#B7B7B7] cursor-not-allowed',
                ].join(' ')}
              >
                선택 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
