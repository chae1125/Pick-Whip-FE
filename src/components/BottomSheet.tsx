import { useEffect, useState, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'

interface BottomSheetChildState {
  isFull: boolean
  ratio: number
  isPeek: boolean
}

interface BottomSheetProps {
  isOpen: boolean
  title?: string
  description?: string
  onClose: () => void
  children: ReactNode | ((state: BottomSheetChildState) => ReactNode)
  sheetBg?: string
  allowPeek?: boolean
  openRatio?: number
}

const PEEK_RATIO = 0.12
const INITIAL_RATIO = 0.5
const FULL_RATIO = 0.95
const MAX_HEIGHT = 1
const CLOSE_VELOCITY = 800

export function BottomSheet({
  isOpen,
  title,
  description,
  onClose,
  children,
  sheetBg,
  allowPeek = true,
  openRatio,
}: BottomSheetProps) {
  const sheetHeight = useMotionValue(window.innerHeight * PEEK_RATIO)
  const [isFull, setIsFull] = useState(false)
  const [isPeek, setIsPeek] = useState(true)
  const prevOpenRatio = useRef<number | undefined>(undefined)

  const radius = useTransform(sheetHeight, (h) => {
    const ratio = h / window.innerHeight
    return ratio > 0.95 ? 0 : 32
  })

  useEffect(() => {
    if (isOpen) {
      const targetRatio = typeof openRatio === 'number' ? openRatio : INITIAL_RATIO

      sheetHeight.set(window.innerHeight * targetRatio)

      setIsPeek(targetRatio <= PEEK_RATIO + 0.01)
      setIsFull(targetRatio > FULL_RATIO)
    }

    prevOpenRatio.current = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    if (typeof openRatio === 'number') {
      prevOpenRatio.current = openRatio
      if (isOpen) {
        sheetHeight.set(window.innerHeight * openRatio)
        setIsPeek(openRatio <= PEEK_RATIO + 0.01)
        setIsFull(openRatio > FULL_RATIO)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRatio])

  useEffect(() => {
    const ratio = sheetHeight.get() / window.innerHeight
    setIsFull(ratio > FULL_RATIO)
    setIsPeek(ratio <= PEEK_RATIO + 0.01)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: !isPeek ? 1 : 0 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isPeek) {
                if (allowPeek) {
                  const snapToPeek = window.innerHeight * PEEK_RATIO
                  sheetHeight.set(snapToPeek)
                  setIsPeek(true)
                  setIsFull(false)
                } else {
                  onClose()
                }
              }
            }}
            style={{ pointerEvents: !isPeek ? 'auto' : 'none' }}
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
              backgroundColor: sheetBg,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDrag={(_e, info) => {
              const next = sheetHeight.get() - info.delta.y
              const min = allowPeek ? window.innerHeight * PEEK_RATIO : 0
              const max = window.innerHeight * MAX_HEIGHT

              sheetHeight.set(Math.min(max, Math.max(min, next)))
              const ratio = sheetHeight.get() / window.innerHeight
              setIsFull(ratio > FULL_RATIO)
              setIsPeek(ratio <= PEEK_RATIO + 0.01)
            }}
            onDragEnd={(_e, info) => {
              const currentRatio = sheetHeight.get() / window.innerHeight

              if (info.velocity.y > CLOSE_VELOCITY) {
                if (allowPeek) {
                  const snapToPeek = window.innerHeight * PEEK_RATIO
                  sheetHeight.set(snapToPeek)
                  setIsFull(false)
                  setIsPeek(true)
                } else {
                  onClose()
                }
                return
              }

              const midPeekInitial = (PEEK_RATIO + INITIAL_RATIO) / 2
              const midInitialFull = (INITIAL_RATIO + FULL_RATIO) / 2

              let snapTarget = INITIAL_RATIO
              if (currentRatio <= midPeekInitial) snapTarget = PEEK_RATIO
              else if (currentRatio >= midInitialFull) snapTarget = MAX_HEIGHT

              if (!allowPeek && snapTarget === PEEK_RATIO) {
                onClose()
                return
              }

              const snapPx = window.innerHeight * snapTarget
              sheetHeight.set(snapPx)
              setIsFull(snapTarget === MAX_HEIGHT)
              setIsPeek(snapTarget === PEEK_RATIO)
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 34 }}
          >
            <div className="pt-4 px-6">
              <div
                className="mx-auto mb-3 h-1.5 w-20 rounded-full bg-gray-300"
                onClick={() => {
                  if (isPeek) {
                    const px = window.innerHeight * INITIAL_RATIO
                    sheetHeight.set(px)
                    setIsPeek(false)
                    setIsFull(false)
                  } else if (isFull) {
                    const px = window.innerHeight * INITIAL_RATIO
                    sheetHeight.set(px)
                    setIsFull(false)
                    setIsPeek(false)
                  } else {
                    const px = window.innerHeight * MAX_HEIGHT
                    sheetHeight.set(px)
                    setIsFull(true)
                    setIsPeek(false)
                  }
                }}
              />

              {!isPeek && (
                <div className="text-black mb-5">
                  <h2 className="text-center font-semibold">{title}</h2>
                  <p>{description}</p>
                </div>
              )}
            </div>

            {!isPeek ? (
              <div className="flex-1 overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom)+10px)]">
                {typeof children === 'function'
                  ? children({ isFull, ratio: sheetHeight.get() / window.innerHeight, isPeek })
                  : children}
              </div>
            ) : (
              <div className="h-0" />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
