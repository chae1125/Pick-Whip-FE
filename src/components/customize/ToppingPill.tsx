export interface ToppingItem {
  id: number
  label: string
  additionalPrice?: number
}

interface ToppingPillProps {
  t: ToppingItem
  active: boolean
  onClick: (id: number) => void
}

export default function ToppingPill({ t, active, onClick }: ToppingPillProps) {
  return (
    <button
      onClick={() => onClick(t.id)}
      className={`px-4 py-2 rounded-full border transition-all flex items-center gap-2 ${
        active ? 'bg-[#FFF2EF] border-[#FF9980]' : 'bg-white border-[#EAEAEA]'
      }`}
    >
      <span className="text-sm font-medium">{t.label}</span>
      {t.additionalPrice && t.additionalPrice > 0 && (
        <span className="text-xs text-[#666]">+₩{t.additionalPrice.toLocaleString()}</span>
      )}
    </button>
  )
}
