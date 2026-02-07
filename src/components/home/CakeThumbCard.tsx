import { Heart } from 'lucide-react'

type CakeCardProps = {
  imageUrl: string
  isLiked?: boolean
  onToggleLike?: () => void

  likeButtonSizePx?: number
  likeIconSizePx?: number
  likeOffsetPx?: { bottom: number; right: number }
  likeIconInsetPx?: { bottom: number; right: number }
}

export default function CakeCard({
  imageUrl,
  isLiked = false,
  onToggleLike,

  likeButtonSizePx = 100,
  likeIconSizePx = 25,
  likeOffsetPx = { bottom: 56, right: 56 },
  likeIconInsetPx = { bottom: 60, right: 60 },
}: CakeCardProps) {
  return (
    <div className="group relative w-full overflow-hidden rounded-[10px] rounded-br-none bg-white p-1 shadow-md transition-transform hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-[10px]">
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          draggable={false}
        />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onToggleLike?.()
          }}
          aria-label="찜하기"
          className="absolute rounded-full bg-white flex items-center justify-center"
          style={{
            right: -likeOffsetPx.right,
            bottom: -likeOffsetPx.bottom,
            width: likeButtonSizePx,
            height: likeButtonSizePx,
          }}
        >
          <Heart
            size={likeIconSizePx}
            className={`absolute transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-900'
            }`}
            style={{
              right: likeIconInsetPx.right,
              bottom: likeIconInsetPx.bottom,
            }}
          />
        </button>
      </div>
    </div>
  )
}
