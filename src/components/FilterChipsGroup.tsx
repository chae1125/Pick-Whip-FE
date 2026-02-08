import type { ChipOption } from '../types/filter'

interface FilterChipsGroupProps {
  title: string | React.ReactNode
  options: ChipOption[]
  value: string[]
  onChange: (next: string[]) => void
  multiple?: boolean
}

export function FilterChipsGroup({
  title,
  options,
  value,
  onChange,
  multiple = true,
}: FilterChipsGroupProps) {
  const toggle = (opt: ChipOption) => {
    if (opt.disabled) return

    const v = opt.value
    const has = value.includes(v)

    if (!multiple) {
      const next = has ? [] : [v]
      onChange(next)
      return
    }

    const next = has ? value.filter((x) => x !== v) : [...value, v]
    onChange(next)
  }

  return (
    <section className="w-full">
      <h3 className="mb-3 font-regular text-[#0A0A0A] leading-5">{title}</h3>

      <div className="flex flex-wrap gap-x-2 gap-y-3">
        {options.map((opt) => (
          <FilterChip
            key={opt.value}
            label={opt.label}
            selected={value.includes(opt.value)}
            disabled={opt.disabled}
            onClick={() => toggle(opt)}
          />
        ))}
      </div>
    </section>
  )
}

export default FilterChipsGroup

function FilterChip({
  label,
  selected,
  disabled,
  onClick,
}: {
  label: string
  selected: boolean
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full !border px-4 py-1.5 text-center text-[16px] font-semibold whitespace-nowrap transition-colors duration-150
        ${
          disabled
            ? '!border-transparent bg-[#F1F2F4] text-[#C9CED6] cursor-not-allowed'
            : selected
              ? '!border-[var(--color-sub-brown-200)] bg-[var(--color-sub-brown-100)]/40 text-[#8E0B0A]'
              : '!border-[#E5E7EB] bg-white text-[#364153] hover:bg-black/5 active:scale-[0.99]'
        }
      `}
    >
      {label}
    </button>
  )
}
