// 가격 안내 섹션 내부 흰박스만. SectionCard.tsx에서 조합
export type PriceRow = {
  label: string
  price: string // 추후 number로 수정
}

export default function PriceSection({ prices }: { prices: PriceRow[] }) {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* 흰박스 */}
      <div className="w-full rounded-[10px] bg-white p-3 flex flex-col gap-2">
        {prices.length === 0 ? (
          <p className="!text-[12px] !text-[var(--color-sub-gray-100)]">가격 정보가 없습니다.</p>
        ) : (
          <ul className="space-y-2">
            {prices.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between text-[12px] text-[var(--color-sub-gray-100)]"
              >
                <span>{item.label}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
        )}

        {/* 흰박스 내부 회색 구분선 */}
        <div className="h-[0.67px] bg-[#D1D5DC]" />

        <p className="!text-[12px] !text-[#6A7282]">
          * 디자인 및 토핑에 따라 가격이 변동될 수 있습니다.
        </p>
      </div>

      {/* 흰박스 밑 작은 구분선 */}
      <div className="h-px bg-[#EAEAEA] w-full" />
    </div>
  )
}
