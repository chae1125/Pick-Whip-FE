import { Clock } from 'lucide-react'

export default function DraftsNoticeBanner() {
  return (
    <section className="w-full mt-2">
      <div className="w-full overflow-hidden bg-[#E9D3CE] flex">
        <div className="w-[4px] bg-[#BA8675]" />

        <div className="flex gap-3 px-4 py-4">
          <Clock size={18} className="text-[#5D3A2E]" />
          <div className="flex flex-col gap-1 text-[#5D3A2E]">
            <p className="!text-[13px] !leading-[16px] !font-semibold">임시저장 안내</p>
            <p className="!mt-1 !text-[11px] opacity-90">작성 중인 주문서가 자동으로 저장됩니다.</p>
            <div className="flex items-center gap-1 ">
              <p className="!font-semibold !text-[11px] opacity-90">30일 후</p>
              <p className="!text-[11px] opacity-90">자동 삭제되니 참고해주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
