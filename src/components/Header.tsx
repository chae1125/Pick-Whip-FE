import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../assets/logo/logo.svg'
import {
  Bell,
  MessageCircle,
  Clock,
  FileText,
  Star,
  Heart,
  Settings,
  LogOut,
  ShoppingBag,
} from 'lucide-react'
import { HamburgerButton } from './HamburgerButton'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isOrderDetail = location.pathname === '/order/detail'

  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const open = () => {
    setIsMounted(true)
    requestAnimationFrame(() => setIsOpen(true))
  }
  const close = () => setIsOpen(false)
  const toggle = () => (isMounted && isOpen ? close() : open())

  useEffect(() => {
    if (isMounted && !isOpen) {
      const t = setTimeout(() => setIsMounted(false), 220)
      return () => clearTimeout(t)
    }
  }, [isOpen, isMounted])

  useEffect(() => {
    if (!isMounted) return
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKeyDown)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prev
    }
  }, [isMounted])

  return (
    <>
      <div className="fixed top-3 right-6 z-[70]">
        <HamburgerButton isOpen={isMounted && isOpen} onToggle={toggle} />
      </div>

      <header
        className={`fixed top-0 left-0 z-[40] flex h-14 w-full items-center justify-between bg-[#FCF4F3] px-6
          ${isHome || isOrderDetail ? 'border-b border-[#F4D3D3]' : ''}
        `}
      >
        <img src={Logo} alt="Pick & Whip" className="site-logo" />
        <div className="flex items-center gap-3">
          <button
            className="rounded-md p-1 text-[#0A0A0A] hover:bg-gray-100"
            aria-label="메시지"
            onClick={() => navigate('/chat')}
          >
            <MessageCircle size={25} />
          </button>
          <button className="rounded-md p-1 text-[#0A0A0A] hover:bg-gray-100" aria-label="알림">
            <Bell size={25} />
          </button>

          <div className="h-8 w-8" aria-hidden="true" />
        </div>
      </header>

      {isMounted && (
        <>
          <div
            className={`fixed inset-0 z-[50] bg-black/40 transition-opacity duration-400 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={close}
            aria-hidden
          />

          <nav
            className={`fixed top-0 right-0 z-[60] h-full w-75 bg-white
            ${isOpen ? 'shadow-2xl' : ''}
            flex flex-col transform-gpu transition-transform duration-400 ease-out will-change-transform
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            aria-label="내비게이션 드로어"
          >
            <div className="flex h-14 items-center justify-between bg-[#F4D3D3] px-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div>
                  <p className="!text-[14px] !text-white">코코아232</p>
                  <p className="!text-[12.5px] !text-white/70">cake_lover@kakao.com</p>
                </div>
              </div>
            </div>

            <ul className="flex flex-col gap-2 p-4">
              <DrawerItem
                icon={<Heart size={18} />}
                title="마이픽"
                desc="찜한 가게 · 디자인"
                onClick={close}
              />
              <DrawerItem
                icon={<Clock size={18} />}
                title="임시저장 주문"
                desc="작성 중인 주문서를 확인하세요"
                badge={3}
                onClick={close}
              />
              <DrawerItem
                icon={<FileText size={18} />}
                title="주문 요청 내역"
                desc="작성한 주문서를 확인하세요"
                badge={2}
                onClick={close}
              />
              <DrawerItem
                icon={<ShoppingBag size={18} />}
                title="주문 완료 내역"
                desc="결제 완료 후 제작 중인 주문 내역을 확인하세요"
                badge={1}
                onClick={close}
              />
              <DrawerItem icon={<Star size={18} />} title="내 리뷰" onClick={close} />
            </ul>

            <div className="border-t !border-[#E5E7EB]">
              <ul className="flex flex-col gap-2 p-4">
                <DrawerItem
                  icon={<Settings size={18} />}
                  title="설정"
                  onClick={() => {
                    close()
                    navigate('/setting')
                  }}
                />
                <DrawerItem icon={<LogOut size={18} />} title="로그아웃" onClick={close} />
              </ul>
            </div>

            <div className="mt-auto border-t !border-[#E5E7EB] px-4 py-4 text-center !font-regular !text-[11px] !text-gray-400">
              픽앤휩 v1.0.0
            </div>
          </nav>
        </>
      )}
    </>
  )
}

function DrawerItem({
  icon,
  title,
  desc,
  badge,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  desc?: string
  badge?: number
  onClick?: () => void
}) {
  return (
    <li>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onClick?.()
        }}
        className={`flex gap-4 px-1 py-2 hover:bg-gray-50 ${desc ? 'items-start' : 'items-center'}`}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate !text-[14px] !text-[#0A0A0A]">{title}</p>
            {badge && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 !font-regular text-[10.5px] text-white">
                {badge}
              </span>
            )}
          </div>
          {desc && <p className="mt-1 !text-[10.5px] !text-[#6A7282]">{desc}</p>}
        </div>
      </a>
    </li>
  )
}

export default Header
