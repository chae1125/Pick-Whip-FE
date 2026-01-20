interface FilterBottomActionsProps {
  onReset: () => void
  onApply: () => void
  applyDisabled?: boolean
}

export function FilterBottomActions({
  onReset,
  onApply,
  applyDisabled = false,
}: FilterBottomActionsProps) {
  return (
    <div className="w-full border-t border-[#E5E7EB] bg-white py-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2.75 rounded-[10px] !border !border-[#D1D5DC] bg-white text-[16px] font-regular text-[#0A0A0A]
           transition-colors duration-150 hover:bg-[#F9FAFB] active:scale-[0.99]"
        >
          초기화
        </button>

        <button
          type="button"
          onClick={onApply}
          disabled={applyDisabled}
          className={`w-full py-2.75 rounded-[10px] text-[16px] font-regular transition-all duration-150 active:scale-[0.99]
            ${
              applyDisabled
                ? 'bg-white text-[#0A0A0A] !border !border-[var(--color-sub-gray-100)] cursor-not-allowed'
                : 'bg-[var(--color-sub-gray-100)] text-white hover:bg-[#3F3B3B]'
            }`}
        >
          적용하기
        </button>
      </div>
    </div>
  )
}

export default FilterBottomActions
