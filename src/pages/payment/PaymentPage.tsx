import { useState } from 'react'
import BackHeader from '@/components/BackHeader'
import { PaymentOrderInfo } from '@/components/payment/PaymentOrderInfo'
import {
  PaymentMethodSelector,
  type PaymentMethodType,
} from '@/components/payment/PaymentMethodSelector'
import { PaymentBill } from '@/components/payment/PaymentBill'

export default function PaymentPage() {
  const [method, setMethod] = useState<PaymentMethodType>('simple')

  const [selectedProvider, setSelectedProvider] = useState<string>('card')

  // 임시 데이터
  const orderData = {
    storeName: '스위트 드림즈 베이커리',
    cakeName: '생일 레터링 케이크',
    orderNumber: 'ABC1234XY',
    pickupDate: '2025-01-05',
    cakePrice: 85000,
  }

  const depositAmount = 30000

  const getButtonText = () => {
    switch (method) {
      case 'simple':
        return `${orderData.cakePrice.toLocaleString()}원 결제하기`
      case 'bank':
        return '입금을 완료했어요'
      case 'onsite':
        return `선입금 ${depositAmount.toLocaleString()}원 결제하기`
    }
  }

  return (
    <div className="min-h-screen bg-payment-bg relative">
      <div className="sticky top-0 z-50">
        <BackHeader title="결제하기" bgColor="bg-payment-bg" />
      </div>

      <div className="px-4 py-4 max-w-xl mx-auto flex flex-col gap-8">
        {/* 주문 정보 */}
        <PaymentOrderInfo
          storeName={orderData.storeName}
          cakeName={orderData.cakeName}
          orderNumber={orderData.orderNumber}
          pickupDate={orderData.pickupDate}
        />

        {/* 결제 수단 */}
        <PaymentMethodSelector method={method} onMethodChange={setMethod} />

        {/* 결제 금액, 유의사항 */}
        <PaymentBill
          method={method}
          cakePrice={orderData.cakePrice}
          depositAmount={depositAmount}
          selectedProvider={selectedProvider}
          onProviderChange={setSelectedProvider}
        />

        {/* 결제 버튼 */}
        <div className="mt-4 pt-4 border-t-2 border-payment-border-strong">
          <button
            className="w-full bg-payment-btn-bg text-white font-bold h-14 rounded-xl text-lg hover:bg-payment-btn-hover transition-colors"
            onClick={() => alert(`${method} 결제 시도`)}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  )
}
