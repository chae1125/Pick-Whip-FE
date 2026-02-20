import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'
import ArrowLeftIcon from '../../assets/chat-icon/arrow-left.svg?react'
import PersonIcon from '../../assets/chat-icon/person.svg?react'
import ImgIcon from '../../assets/chat-icon/img-icon.svg?react'
import SendIcon from '../../assets/chat-icon/send-white.svg?react'
import OrderListCard, { type OrderInfo } from '../../components/order-history/OrderListCard'
import OrderDetailsCard, { type OrderDetail } from '../../components/OrderDetailsCard'
import { getChatMessages } from '@/apis/chat'
import { getUserIdWithCookie } from '@/utils/auth'

// 임시 주문 데이터
const DUMMY_ORDER_INFO: OrderInfo = {
  orderId: 1,
  imageURL: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
  createdAt: '2025.12.05',
  storeName: '메종 드 가토',
  cakeName: '생일 축하 케이크',
  pickupDate: '2025.12.15 (일)',
  pickupTime: '02:00 PM',
  progressLabel: '제작 확정',
  progress: '제작 확정',
  previewText: '프리뷰 보기',
  detail: {
    design: '1호 원형',
    taste: '초코 시트 + 생크림',
    lettering: 'X',
    extraRequest: '크리스마스 토퍼',
    finalPriceText: '₩55,000',
    orderCode: '#ABC1234XY',
  },
}

const DUMMY_ORDER_DETAIL: OrderDetail = {
  id: 1,
  shopName: '스위트 드림즈 베이커리',
  productName: '크리스마스 파티 케이크',
  pickupDate: '2025.12.24 (수)',
  pickupTime: '10:00 AM',
  orderCode: '20251224-SD-001',
  status: 'PENDING',
  items: [
    {
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
      rows: [
        { label: '디자인', value: '1호 원형' },
        { label: '맛', value: '초코 시트 + 생크림' },
        { label: '레터링', value: ['메리크리스마스', '가운데 정렬 + 1번', '오레오'] },
        { label: '추가요청', value: '크리스마스 토퍼' },
      ],
    },
  ],
}

export default function ChatRoom() {
  const navigate = useNavigate()
  const { roomId } = useParams()
  const location = useLocation()
  const shopName = location.state?.shopName || '케이크샵'

  const [message, setMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserIdWithCookie()
      setUserId(id)
    }
    fetchUserId()
  }, [])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['chatMessages', roomId, userId],
    queryFn: ({ pageParam }) =>
      getChatMessages({
        roomId: Number(roomId),
        userId: userId!,
        cursor: pageParam ? Number(pageParam) : undefined,
        size: 20,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!roomId && !!userId,
  })

  const messages = useMemo(() => {
    if (!data) return []
    const allMessages = data.pages.flatMap((page) => page.messageList)
    return [...allMessages].reverse()
  }, [data])

  // 임시: 주문 상태 여부 (true-주문 후/false-주문 전)
  const [isOrdered, setIsOrdered] = useState(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!isFetchingNextPage) {
      scrollToBottom()
    }
  }, [messages.length, isFetchingNextPage])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // TODO: 메시지 전송 연결 필요함
    console.log('Send message:', message)
    setMessage('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-screen flex-col bg-chat-bg relative">
      <header className="fixed top-0 z-10 grid h-14 w-full grid-cols-[auto_1fr_auto] items-center bg-chat-header px-5 shadow-sm">
        <button onClick={() => navigate(-1)} className="flex items-center justify-start py-2 pr-4">
          <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        <h2 className="text-center text-[16px] font-bold text-gray-800">{shopName}</h2>
        {/* 임시 토글 버튼 - 확인용 */}
        <button
          onClick={() => setIsOrdered(!isOrdered)}
          className="text-xs text-gray-400 font-normal"
        >
          {isOrdered ? '주문후' : '주문전'}
        </button>
      </header>

      <main
        className={`flex-1 space-y-4 overflow-y-auto px-4 pb-24 ${isOrdered ? 'pt-16' : 'pt-20'}`}
      >
        {isOrdered && (
          <div className="sticky top-0 z-0 -mx-4 px-4 bg-chat-bg pb-2">
            <OrderListCard
              item={{
                ...DUMMY_ORDER_INFO,
                onClickDetail: () => setIsModalOpen(true),
              }}
              className="!pt-0 !pb-0"
              simpleView
            />
          </div>
        )}

        {hasNextPage && (
          <div className="flex justify-center py-2">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600"
            >
              {isFetchingNextPage ? '로딩 중...' : '이전 메시지 더보기'}
            </button>
          </div>
        )}

        <div className="flex justify-center py-4">
          <div className="rounded-full bg-chat-date/75 px-5 py-2 text-[12px] text-gray-600 shadow-sm">
            2026년 1월 19일
          </div>
        </div>

        {messages.map((msg) => {
          const isMe = msg.senderId === userId
          return (
            <div
              key={msg.messageId}
              className={`flex w-full ${isMe ? 'flex-row-reverse items-end' : 'flex-row items-start'} gap-2`}
            >
              {!isMe && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 mt-1 overflow-hidden">
                  <PersonIcon className="h-5 w-5 text-rose-400" />
                </div>
              )}

              <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                {!isMe && (
                  <span className="mb-1 ml-1 text-[12px] font-medium text-gray-600">
                    {shopName}
                  </span>
                )}
                <div className={`flex items-end gap-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 text-[14px] leading-relaxed shadow-sm ${
                      isMe
                        ? 'bg-[#E68A8A] text-white rounded-tr-none' // 내가 보낸 메시지
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100' // 상대방이 보낸 메시지
                    }`}
                  >
                    {msg.type === 'IMAGE' && msg.imageUrl ? (
                      <img
                        src={msg.imageUrl}
                        alt="전송된 이미지"
                        className="max-w-full rounded-lg"
                      />
                    ) : (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    )}
                  </div>
                  <span className="mb-1 whitespace-nowrap text-[10px] text-gray-400">
                    {msg.createdAt.slice(11, 16)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </main>

      <footer className="fixed bottom-0 w-full bg-white px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] safe-area-bottom">
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-50 transition-colors">
            <ImgIcon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 items-center rounded-full bg-gray-100 px-4 py-2.5">
            <input
              type="text"
              className="w-full bg-transparent text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none"
              placeholder="메시지를 입력하세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            onClick={handleSendMessage}
            className={`p-2 transition-transform active:scale-95 ${!message.trim() ? 'opacity-50' : ''}`}
            disabled={!message.trim()}
          >
            <SendIcon className="h-8 w-8 text-rose-400" />
          </button>
        </div>
      </footer>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[85vh] w-full max-w-sm overflow-y-auto rounded-[20px] bg-white shadow-xl animate-in zoom-in-95 duration-200 hide-scrollbar">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            <OrderDetailsCard order={DUMMY_ORDER_DETAIL} />
          </div>
        </div>
      )}
    </div>
  )
}
