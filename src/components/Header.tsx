import Logo from '../assets/logo/logo.svg'
import { Bell, MessageCircle } from 'lucide-react'
import { HamburgerButton } from './HamburgerButton'

export function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-sub-brown-100 bg-white px-6 py-3">
      <img src={Logo} alt="Pick & Whip" className="site-logo" />

      <div className="flex items-center gap-3">
        <button className="rounded-md p-1 text-black hover:bg-gray-100">
          <MessageCircle size={25} />
        </button>

        <button className="rounded-md p-1 text-black hover:bg-gray-100">
          <Bell size={25} />
        </button>

        <HamburgerButton />
      </div>
    </header>
  )
}

export default Header
