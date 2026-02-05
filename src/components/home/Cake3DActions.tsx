import { useState } from 'react'
import { Heart, ChevronDown, ChevronUp, MapPin } from 'lucide-react'

type CakeDetailOption = { label: string; value: string } | { label: string; value: string[] }

type Cake3DActionsProps = {
  shopName: string
  cakeName: string
  options: CakeDetailOption[]
  onToggleMyPick?: () => void
}

export default function Cake3DActions({
  shopName,
  cakeName,
  options,
  onToggleMyPick,
}: Cake3DActionsProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-auto mt-6 flex w-[70%] flex-col gap-3 px-4">
      <button
        type="button"
        onClick={onToggleMyPick}
        className="flex h-[38px] w-full items-center justify-center gap-4 rounded-full bg-white
                   text-[var(--color-sub-gray-100)] shadow-[0_10px_24px_rgba(0,0,0,0.10)]
                   active:scale-[0.99] transition"
      >
        <span className="tracking-[-0.5px]">마이픽에 찜하기</span>
        <Heart size={20} className="stroke-[var(--color-sub-gray-100)]" />
      </button>

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-[38px] w-full items-center justify-center gap-6 rounded-full
                     border border-[var(--color-sub-brown-200)] bg-[#F6E0DB]
                     text-[var(--color-sub-gray-100)] active:scale-[0.99] transition"
        >
          <span className="tracking-[-0.5px]">자세히 보기</span>
          <ChevronDown size={20} className="stroke-[var(--color-sub-brown-200)]" />
        </button>
      )}

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="mt-1 rounded-[20px] border border-[var(--color-sub-brown-200)] bg-[#F6E0DB] px-4 py-4 text-[14px] text-[var(--color-sub-gray-100)]">
          <div className="mb-3 flex items-center justify-center gap-1 font-semibold">
            <MapPin size={16} className="text-[var(--color-sub-gray-100)]" />
            <span>{shopName}</span>
          </div>

          <p className="!mb-4 text-center font-bold">
            <span className="inline-block border-t-[1.5px] border-b-[1.5px] border-[var(--color-sub-brown-100)] px-2 py-1.5">
              {cakeName}
            </span>
          </p>

          <ul className="inline-flex flex-col space-y-2 mx-auto">
            {options.map((opt) => (
              <li key={opt.label} className="flex gap-4">
                <span className="w-[50px] text-left flex-shrink-0 font-semibold">{opt.label}</span>
                <span className="flex-1 text-left whitespace-pre-line">
                  {Array.isArray(opt.value)
                    ? opt.value.map((line, idx) => (
                        <span key={idx} className="block text-left">
                          {line}
                        </span>
                      ))
                    : opt.value}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t-[0.5px] border-[var(--color-sub-brown-200)]" />

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 flex w-full items-center justify-center gap-2 !font-semibold
                       text-[var(--color-sub-gray-100)] !text-[16px] active:scale-[0.99] transition"
          >
            자세히 보기
            <ChevronUp size={20} className="stroke-[var(--color-sub-brown-200)]" />
          </button>
        </div>
      </div>
    </div>
  )
}
