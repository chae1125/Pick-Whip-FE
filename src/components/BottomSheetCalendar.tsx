import { useMemo, useState } from 'react'
import PickUpCalendar from './PickUpCalendar'
import FilterBottomActions from './FilterBottomActions'
import { BottomSheet } from './BottomSheet'

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

type BottomSheetCalendarProps = {
  open: boolean
  onClose: () => void
  value: Date | null
  onChange: (d: Date) => void
  disablePast?: boolean
}

export default function BottomSheetCalendar({
  open,
  onClose,
  value,
  onChange,
  disablePast = true,
}: BottomSheetCalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const minDate = today

  const [tempDate, setTempDate] = useState<Date | null>(value ?? today)

  const handleApply = () => {
    if (!tempDate) return
    if (disablePast && startOfDay(tempDate).getTime() < minDate.getTime()) return
    onChange(startOfDay(tempDate))
    onClose()
  }

  const applyDisabled =
    !tempDate || (disablePast && startOfDay(tempDate).getTime() < minDate.getTime())

  return (
    <BottomSheet isOpen={open} onClose={onClose}>
      <div className="flex h-full flex-col">
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-lg">
            <PickUpCalendar
              value={tempDate}
              onChange={setTempDate}
              disablePast={disablePast}
              minDate={minDate}
            />
          </div>
        </div>

        <div className="sticky bottom-0 left-0 right-0">
          <div className="px-3">
            <FilterBottomActions
              onReset={() => setTempDate(today)}
              onApply={handleApply}
              applyDisabled={applyDisabled}
            />
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}
