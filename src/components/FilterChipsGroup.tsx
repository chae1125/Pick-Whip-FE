type ChipOption = {
  value: string
  label: string
}

interface FilterChipsGroupProps {
  title: string
  options: ChipOption[]
  value: string[]
  onChange: (next: string[]) => void
}

export function FilterChipsGroup({ title, options, value, onChange }: FilterChipsGroupProps) {
  const toggle = (v: string) => {
    const has = value.includes(v)
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
            onClick={() => toggle(opt.value)}
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
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full !border px-4 py-1.5 text-center text-[16px] font-semibold whitespace-nowrap transition-colors duration-150
        ${
          selected
            ? '!border-[var(--color-sub-brown-200)] bg-[var(--color-sub-brown-100)]/40 text-[#8E0B0A]'
            : '!border-[#E5E7EB] bg-white text-[#364153]'
        }
      `}
    >
      {label}
    </button>
  )
}
