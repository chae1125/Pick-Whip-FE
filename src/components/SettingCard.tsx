import React from 'react'

type SettingCardProps = {
  title: string
  children: React.ReactNode
}

export default function SettingCard({ title, children }: SettingCardProps) {
  return (
    <div className={'rounded-[9px] border bg-white shadow-sm overflow-hidden border-[#E5E7EB]'}>
      <div className="px-4 py-2.5 min-h-[40px] flex items-center text-[12.25px] text-[#0A0A0A]">
        {title}
      </div>
      <div className="h-[0.67px] bg-[#E5E7EB]" />
      {children}
    </div>
  )
}
