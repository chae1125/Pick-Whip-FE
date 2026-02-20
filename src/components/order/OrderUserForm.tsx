type OrderUserFormProps = {
  name: string
  phone: string
  onNameChange: (name: string) => void
  onPhoneChange: (phone: string) => void
}

export default function OrderUserForm({
  name,
  phone,
  onNameChange,
  onPhoneChange,
}: OrderUserFormProps) {
  return (
    <section className="max-w-lg mx-auto mb-6 border-b border-[var(--color-main-pink-30)] pb-6">
      <span className="block pb-3 text-[17px] font-semibold text-[#364153]">주문자 정보</span>

      <div className="space-y-4">
        <div>
          <span className="block mb-1 text-[12px] text-[#4A5565]">이름</span>
          <input
            type="text"
            placeholder="이름 입력"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full rounded-xl bg-white px-4 py-2.5 text-sm outline-none"
          />
        </div>
        <div>
          <span className="block mb-1 text-[12px] text-[#4A5565]">연락처</span>
          <input
            placeholder="010-0000-0000"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="w-full rounded-xl bg-white px-4 py-2.5 text-sm outline-none"
          />
        </div>
      </div>
    </section>
  )
}
