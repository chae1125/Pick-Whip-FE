import React from 'react'

type SectionCardProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <section className="w-full pt-4">
      <div className="w-full flex items-baseline justify-between gap-2 mb-3">
        <div className="flex items-baseline gap-2">
          <div className="!text-[14px] !font-bold text-[#2A2929]">{title}</div>

          {subtitle ? <span className="text-[10px] text-[#2A2929]">{subtitle}</span> : null}
        </div>
      </div>

      <div className="w-full">{children}</div>
      <div className="mt-4 -mx-4 h-[2px] bg-[#EAEAEA]" />
    </section>
  )
}
