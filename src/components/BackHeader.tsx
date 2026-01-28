import { ChevronLeft } from 'lucide-react'

type BackHeaderProps = {
  title: string
  bgColor?: string

  titleClassName?: string
  iconColor?: string
  iconSize?: number
  height?: string
  onBack?: () => void
}

export default function BackHeader({
  title,
  bgColor = 'bg-white',
  titleClassName = '!text-[21px] !text-[#0A0A0A]',
  iconColor = 'text-[#1E1E1E]',
  iconSize = 25,
  height = 'h-[56px]',
  onBack,
}: BackHeaderProps) {
  return (
    <div className={`relative flex items-center ${height} ${bgColor}`}>
      <button
        type="button"
        aria-label="뒤로가기"
        className="absolute flex items-center justify-center"
        onClick={() => (onBack ? onBack() : window.history.back())}
      >
        <ChevronLeft size={iconSize} className={iconColor} />
      </button>

      <p className={`!absolute left-1/2 !-translate-x-1/2 ${titleClassName}`}>{title}</p>
    </div>
  )
}
