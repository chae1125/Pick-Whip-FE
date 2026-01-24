import { Heart } from 'lucide-react'

type CakeCardProps = {
  imageUrl: string
  isLiked?: boolean
  onToggleLike?: () => void
}

export default function CakeCard({ imageUrl, isLiked = false, onToggleLike }: CakeCardProps) {
  return (
    <div className="group relative w-full overflow-hidden rounded-[10px] rounded-br-none bg-white p-1 shadow-md transition-transform hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-[10px]">
        <img
          src={imageUrl}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            onToggleLike?.()
          }}
          aria-label="찜하기"
          className=" absolute -bottom-14 -right-14 h-25 w-25 rounded-full bg-white flex items-center justify-center"
        >
          <Heart
            size={25}
            className={`absolute bottom-15 right-15 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-900'
            }`}
          />
        </button>
      </div>
    </div>
  )
}
