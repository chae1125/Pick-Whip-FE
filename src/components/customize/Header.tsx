import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

type HeaderType = 'default' | 'customize'

interface HeaderProps {
  title: string
  type?: HeaderType // 기본값 default
  onBack?: () => void
}

export default function Header({ title, type = 'default', onBack }: HeaderProps) {
  const navigate = useNavigate()

  const color = type === 'customize' ? '#ba8675' : '#000000'

  const handleBack = () => {
    if (onBack) return onBack()
    return navigate(-1)
  }

  return (
    <header className="flex items-center justify-between p-6 text-sub-brown-100">
      <button onClick={handleBack} aria-label="뒤로 가기">
        <ChevronLeft width={40} height={40} color="#BA8675" />
      </button>

      <div className="flex-1 text-center">
        <span className="text-[20px] font-bold tracking-widest uppercase" style={{ color }}>
          {title}
        </span>
      </div>

      <div className="w-7.5" />
    </header>
  )
}
