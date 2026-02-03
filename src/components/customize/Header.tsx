import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

type HeaderType = 'default' | 'customize'

interface HeaderProps {
  title: string
  type?: HeaderType // 기본값 default
}

export default function Header({ title, type = 'default' }: HeaderProps) {
  const navigate = useNavigate()

  const color = type === 'customize' ? '#ba8675' : '#000000'

  return (
    <header className="flex items-center justify-between p-6 text-sub-brown-100">
      <button onClick={() => navigate(-1)} aria-label="뒤로 가기">
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
