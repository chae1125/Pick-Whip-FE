import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import ArrowLeftIcon from '../../assets/chat-icon/arrow-left.svg?react'
import ChatListItem from '../../components/chat/ChatListItem'
import { SearchInput } from '@/components/input/SearchInput'
import { getChatRoomList } from '@/apis/chat'

export default function ChatList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  // TODO: 실제 userId 연결 필요
  const userId = 1

  const { data } = useQuery({
    queryKey: ['chatRooms', userId, search],
    queryFn: () => getChatRoomList({ userId, keyword: search, size: 100 }),
  })

  const chatRooms = data?.chatRooms || []

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
        {chatRooms.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-400">
            채팅방이 없습니다.
          </div>
        ) : (
          chatRooms.map((chat) => <ChatListItem key={chat.roomId} chat={chat} />)
        )}
      </div>
    </div>
  )
}
