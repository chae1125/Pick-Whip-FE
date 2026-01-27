import { Calendar, Clock, CircleCheckBig, CircleX, CircleAlert } from 'lucide-react'

type KVRow = { label: string; value: string | string[] }

export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'READY' | 'COMPLETED'

export type ProgressStep = {
  key: 'CREATED' | 'OWNER_CHECKED' | 'APPROVED' | 'REJECTED'
  title: string
  at?: string
}

export type OrderItem = {
  imageUrl: string
  rows: KVRow[]
}

export type OrderDetail = {
  id: number
  shopLabel?: string
  shopName: string
  productName: string
  pickupDate: string
  pickupTime: string
  orderCode: string
  items: OrderItem[]
  status: OrderStatus
  progress?: ProgressStep[]
  rejectMessage?: string
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <span className="inline-block border-t border-b border-[#F4D3D3] bg-white px-4 py-1 text-[11px] font-medium text-[#2A2929]">
        {children}
      </span>
    </div>
  )
}

function DashDivider() {
  return <div className="my-6 border-t border-dashed border-[#e7e1e1]" />
}

function OrderAfterSection({ order }: { order: OrderDetail }) {
  if (order.status === 'PENDING') {
    return (
      <>
        <div className="mx-auto w-fit">
          <div className="text-center text-[14px] font-medium text-[#2A2929]">
            주문 이후 어떻게 진행되나요?
          </div>

          <ul className="mt-4 space-y-1 text-[11px] leading-5 text-[#4A4A4A]">
            <li className="flex gap-2">
              <span className="mt-[10px] h-[4px] w-[4px] rounded-full bg-[#4A4A4A]" />
              <span className="flex-1">주문하신 케이크 디자인은 24시간 이내에 확인됩니다.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[10px] h-[4px] w-[4px] rounded-full bg-[#4A4A4A]" />
              <span className="flex-1">
                확인이 완료되면 주문내역에서 가격과 제작 가능 여부, 조율할 세부 디테일 항목을 확인할
                수 있습니다.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[10px] h-[4px] w-[4px] rounded-full bg-[#4A4A4A]" />
              <span className="flex-1">픽업 전 결제가 완료되어야 예약이 확정됩니다.</span>
            </li>
          </ul>
        </div>
      </>
    )
  }

  if (order.status === 'REJECTED') {
    return (
      <>
        <div className="mx-auto w-fit">
          <div className="text-center">
            <div className="inline-block border-b border-black/60 px-1 pb-[2px] text-[12px] font-semibold text-[#3b3b3b]">
              진행 상황
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <div className="relative flex w-10 justify-center">
              <div className="absolute top-2 bottom-2 w-[3px] rounded bg-[#d8d8d8]" />
              <div className="relative flex flex-col items-center gap-8">
                <StepIcon type="done" />
                <StepIcon type="done" />
                <StepIcon type="fail" />
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <StepText title="주문서 작성" at={order.progress?.[0]?.at ?? ''} />
              <StepText title="사장님 확인" at={order.progress?.[1]?.at ?? ''} />
              <StepText title="제작 불가" at={order.progress?.[2]?.at ?? ''} isFail />
            </div>
          </div>
        </div>
        <DashDivider />
        <div className="mx-auto w-fit">
          <div className="mt-8 flex items-start gap-2 text-center text-[12px] font-regular text-[#2A2929]">
            <span className="text-[12px]">💬</span>
            <span>
              다른 날짜나 옵션으로 변경 가능하다면
              <br />
              사장님과 채팅으로 상담해보세요!
            </span>
          </div>
        </div>
      </>
    )
  }

  // 승인 등 다른 상태는 나중에 확장하겠습니다!
  return null
}

function StepIcon({ type }: { type: 'done' | 'fail' }) {
  if (type === 'done') {
    return (
      <div className="grid h-5 w-5 place-items-center rounded-full bg-[#FDF4EB]">
        <CircleCheckBig size={14} className="text-[#1CB324]" />
      </div>
    )
  }
  return (
    <div className="grid h-5 w-5 place-items-center rounded-full bg-[#D65151]">
      <CircleX size={14} className="text-white" />
    </div>
  )
}

function StepText({ title, at, isFail }: { title: string; at?: string; isFail?: boolean }) {
  return (
    <div>
      <div className={`text-[12px] font-medium ${isFail ? 'text-[#A20908]' : 'text-[#0A0A0A]'}`}>
        {title}
      </div>
      <div className="mt-1 text-[12px] font-regular text-[#6A7282]">{at}</div>
    </div>
  )
}

function RejectedHeader({ message }: { message?: string }) {
  return (
    <div className="text-center">
      <div className="text-[16px] font-semibold text-[#2A2929] pb-4">제작이 어려워요</div>

      <SectionTitle>사장님 메시지</SectionTitle>

      <div className="mt-3 flex justify-center">
        <CircleAlert size={20} className="text-[#D65151]" />
      </div>

      <p className="!mt-3 whitespace-pre-line !text-[11px] leading-4 !text-[#57504F]">
        {message ??
          '해당 날짜에 예약이 마감되어 제작이 어렵습니다.\n날짜 변경을 원하시는 경우 채팅으로 문의 부탁드립니다.'}
      </p>
    </div>
  )
}

export default function OrderDetailsCard({ order }: { order: OrderDetail }) {
  const { shopName, productName, pickupDate, pickupTime, orderCode, items } = order

  return (
    <div className="px-6 pt-10 pb-8">
      {order.status === 'REJECTED' ? (
        <RejectedHeader message={order.rejectMessage} />
      ) : (
        <>
          <h2 className="text-center !text-[15px] !font-semibold text-[#2A2929]">
            주문서가 완료되었어요!
          </h2>

          <p className="!mt-6 text-center !text-[11px] leading-5 text-[#57504F]">
            주문서는 사장님께 즉시 전달됩니다.
            <br />
            <span className="font-bold">마이페이지 &gt; 주문 요청 내역</span> 에서 주문 현황을
            확인하세요.
          </p>
        </>
      )}

      <DashDivider />

      <div className="text-center">
        <SectionTitle>케이크샵</SectionTitle>

        <div className="mt-4 text-[15px] font-semibold text-[#222]">{shopName}</div>
        <div className="mt-1 text-[12px] font-normal text-black/35">{productName}</div>
      </div>

      <DashDivider />

      <div className="mx-auto w-fit">
        <SectionTitle>픽업 정보</SectionTitle>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#FDF4EB]">
              <Calendar size={16} className="text-[#494949]" />
            </div>
            <div className="text-[13px] font-medium text-[#2b2b2b]">{pickupDate}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#FDF4EB]">
              <Clock size={16} className="text-[#494949]" />
            </div>
            <div className="text-[13px] font-medium text-[#2b2b2b]">{pickupTime}</div>
          </div>
        </div>
      </div>

      <DashDivider />

      <SectionTitle>주문 상품</SectionTitle>

      <div className="mt-5">
        {items.map((it, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="flex w-[78px] flex-col items-center">
              <img src={it.imageUrl} alt="" className="h-[78px] w-[78px] rounded-lg object-cover" />

              <button className="mt-2 !text-[11px] font-semibold text-black underline underline-offset-3">
                프리뷰 보기
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <div className="space-y-[5px] text-[12px]">
                {it.rows.map((r, i) => (
                  <div key={i} className="grid grid-cols-[44px_1fr] gap-2">
                    <div className="font-medium text-[#2A2929]">{r.label}</div>
                    <div className="font-regular text-[#2A2929] space-y-[2px]">
                      {Array.isArray(r.value) ? (
                        r.value.map((v, idx) => (
                          <div key={idx} className="leading-5">
                            {v}
                          </div>
                        ))
                      ) : (
                        <div className="leading-5">{r.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <DashDivider />

      <SectionTitle>주문 코드</SectionTitle>

      <div className="mt-4 text-center">
        <div className="text-[16px] font-medium tracking-wide text-[#2A2929]">{orderCode}</div>
        <p className="!mt-2 !text-[12px] text-[#57504F]">
          주문 내역에서 주문 코드로 주문 현황을 확인하세요
        </p>
      </div>

      <DashDivider />

      <OrderAfterSection order={order} />
    </div>
  )
}
