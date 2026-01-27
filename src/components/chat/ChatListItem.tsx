import { useNavigate } from 'react-router-dom'
import PersonIcon from '../../assets/chat-icon/person.svg?react'

interface ChatPreview {
  id: string
  name: string
  lastMessage: string
  time: string
  unreadCount: number
}

interface ChatListItemProps {
  chat: ChatPreview
}

export default function ChatListItem({ chat }: ChatListItemProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/chat/${chat.id}`)}
      className="flex cursor-pointer items-center border-b border-gray-200 px-5 py-7"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-chat-header">
        <PersonIcon className="h-6 w-6 text-white" />
      </div>

      <div className="ml-4 flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="text-[15px] font-bold text-gray-800">{chat.name}</div>
          <span className="text-xs text-gray-500">{chat.time}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div className="truncate text-[14px] text-gray-600">{chat.lastMessage}</div>
          {chat.unreadCount > 0 && (
            <span className="ml-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-chat-unread text-[10px] font-bold text-white">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
