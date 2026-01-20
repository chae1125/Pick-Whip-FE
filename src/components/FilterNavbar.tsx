type FilterTab = {
  key: string
  label: string
}

interface FilterNavbarProps {
  items: FilterTab[]
  activeKey: string
  onChange: (key: string) => void
}

export function FilterNavbar({ items, activeKey, onChange }: FilterNavbarProps) {
  const activeIndex = Math.max(
    0,
    items.findIndex((it) => it.key === activeKey),
  )
  const count = Math.max(1, items.length)

  return (
    <nav className="w-full">
      <div className="relative w-full rounded-[14px] bg-[#FFE1DC] p-1">
        <div
          className="relative grid w-full"
          style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
        >
          <div
            aria-hidden
            className="absolute inset-0 grid"
            style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
          >
            <div
              className="h-full rounded-[14px] bg-white shadow-sm transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
            />
          </div>

          {items.map((item) => {
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onChange(item.key)}
                className="relative z-10 rounded-[14px] py-1 text-center text-base font-medium transition-colors duration-300 ease-out text-[#0A0A0A]"
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default FilterNavbar
