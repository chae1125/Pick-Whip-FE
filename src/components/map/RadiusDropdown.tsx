import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface RadiusDropdownProps {
  value: number
  options: number[]
  onChange: (value: number) => void
}

export default function RadiusDropdown({ value, options, onChange }: RadiusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const formatLabel = (meter: number) => {
    if (meter >= 1000) return `${meter / 1000}km`
    return `${meter}m`
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative text-sm" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1.5 rounded-full px-4 py-2 transition-all shadow-sm border
          ${
            isOpen
              ? 'bg-gray-100 border-gray-300 text-gray-900'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }
        `}
      >
        <span className="font-semibold text-[13px] whitespace-nowrap">
          반경 {formatLabel(value)}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-full mt-2 w-full min-w-[100px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-100 z-50">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                className={`
                  w-full px-4 py-2.5 text-left text-[13px] transition-colors
                  ${
                    option === value
                      ? 'bg-[#FE577A] text-white font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                {formatLabel(option)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
