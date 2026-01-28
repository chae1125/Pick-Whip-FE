import { createPortal } from 'react-dom'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-out"
        onClick={onClose}
        aria-label="Close bottom sheet"
      />
      <div className="relative z-10 w-full max-w-[640px] translate-y-0 transform transition-transform duration-300 ease-out">
        {children}
      </div>
    </div>,
    document.body,
  )
}
