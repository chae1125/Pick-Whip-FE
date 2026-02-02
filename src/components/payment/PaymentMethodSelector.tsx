import { CreditCard, Building2, Wallet, Copy, AlertTriangle } from 'lucide-react'

export type PaymentMethodType = 'simple' | 'bank' | 'onsite'

interface PaymentMethodSelectorProps {
  method: PaymentMethodType
  onMethodChange: (method: PaymentMethodType) => void
}

const PAYMENT_METHODS = [
  {
    id: 'simple',
    label: '간편결제',
    subLabel: '카카오페이, 토스페이 등',
    icon: <CreditCard className="w-5 h-5 text-payment-text-secondary" />,
  },
  {
    id: 'bank',
    label: '계좌이체',
    subLabel: '입금 확인 후 주문 확정',
    icon: <Building2 className="w-5 h-5 text-payment-text-secondary" />,
  },
  {
    id: 'onsite',
    label: '현장 결제',
    subLabel: '가게에서 결제',
    icon: <Wallet className="w-5 h-5 text-payment-text-secondary" />,
  },
] as const

export function PaymentMethodSelector({ method, onMethodChange }: PaymentMethodSelectorProps) {
  return (
    <section className="flex flex-col gap-8">
      {/* 결제 수단 선택 */}
      <div>
        <h2 className="section-subtitle">결제 수단</h2>
        <div className="flex flex-col gap-3">
          {PAYMENT_METHODS.map((item) => {
            const isSelected = method === item.id
            return (
              <div
                key={item.id}
                onClick={() => onMethodChange(item.id as PaymentMethodType)}
                className={`
                  relative flex items-center p-4 rounded-xl border cursor-pointer transition-all
                  ${
                    isSelected
                      ? 'border-payment-select-border bg-payment-select-bg'
                      : 'border-payment-border bg-white'
                  }
                `}
              >
                <div className="mr-3">{item.icon}</div>
                <div className="flex flex-col">
                  <span
                    className={`text-base ${isSelected ? 'text-payment-text-primary' : 'text-payment-text-secondary'}`}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs text-payment-text-muted">{item.subLabel}</span>
                </div>

                <div className="absolute right-4">
                  <div
                    className={`
                      w-5 h-5 rounded-full border flex items-center justify-center
                      ${isSelected ? 'border-none bg-sub-brown-100' : 'border-payment-radio-border bg-white'}
                    `}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 입금 계좌 정보 */}
      {method === 'bank' && <BankTransferInfo />}

      {/* 현장 결제 안내 */}
      {method === 'onsite' && <OnsitePaymentInfo />}
    </section>
  )
}

function BankTransferInfo() {
  return (
    <div className="animate-fade-in">
      <h2 className="section-subtitle">입금 계좌</h2>
      <div className="bg-payment-bank-bg rounded-xl p-6 border border-payment-bank-border">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center">
            <span className="text-payment-text-muted text-[12px] w-16">은행</span>
            <span className="text-payment-text-primary text-[15px]">카카오뱅크</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-payment-text-muted text-[12px] w-16">계좌번호</span>
              <span className="text-payment-text-primary text-[15px]">3333-12-3456789</span>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 bg-payment-btn-bg text-white px-3 py-1.5 rounded-lg active:bg-payment-btn-hover"
            >
              <Copy size={14} />
              복사
            </button>
          </div>

          <div className="flex items-center">
            <span className="text-payment-text-muted text-[12px] w-16">예금주</span>
            <span className="text-payment-text-primary text-[15px]">스위트드림즈베이커리</span>
          </div>
        </div>

        <div className="border-t border-payment-bank-divider pt-4 flex gap-1.5 items-start">
          <div className="mt-[3px]">
            <AlertTriangle size={15} className="text-payment-icon-alert" />
          </div>
          <span className="text-[14px] text-payment-text-tertiary leading-snug">
            입금자명을 주문자명과 동일하게 입력하여 입금해주세요.
            <br />
            입금 확인 후 주문이 최종 확정됩니다.
          </span>
        </div>
      </div>
    </div>
  )
}

function OnsitePaymentInfo() {
  return (
    <div className="animate-fade-in">
      <p className="section-subtitle">현장 결제 안내</p>
      <div className="bg-payment-bank-bg rounded-xl p-4 border border-payment-bank-border flex items-start gap-3">
        <AlertTriangle
          className="w-5 h-5 text-payment-icon-yellow shrink-0 mt-0.5"
          fill="var(--color-payment-icon-yellow)"
          stroke="white"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-payment-text-yellow mb-1">
            노쇼(No-show) 방지를 위해 선입금이 필요합니다.
          </span>
          <span className="text-xs text-payment-text-yellow">
            선입금 결제 후 잔액은 픽업 시 현장에서 결제하시면 됩니다.
          </span>
        </div>
      </div>
    </div>
  )
}
