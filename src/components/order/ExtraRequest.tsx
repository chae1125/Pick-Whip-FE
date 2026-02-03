export default function ExtraRequest() {
  return (
    <section className="max-w-lg mx-auto mb-4">
      <span className="block pb-3 text-[17px] font-semibold text-[#364153]">추가 요청사항</span>

      <textarea
        placeholder="디자인 수정 관련 이외의 추가 요청사항을 입력해주세요."
        className="w-full rounded-xl bg-white px-4 py-3 text-sm text-[var(--color-sub-gray-100)] outline-none h-24 resize-none"
      />
    </section>
  )
}
