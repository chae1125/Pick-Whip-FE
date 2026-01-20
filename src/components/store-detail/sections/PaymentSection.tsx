import Chip from '../Chip'

export type PaymentMethod = 'CARD' | 'BANK_TRANSFER' | 'NAVER_PAY' | 'KAKAO_PAY' | 'TOSS_PAY'

type PaymentSectionProps = {
  paymentMethods: PaymentMethod[]
}

export default function PaymentSection({ paymentMethods }: PaymentSectionProps) {
  const labels: Record<PaymentMethod, string> = {
    CARD: '카드',
    BANK_TRANSFER: '계좌이체',
    NAVER_PAY: '네이버페이',
    KAKAO_PAY: '카카오페이',
    TOSS_PAY: '토스페이',
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-[10px] bg-white p-3 flex flex-col gap-2">
        <p className="!text-[12px] !text-[var(--color-sub-gray-100)]">가능한 결제 수단:</p>
        {paymentMethods.length === 0 ? (
          <p className="!text-[12px] !text-[var(--color-sub-gray-100)]">
            결제 수단 정보가 없습니다.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((m) => (
              <Chip key={m}>{labels[m]}</Chip>
            ))}
          </div>
        )}

        <p className="!mt-1 !text-[12px] !text-[#6A7282]">
          * 온라인 결제 시 주문 확정 후 3일 이내 취소 가능
        </p>
      </div>
    </div>
  )
}
