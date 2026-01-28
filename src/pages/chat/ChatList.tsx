import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowLeftIcon from '../../assets/chat-icon/arrow-left.svg?react'
import ChatListItem from '../../components/chat/ChatListItem'
import { SearchInput } from '../../components/SearchInput'

interface ChatPreview {
  id: string
  name: string
  lastMessage: string
  time: string
  unreadCount: number
}

// 임시 데이터
const DUMMY_CHATS: ChatPreview[] = [
  {
    id: '1',
    name: '스위트 드림즈 베이커리',
    lastMessage: '안녕하세요! 주문해주셔서 감사합니다. 딸기 많이...',
    time: '10분 전',
    unreadCount: 1,
  },
  {
    id: '2',
    name: '베리케이크',
    lastMessage: '네, 아이스팩 제공해드리고 있습니다. 주문 ...',
    time: '10분 전',
    unreadCount: 1,
  },
  {
    id: '3',
    name: '골든케이크',
    lastMessage: '네, 아이스팩 제공해드리고 있습니다. 주문 ...',
    time: '10분 전',
    unreadCount: 1,
  },
]

export default function ChatList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  return (
    <div className="flex h-screen flex-col bg-sub-white-100">
      <header className="fixed top-0 z-10 grid h-14 w-full grid-cols-3 items-center bg-chat-header px-4">
        <button onClick={() => navigate(-1)} className="flex items-center justify-start">
          <ArrowLeftIcon className="h-7 w-7 text-gray-800" />
        </button>
        <h2 className="text-center text-gray-800">채팅</h2>
        <div />
      </header>

      <div className="mt-14 bg-chat-header p-4 pb-6">
        <SearchInput value={search} onChange={setSearch} placeholder="케이크샵 이름 검색" />
      </div>
      <div className="h-1 w-full bg-[#E8C2C6]" />

      <div className="flex-1 overflow-y-auto py-2">
        {DUMMY_CHATS.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  )
}
