import { CreditCard } from 'lucide-react'
import type { PaymentMethodType } from './PaymentMethodSelector'

import PaycoLogo from '@/assets/payment/payco.svg'
import NaverLogo from '@/assets/payment/naverpay.svg'
import KakaoLogo from '@/assets/payment/kakaopay.svg'
import TossLogo from '@/assets/payment/toss.svg'

interface PaymentBillProps {
  method: PaymentMethodType
  cakePrice: number
  depositAmount: number
  selectedProvider?: string
  onProviderChange?: (provider: string) => void
}

const SIMPLE_PAYMENT_METHODS = [
  {
    id: 'card',
    label: '신용카드',
    icon: <CreditCard className="w-5 h-5 text-payment-icon-dark" />,
  },
  {
    id: 'payco',
    label: '페이코',
    icon: <img src={PaycoLogo} alt="PAYCO" className="h-3" />,
  },
  {
    id: 'naver',
    label: '네이버페이',
    icon: <img src={NaverLogo} alt="NaverPay" className="h-4.5" />,
  },
  {
    id: 'kakao',
    label: '카카오페이',
    icon: <img src={KakaoLogo} alt="KakaoPay" className="h-8" />,
  },
  {
    id: 'toss',
    label: '토스페이',
    icon: <img src={TossLogo} alt="TossPay" className="h-[20px]" />,
  },
]

export function PaymentBill({
  method,
  cakePrice,
  depositAmount,
  selectedProvider = 'card',
  onProviderChange,
}: PaymentBillProps) {
  return (
    <section className="flex flex-col gap-8">
      {/* 결제 금액 정보 */}
      <PaymentAmountInfo method={method} cakePrice={cakePrice} depositAmount={depositAmount} />

      {/* 유의사항 */}
      <PaymentNoticeInfo method={method} />

      {/* 결제 방법 */}
      {method === 'simple' && (
        <SimplePaymentMethodSelector
          selectedProvider={selectedProvider}
          onProviderChange={onProviderChange}
        />
      )}
    </section>
  )
}

function PaymentAmountInfo({
  method,
  cakePrice,
  depositAmount,
}: {
  method: PaymentMethodType
  cakePrice: number
  depositAmount: number
}) {
  const formatPrice = (price: number) => price.toLocaleString() + '원'

  return (
    <div>
      <p className="section-subtitle">결제 금액</p>
      <div className="bg-white rounded-xl p-5 border border-payment-border">
        <div className="flex justify-between">
          <span className="text-payment-text-label text-sm ">케이크 금액</span>
          <span className="text-payment-text-primary text-sm">{formatPrice(cakePrice)}</span>
        </div>

        {method === 'onsite' && (
          <div className="flex justify-between mt-[10px]">
            <span className="text-payment-text-muted text-sm ">선입금</span>
            <span className="text-payment-text-deposit text-sm ">
              - {formatPrice(depositAmount)}
            </span>
          </div>
        )}

        <div className="border-t border-payment-border my-[20px]" />

        <div
          className={`flex justify-between items-center ${method === 'onsite' ? 'mb-[20px]' : ''}`}
        >
          <span
            className={`text-payment-text-primary text-lg ${method === 'onsite' ? 'font-bold' : ''}`}
          >
            {method === 'onsite' ? '지금 결제 금액' : '총 결제 금액'}
          </span>
          <span
            className={`text-payment-text-primary text-lg ${method === 'onsite' ? 'font-bold' : ''}`}
          >
            {method === 'onsite' ? formatPrice(depositAmount) : formatPrice(cakePrice)}
          </span>
        </div>

        {method === 'onsite' && (
          <div className="flex justify-between pt-[20px] border-t border-payment-border">
            <span className="text-payment-text-muted text-sm font-bold">
              픽업 시 현장 결제 (잔금)
            </span>
            <span className="text-payment-text-muted text-sm font-bold">
              {formatPrice(cakePrice - depositAmount)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function PaymentNoticeInfo({ method }: { method: PaymentMethodType }) {
  return (
    <div>
      <div className="bg-payment-notice-bg rounded-xl p-4 border border-payment-notice-border">
        <h3 className="section-subtitle !text-payment-notice-title">유의사항</h3>
        <ul className="space-y-2">
          <li className="text-payment-notice-text text-[13px] leading-relaxed flex items-start gap-1.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-payment-notice-text shrink-0" />
            주문 취소는 픽업 3일 전까지 가능합니다.
          </li>
          <li className="text-payment-notice-text text-[13px] leading-relaxed flex items-start gap-1.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-payment-notice-text shrink-0" />
            취소 시 결제 금액은 3-5일 내 환불됩니다.
          </li>
          {method === 'bank' && (
            <li className="text-payment-notice-text text-[13px] leading-relaxed flex items-start gap-1.5">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-payment-notice-text shrink-0" />
              계좌이체의 경우 입금 확인까지 시간이 소요될 수 있습니다.
            </li>
          )}
          {method === 'onsite' && (
            <>
              <li className="text-payment-notice-text text-[13px] leading-relaxed flex items-start gap-1.5">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-payment-notice-text shrink-0" />
                현장 결제 시 선입금은 환불되지 않으며, 잔금만 현장에서 결제됩니다.
              </li>
              <br />
              <li className="text-payment-notice-text text-[13px] leading-relaxed flex items-start gap-1.5">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-payment-notice-text shrink-0" />
                노쇼 발생 시 선입금은 환불되지 않습니다.
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

function SimplePaymentMethodSelector({
  selectedProvider,
  onProviderChange,
}: {
  selectedProvider?: string
  onProviderChange?: (provider: string) => void
}) {
  return (
    <div className="mb-4">
      <p className="section-subtitle">결제 방법</p>
      <div className="grid grid-cols-2 gap-3">
        {SIMPLE_PAYMENT_METHODS.map((item) => {
          const IsSelected = selectedProvider === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onProviderChange?.(item.id)}
              className={`
                col-span-1 h-12 rounded-xl border flex items-center justify-center gap-2 transition-all
                ${
                  IsSelected
                    ? 'bg-payment-simple-select-bg border-payment-simple-select-border'
                    : 'bg-white border-payment-border hover:bg-gray-50'
                }
              `}
            >
              {item.icon}
              <span
                className={`text-sm font-medium ${IsSelected ? 'text-payment-text-primary' : 'text-payment-text-secondary'}`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
