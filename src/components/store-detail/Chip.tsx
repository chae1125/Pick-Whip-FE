import React from 'react'

type ChipProps = {
  children: React.ReactNode
  className?: string
}

export default function Chip({ children = '' }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center justify-center h-[24px] px-4 
      rounded-[4px] bg-[#F7E6E6] !text-[12px] !font-normal !text-[var(--color-sub-gray-100)]`}
    >
      {children}
    </span>
  )
}
