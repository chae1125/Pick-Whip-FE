import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowLeftIcon from '../../assets/chat-icon/arrow-left.svg?react'
import PersonIcon from '../../assets/chat-icon/person.svg?react'
import ImgIcon from '../../assets/chat-icon/img-icon.svg?react'
import SendIcon from '../../assets/chat-icon/send-white.svg?react'

interface Message {
  id: string
  text: string
  isMe: boolean
  time: string
}

// 임시 데이터
const DUMMY_MESSAGES: Message[] = [
  {
    id: '1',
    text: '안녕하세요, 주문서 작성한 김케이크입니다. 혹시 딸기를 추가할 수 있나요?',
    isMe: true,
    time: '오전 10:00',
  },
  {
    id: '2',
    text: '안녕하세요! 주문해주셔서 감사합니다.\n딸기 많이 올려드릴게요!',
    isMe: false,
    time: '오전 10:03',
  },
]

export default function ChatRoom() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 임시 가게 이름
  const bakeryName = '스위트 드림즈 베이커리'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const ampm = hours >= 12 ? '오후' : '오전'
    const formattedTime = `${ampm} ${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isMe: true,
      time: formattedTime,
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-screen flex-col bg-chat-bg">
      <header className="fixed top-0 z-10 grid h-15 w-full grid-cols-[auto_1fr_auto] items-center bg-chat-header px-5">
        <button onClick={() => navigate(-1)} className="flex items-center justify-start py-2 pr-4">
          <ArrowLeftIcon className="h-7 w-7 text-gray-800" />
        </button>
        <h2 className="text-center text-gray-800">{bakeryName}</h2>
        <div className="w-10" />
      </header>

      <main className="flex-1 space-y-4 overflow-y-auto px-4 pb-24 pt-20">
        <div className="flex justify-center py-4">
          <div className="rounded-full bg-chat-date/75 px-5 py-2 text-[14px] text-gray-700">
            2026년 1월 19일
          </div>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.isMe ? 'flex-row-reverse items-end' : 'flex-row items-start'} gap-3`}
          >
            {!msg.isMe && (
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-chat-header mt-1">
                <PersonIcon className="h-6 w-6 text-white" />
              </div>
            )}

            <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} max-w-[85%]`}>
              {!msg.isMe && (
                <span className="mb-2 ml-1 text-[14px] font-medium text-gray-700">
                  {bakeryName}
                </span>
              )}
              <div className={`flex items-end gap-2 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                <div
                  className={`rounded-2xl p-3 text-[14px] ${
                    msg.isMe
                      ? 'bg-chat-bg-mine text-white rounded-tr-none' // 내가 보낸 메시지
                      : 'bg-white text-gray-800 rounded-tl-none' // 상대방이 보낸 메시지
                  }`}
                >
                  <div className="whitespace-pre-wrap text-[14px]">{msg.text}</div>
                </div>
                <span className="mb-1 whitespace-nowrap text-[10px] text-gray-500">{msg.time}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      <footer className="fixed bottom-0 w-full bg-white px-4 py-5 shadow-lg ring-1 ring-gray-100">
        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-input-bg text-input-text hover:bg-sub-gray-50">
            <ImgIcon className="h-10 w-6" />
          </button>

          <div className="flex flex-1 items-center rounded-xl bg-input-bg px-4 py-3">
            <input
              type="text"
              className="w-full bg-transparent text-md text-gray-800 placeholder-input-text focus:outline-none"
              placeholder="메시지를 입력하세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button onClick={handleSendMessage}>
            <SendIcon className="h-10 w-auto" />
          </button>
        </div>
      </footer>
    </div>
  )
}
