export interface PaymentOrderInfoProps {
  storeName: string
  cakeName: string
  orderNumber: string
  pickupDate: string
}

export function PaymentOrderInfo({
  storeName,
  cakeName,
  orderNumber,
  pickupDate,
}: PaymentOrderInfoProps) {
  return (
    <section>
      {/* 주문 정보 */}
      <h2 className="section-subtitle">주문 정보</h2>
      <div className="bg-white rounded-xl p-5 border border-payment-border">
        <div className="flex justify-between mb-2">
          <span className="text-payment-text-label text-sm">가게</span>
          <span className="text-payment-text-value text-sm">{storeName}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-payment-text-label text-sm ">케이크</span>
          <span className="text-payment-text-value text-sm ">{cakeName}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-payment-text-label text-sm">주문번호</span>
          <span className="text-payment-text-value text-sm">{orderNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-payment-text-label text-sm">픽업일</span>
          <span className="text-payment-text-value text-sm">{pickupDate}</span>
        </div>
      </div>
    </section>
  )
}
