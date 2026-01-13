import { useState } from 'react'

type HamburgerButtonProps = {
  onClick?: () => void
}

export function HamburgerButton({ onClick }: HamburgerButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen((prev) => !prev)
    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      aria-label="메뉴 열기"
      aria-expanded={isOpen}
      className="relative flex h-8 w-8 flex-col items-center justify-center"
    >
      <span
        className={`absolute h-0.5 w-5 bg-gray-800 transition-all duration-300
          ${isOpen ? 'rotate-45' : '-translate-y-1.5'}
        `}
      />

      <span
        className={`absolute h-0.5 w-5 bg-gray-800 transition-all duration-300
          ${isOpen ? 'opacity-0' : 'opacity-100'}
        `}
      />

      <span
        className={`absolute h-0.5 w-5 bg-gray-800 transition-all duration-300
          ${isOpen ? '-rotate-45' : 'translate-y-1.5'}
        `}
      />
    </button>
  )
}
