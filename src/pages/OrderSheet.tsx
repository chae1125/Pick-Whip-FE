import { /* useEffect */ useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
import OrderDetailsCard, { type OrderDetail } from '../components/OrderDetailsCard'
import letter from '../assets/img/letter.png'
import { MessageCircle, CircleX, CircleCheckBig } from 'lucide-react'

function StatusIcon({ status }: { status: OrderDetail['status'] }) {
  if (status === 'PENDING' || status === 'ACCEPTED') {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-full bg-[#FDF4EB] shadow-md">
        <CircleCheckBig size={25} className="text-[#1CB324]" />
      </div>
    )
  }

  return (
    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#D65151] shadow-md">
      <CircleX size={25} className="text-white" />
    </div>
  )
}

export default function OrderSheet() {
  // const { orderId } = useParams<{ orderId: string }>()
  const [order /* setOrder */] = useState<OrderDetail | null>(null)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (orderId === '1') {
  //     setOrder({
  //       id: 1,
  //       shopLabel: '케이크샵',
  //       shopName: '스위트 드림즈 베이커리',
  //       productName: '크리스마스 파티 케이크',
  //       pickupDate: '2025.12.24 (수)',
  //       pickupTime: '10:00 AM',
  //       orderCode: '#HKR6B04JZ',
  //       items: [
  //         {
  //           imageUrl:
  //             'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  //           rows: [
  //             { label: '디자인', value: '1호 원형' },
  //             { label: '맛', value: '초코 시트 + 생크림' },
  //             { label: '레터링', value: ['메리크리스마스', '가운데 정렬 + 1번'] },
  //             { label: '데코', value: '오레오' },
  //             { label: '추가요청', value: '크리스마스 토퍼' },
  //           ],
  //         },
  //       ],
  //       status: 'REJECTED',
  //       progress: [
  //         { key: 'CREATED', title: '주문서 작성', at: '2025.12.10 14:30' },
  //         { key: 'OWNER_CHECKED', title: '사장님 확인', at: '2025.12.11 09:15' },
  //         { key: 'REJECTED', title: '제작 불가', at: '2025.12.11 10:00' },
  //       ],
  //       rejectMessage:
  //         '해당 날짜에 예약이 마감되어 제작이 어렵습니다.\n날짜 변경을 원하시는 경우 채팅으로 문의 부탁드립니다.',
  //     })
  //   }
  // }, [orderId])

  if (!order) {
    return (
      <div className="py-20 text-center text-sm text-gray-500">주문 정보를 불러오는 중이에요…</div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7eeee]">
      <div className="mx-auto max-w-[420px] px-4">
        <div className="relative">
          <div className="absolute top-[140px] left-0 w-full h-[200px] bg-[#C09C9C] z-5 rounded-[10px] border border-[#D9B7B7]" />
          <img
            src={letter}
            alt="letter header"
            className="pointer-events-none select-none w-full relative z-20"
            draggable={false}
          />

          <div className="-mt-[100px] relative flex flex-col items-center gap-8 z-50">
            <StatusIcon status={order.status} />
          </div>

          <div className="-mt-[160px] relative z-10">
            <div className="mx-auto w-full max-w-[340px] rounded-[18px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.10)] overflow-hidden">
              <div className={`px-5 pt-[150px] ${order.status === 'REJECTED' ? 'pb-30' : 'pb-15'}`}>
                <OrderDetailsCard order={order} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div
          className="px-5 py-4"
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(254, 250, 249, 0.7) 28.85%, #FCF4F3 100%)',
          }}
        >
          <div className="mx-auto max-w-[420px]">
            {order.status === 'REJECTED' ? (
              <div className="flex flex-col gap-3">
                <button
                  className="w-full rounded-full bg-white py-3 !text-[15px] font-bold text-[#2b2b2b] shadow-lg"
                  onClick={() => {
                    // navigate('/orders')
                  }}
                >
                  목록 보기
                </button>

                <button
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#57504F] py-3 !text-[15px] font-bold text-white shadow-lg"
                  onClick={() => {
                    // navigate(`/chat/${order.id}`)
                  }}
                >
                  <MessageCircle size={15} />
                  사장님과 채팅하기
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  className="flex-1 rounded-full bg-white py-3 !text-[15px] font-bold text-[#2b2b2b] shadow-lg"
                  onClick={() => {
                    // navigate('/')
                  }}
                >
                  홈으로
                </button>

                <button
                  className="flex-1 rounded-full bg-[#57504F] py-3 !text-[15px] font-bold text-white shadow-lg"
                  onClick={() => {
                    // navigate('/orders')
                  }}
                >
                  목록 보기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
