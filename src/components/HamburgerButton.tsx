import { useState } from 'react'

type HamburgerButtonProps = {
  isOpen?: boolean
  onToggle?: () => void
}

export function HamburgerButton({ isOpen: controlledIsOpen, onToggle }: HamburgerButtonProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : uncontrolledOpen

  const handleClick = () => {
    if (isControlled) {
      onToggle?.()
    } else {
      setUncontrolledOpen((prev) => {
        const next = !prev
        onToggle?.()
        return next
      })
    }
  }

  const lineColor = isOpen ? 'bg-white' : 'bg-gray-800'

  return (
    <button
      onClick={handleClick}
      aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
      aria-expanded={isOpen}
      className="relative flex h-8 w-8 flex-col items-center justify-center"
    >
      <span
        className={`absolute h-0.5 w-5 ${lineColor} rounded-xl transition-all duration-300
          ${isOpen ? 'rotate-45' : '-translate-y-1.5'}
        `}
      />

      <span
        className={`absolute h-0.5 w-5 ${lineColor} rounded-xl transition-all duration-300
          ${isOpen ? 'opacity-0' : 'opacity-100'}
        `}
      />

      <span
        className={`absolute h-0.5 w-5 ${lineColor} rounded-xl transition-all duration-300
          ${isOpen ? '-rotate-45' : 'translate-y-1.5'}
        `}
      />
    </button>
  )
}
