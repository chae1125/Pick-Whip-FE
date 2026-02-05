export default function Badge({ count, active }: { count: number; active?: boolean }) {
  if (count <= 0) return null

  return (
    <span
      className={`ml-1 inline-flex h-[15px] min-w-[15px] items-center justify-center rounded-[4px] bg-[#EDC6BA] px-1 text-[12px] font-semibold
      ${active ? 'bg-[var(--color-main-pink-200)] text-white' : 'text-[#2A2929]'}`}
    >
      {count}
    </span>
  )
}
