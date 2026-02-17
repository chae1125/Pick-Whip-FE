import { MessageCircle } from 'lucide-react'

type CustomizeCtaBarProps = {
  title?: string
  buttonText?: string
  onClick?: () => void

  className?: string
  visible?: boolean
}

export default function CustomizeCtaBar({
  title = '나만의 케이크를 처음부터 만들어볼까요?',
  buttonText = '직접 커스터마이징 시작하기',
  onClick,
  className = '',
  visible = true,
}: CustomizeCtaBarProps) {
  if (!visible) return null

  return (
    <div
      className={[
        'fixed left-0 right-0 bottom-0 z-20',
        'bg-white backdrop-blur',
        'border-t-[2px] border-[#F5F5F5] h-[123px] flex items-center justify-center',
        className,
      ].join(' ')}
    >
      <div className="mx-auto w-full max-w-[720px] px-4 py-3">
        <p className="text-center text-[15px] text-[#000000] font-medium">{title}</p>

        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            aria-label="문의/채팅"
            onClick={() => console.log('icon click')}
            className="h-[45px] w-[45px] shrink-0 flex items-center justify-center rounded-[10px] border-[2px] border-[#CC9483] bg-white"
          >
            <MessageCircle className="h-[22px] w-[22px] text-[#CC9483] fill-[#CC9483]" />
          </button>

          <button
            type="button"
            onClick={onClick}
            className={[
              'h-[45px] flex-1 rounded-[10px]',
              'bg-[#D65151] text-white !font-bold text-[15px]',
              'flex items-center justify-center',
            ].join(' ')}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}
