type OrderProduct = {
  imageUrl: string
  options: {
    label: string
    value: string
  }[]
}

const dummyOrderProduct: OrderProduct = {
  imageUrl:
    'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=1000&auto=format&fit=crop',
  options: [
    { label: '디자인', value: '1호 원형' },
    { label: '맛', value: '초코 시트 + 생크림' },
    { label: '레터링', value: '메리 크리스마스' },
    { label: '데코', value: '오레오' },
    { label: '추가요청', value: '크리스마스 토퍼' },
  ],
}

export default function OrderInfo() {
  const order = dummyOrderProduct

  return (
    <section className="max-w-lg mx-auto pt-4 mb-6 border-b border-[var(--color-main-pink-30)] pb-6">
      <span className="block pb-3 text-[17px] font-semibold text-[#364153]">주문 상품</span>

      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=1000&auto=format&fit=crop"
            alt="케이크 이미지"
            className="h-25 w-25 rounded-[11px] object-cover"
          />

          <button className="!text-[13px] text-[#000000] underline">프리뷰 보기</button>
        </div>

        <div className="text-[14px] text-[#2A2929] leading-6">
          {order.options.map((opt) => (
            <p key={opt.label}>
              <span className="!font-medium">{opt.label}</span> :{' '}
              <span className="font-regular">{opt.value}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
