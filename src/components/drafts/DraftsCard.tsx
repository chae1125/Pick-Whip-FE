import DraftsProgressBar, { type ProgressStep } from './DraftsProgressBar'
import { Trash2 } from 'lucide-react'

export type Drafts = {
  imageURL: string
  title: string
  size: string
  pickupDate: string
  design: string
  lastSave: string
  progressLabel: string
  progress: ProgressStep
}

export default function DraftsCard({
  draft,
  onContinue,
  onDelete,
}: {
  draft: Drafts
  onContinue?: () => void
  onDelete?: () => void
}) {
  return (
    <div className="pt-4 pb-4 ">
      <div className="w-full rounded-[12px] bg-white pt-4 px-4 py-4">
        {/* 썸네일 + 제목 */}
        <div className="flex items-start gap-6">
          <div className="h-[70px] overflow-hidden">
            <img
              src={draft.imageURL}
              alt={draft.title}
              className="h-[70px] w-[70px] object-cover rounded-[12px]"
            />
          </div>

          <p className="!mt-5 !text-[16px] !text-[var(--color-sub-gray-100)] !font-bold">
            {draft.title}
          </p>
        </div>
        {/* 왼쪽 */}
        <div className="mt-6 grid grid-cols-2 gap-x-10 gap-y-6">
          <div className="space-y-3">
            <div>
              <p className="!text-[12px] !text-[#6A7282]">사이즈</p>
              <p className="!mt-1 !text-[16px] !font-bold !text-[var(--color-sub-gray-100)]">
                {draft.size}
              </p>
            </div>

            <div>
              <p className="!text-[12px] !text-[#6A7282]">디자인 갤러리</p>
              <p className="!mt-1 !text-[16px] !font-bold !text-[var(--color-sub-gray-100)]">
                {draft.design}
              </p>
            </div>
          </div>

          {/* 오른쪽 */}
          <div className="space-y-3 text-right">
            <div>
              <p className="!text-[12px] !text-[#6A7282]">픽업 날짜</p>
              <p className="!mt-1 !text-[16px] !font-bold !text-[var(--color-sub-gray-100)]">
                {draft.pickupDate}
              </p>
            </div>

            <div>
              <p className="!text-[12px] !text-[#6A7282]">마지막 저장 시간</p>
              <p className="!mt-1 !text-[16px] !font-bold !text-[var(--color-sub-gray-100)]">
                {draft.lastSave}
              </p>
            </div>
          </div>
        </div>

        {/* 진행도 */}
        <div className="mt-8">
          <DraftsProgressBar progressLabel={draft.progressLabel} progress={draft.progress} />
        </div>

        {/* 하단 버튼 */}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={onContinue}
            className="h-[35px] flex-1 rounded-[8.75px] bg-[var(--color-sub-gray-100)] !text-[12.25px] text-white"
          >
            이어서 작성하기
          </button>

          <button
            onClick={onDelete}
            className="
                    h-[35px] w-[35px] rounded-[8.75px]
                    !border-[1px] !border-[#D1D5DC] bg-white
                    flex items-center justify-center
                    text-[#4A5565]
                    transition-colors
                    hover:!border-[#D65151]
                    hover:text-[#D65151]
                    active:!border-[#D65151]
                    active:bg-[#FFD9E370]
                    active:text-[#D65151]
                "
            aria-label="delete draft"
          >
            <Trash2 size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  )
}
