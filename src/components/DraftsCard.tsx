export type Drafts = {
  imageURL: string
  title: string
  size: string
  pickupDate: string
  design: string
  lastSave: string
  progressLabel: string
  progress: number
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
      <div className="w-full h-[335px] rounded-[12px] bg-white pt-4 px-4 py-4">
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

        {/* 진행 상태 */}
        <div className="mt-6 flex items-center justify-between">
          <p className="!text-[12px] !font-normal !text-[var(--color-main-red-200)]">
            {draft.progressLabel}
          </p>
          <p className="!text-[12px] !font-normal !text-[var(--color-main-red-200)]">
            {draft.progress}%
          </p>
        </div>

        {/* 진행도 */}
        <div className="mt-1 h-[9px] w-full overflow-hidden rounded-full bg-[var(--color-main-pink-30)]">
          <div
            className="h-full rounded-full bg-[var(--color-main-red-200)]"
            style={{ width: `${draft.progress}%` }}
          />
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
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 3h6l1 2h4v2H4V5h4l1-2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 9.5V20a1.5 1.5 0 0 0 1.5 1.5h8A1.5 1.5 0 0 0 17.5 20V9.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M10 11.5V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M14 11.5V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
