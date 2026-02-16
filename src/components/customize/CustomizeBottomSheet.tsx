import { motion } from 'framer-motion'
import FilterNavbar from '@/components/FilterNavbar'
import type { ReactNode } from 'react'

type NavItem = { key: string; label: string }

interface CustomizeBottomSheetProps {
  mode: 'MENU' | 'DIRECT' | string
  isSheetOpen: boolean
  setIsSheetOpen: (v: boolean) => void
  cakeNameFromState?: string
  navItems: NavItem[]
  currentTab: string
  setCurrentTab: (k: string) => void
  children?: ReactNode
}

export default function CustomizeBottomSheet(props: CustomizeBottomSheetProps) {
  const {
    mode,
    isSheetOpen,
    setIsSheetOpen,
    cakeNameFromState,
    navItems,
    currentTab,
    setCurrentTab,
    children,
  } = props

  return (
    <motion.div
      initial={false}
      animate={{ y: isSheetOpen ? 50 : 270 }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      className="absolute bottom-0 left-0 right-0 h-[63vh] bg-[#FAF7F5] rounded-t-[45px] z-50 flex flex-col"
    >
      <button
        onClick={() => setIsSheetOpen(!isSheetOpen)}
        className="w-full flex justify-center pt-5 pb-3 group"
      >
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-15 h-15 bg-chat-bg rounded-full flex items-center justify-center">
          <motion.svg
            animate={{ rotate: isSheetOpen ? 180 : 0 }}
            width="45"
            height="45"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M6 14L12 8L18 14"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      </button>

      <div className="px-7 flex flex-col h-full overflow-hidden">
        {mode === 'MENU' && (
          <div className="text-center mb-6">
            <h2 className="text-[19px] text-[#1E2939] font-bold">
              {cakeNameFromState ?? '크리스마스 파티 케이크'}
            </h2>
          </div>
        )}

        <>
          <FilterNavbar
            items={navItems}
            activeKey={currentTab}
            onChange={(k: string) => setCurrentTab(k)}
          />
          <hr className="border border-[#F4D3D3] my-4" />
        </>

        <div className="flex-1 overflow-y-auto pb-27 scrollbar-hide">{children}</div>
      </div>
    </motion.div>
  )
}
