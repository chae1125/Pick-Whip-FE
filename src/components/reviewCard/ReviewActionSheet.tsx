import { BottomSheet } from '../common/BottomSheet'

interface ReviewActionSheetProps {
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

export function ReviewActionSheet({ isOpen, onClose, onEdit, onDelete }: ReviewActionSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-5 pb-8 pt-6 bg-white rounded-t-2xl">
        <div className="overflow-hidden rounded-[14px] bg-review-bg">
          <button
            type="button"
            onClick={onEdit}
            className="w-full py-4 text-[17px] font-medium text-black active:bg-gray-200"
          >
            수정
          </button>
          <div className="h-[0.5px] w-full bg-[#3C3C43]/36" />
          <button
            type="button"
            onClick={onDelete}
            className="w-full py-4 text-[17px] font-medium text-[#FF3B30] active:bg-gray-200"
          >
            삭제
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 w-full rounded-[14px] bg-review-bg py-4 text-[17px] font-semibold text-review-delete active:bg-gray-200"
        >
          취소
        </button>
      </div>
    </BottomSheet>
  )
}
