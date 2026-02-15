import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import PickUpCalendar from './PickUpCalendar'
import FilterChipsGroup from '../FilterChipsGroup'
import { getShopCalendar, getShopSlots } from '@/apis/calendar'

type ChipOption = { value: string; label: string; disabled?: boolean }

type Props = {
  open: boolean
  onClose: () => void
  shopId?: number
  disablePast?: boolean
  minDate?: Date
  initialMonth?: Date
  onConfirm?: (payload: { date: Date; timeRange: string }) => void
  value?: Date | null
  timeRange?: string | null
}

function toYmd(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function isAM(rangeLabel: string) {
  const hh = Number(rangeLabel.slice(0, 2))
  return Number.isFinite(hh) && hh < 12
}

export default function PickUpDateTimeModal({
  open,
  onClose,
  shopId: shopIdProp,
  disablePast = true,
  minDate,
  initialMonth,
  onConfirm,
  value,
  timeRange,
}: Props) {
  const shopId = shopIdProp ?? 1

  const resetKey = useMemo(
    () => `${shopId}|${value?.toISOString() ?? 'null'}|${timeRange ?? 'null'}`,
    [shopId, value, timeRange],
  )

  if (!open) return null

  return (
    <PickUpDateTimeModalInner
      key={resetKey}
      onClose={onClose}
      shopId={shopId}
      disablePast={disablePast}
      minDate={minDate}
      initialMonth={initialMonth}
      onConfirm={onConfirm}
      value={value}
      timeRange={timeRange}
    />
  )
}

type InnerProps = Omit<Props, 'open' | 'shopId'> & { shopId: number }

function PickUpDateTimeModalInner({
  onClose,
  shopId,
  disablePast = true,
  minDate,
  initialMonth,
  onConfirm,
  value,
  timeRange,
}: InnerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? null)
  const [selectedTime, setSelectedTime] = useState<string[]>(timeRange ? [timeRange] : [])

  const base = initialMonth ?? selectedDate ?? value ?? new Date()
  const [viewYear, setViewYear] = useState(base.getFullYear())
  const [viewMonth, setViewMonth] = useState(base.getMonth() + 1)

  const [closedDateSet, setClosedDateSet] = useState<Set<string>>(new Set())

  const [amOptions, setAmOptions] = useState<ChipOption[]>([])
  const [pmOptions, setPmOptions] = useState<ChipOption[]>([])

  const handleSingle = (next: string[]) => {
    setSelectedTime(next.length ? [next[next.length - 1]] : [])
  }

  useEffect(() => {
    let alive = true
    const run = async () => {
      try {
        const data = await getShopCalendar(shopId, viewYear, viewMonth)
        const set = new Set<string>()
        for (const item of data.result ?? []) {
          if (item.closed) set.add(item.date)
        }
        if (alive) setClosedDateSet(set)

        if (alive && selectedDate && set.has(toYmd(selectedDate))) {
          setSelectedDate(null)
          setSelectedTime([])
        }
      } catch {
        if (alive) setClosedDateSet(new Set())
      }
    }
    run()
    return () => {
      alive = false
    }
  }, [shopId, viewYear, viewMonth, selectedDate])

  useEffect(() => {
    const run = async () => {
      if (!selectedDate) {
        setAmOptions([])
        setPmOptions([])
        return
      }

      if (closedDateSet.has(toYmd(selectedDate))) {
        setAmOptions([])
        setPmOptions([])
        setSelectedTime([])
        return
      }

      try {
        const dateStr = toYmd(selectedDate)
        const data = await getShopSlots(shopId, dateStr)
        const r = data.result
        const nextClosed = !!r.closed

        const mapped: ChipOption[] = (r.slots ?? []).map((s) => ({
          value: s.timeLabel ?? s.time,
          label: s.timeLabel ?? s.time,
          disabled: !s.available || nextClosed,
        }))

        setAmOptions(mapped.filter((o) => isAM(o.value)))
        setPmOptions(mapped.filter((o) => !isAM(o.value)))

        if (selectedTime.length === 1) {
          const cur = selectedTime[0]
          const ok = mapped.some((x) => x.value === cur && !x.disabled)
          if (!ok) setSelectedTime([])
        }
      } catch {
        setAmOptions([])
        setPmOptions([])
        setSelectedTime([])
      }
    }

    run()
  }, [shopId, selectedDate, closedDateSet, selectedTime])

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
                  disabledDateSet={closedDateSet}
                  onViewChange={(y, m) => {
                    setViewYear(y)
                    setViewMonth(m)
                  }}
                />
              </div>

              <div className="px-4 pt-5">
                <FilterChipsGroup
                  title="오전"
                  options={amOptions}
                  value={selectedTime}
                  onChange={handleSingle}
                />
                <div className="h-5" />
                <FilterChipsGroup
                  title="오후"
                  options={pmOptions}
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
