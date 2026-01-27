import React from 'react'
import { ChevronRight } from 'lucide-react'

type SettingButtonProps = {
  icon: React.ReactNode
  title: string
  onClick?: () => void
}

export default function SettingButton({ icon, title, onClick }: SettingButtonProps) {
  return (
    <button
      type="button"
      className="w-full px-4 py-3 min-h-[49px] flex items-center justify-between"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <p className="!text-[14px] !text-[#0A0A0A]">{title}</p>
      </div>
      <ChevronRight size={18} className="text-[#99A1AF]" />
    </button>
  )
}
