import { useEffect, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'

interface BottomSheetProps {
  isOpen: boolean
  title?: string
  description?: string
  onClose: () => void
  children: ReactNode
}

const MIN_HEIGHT = 0.7
const MAX_HEIGHT = 1
const CLOSE_HEIGHT_THRESHOLD = 0.6
const CLOSE_VELOCITY = 800

export function BottomSheet({ isOpen, title, description, onClose, children }: BottomSheetProps) {
  const sheetHeight = useMotionValue(window.innerHeight * MIN_HEIGHT)

  const radius = useTransform(sheetHeight, (h) => {
    const ratio = h / window.innerHeight
    return ratio > 0.95 ? 0 : 32 // rounded-t-4xl = 32px
  })

  useEffect(() => {
    if (isOpen) {
      sheetHeight.set(window.innerHeight * MIN_HEIGHT)
    }
  }, [isOpen, sheetHeight])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="
              fixed bottom-0 left-0 right-0 z-50
              flex flex-col
              bg-white
              shadow-[0_-6px_20px_-6px_rgba(0,0,0,0.15)]
            "
            style={{
              height: sheetHeight,
              borderTopLeftRadius: radius,
              borderTopRightRadius: radius,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDrag={(_e, info) => {
              const next = sheetHeight.get() - info.delta.y
              const min = window.innerHeight * MIN_HEIGHT
              const max = window.innerHeight * MAX_HEIGHT

              sheetHeight.set(Math.min(max, Math.max(min * 0.5, next)))
            }}
            onDragEnd={(_e, info) => {
              const currentRatio = sheetHeight.get() / window.innerHeight

              if (currentRatio < CLOSE_HEIGHT_THRESHOLD || info.velocity.y > CLOSE_VELOCITY) {
                onClose()
                return
              }

              const snap =
                currentRatio > 0.85
                  ? window.innerHeight * MAX_HEIGHT
                  : window.innerHeight * MIN_HEIGHT

              sheetHeight.set(snap)
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 34 }}
          >
            <div className="pt-4 px-6">
              <div className="mx-auto mb-3 h-1.5 w-20 rounded-full bg-gray-300" onClick={onClose} />

              <div className="text-black mb-10">
                <h2 className="text-center font-semibold">{title}</h2>
                <p>{description}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-[calc(env(safe-area-inset-bottom)+20px)]">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
