import { Heart, Star } from 'lucide-react'

type CakeCardProps = {
  shopName: string
  rating: number
  productName: string
  price: number
  imageUrl: string
  isLiked?: boolean
  onToggleLike?: () => void
}

export default function CakeCard({
  shopName,
  rating,
  productName,
  price,
  imageUrl,
  isLiked = false,
  onToggleLike,
}: CakeCardProps) {
  return (
    <div className="group relative w-full overflow-hidden rounded-[10px] rounded-br-none bg-white p-1 shadow-md transition-transform hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-[10px]">
        <img
          src={imageUrl}
          alt={productName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 flex flex-col gap-1 text-white">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium">{shopName}</span>
            <div className="flex items-center gap-0.5">
              <Star size={10} className="fill-yellow-400 text-yellow-400" />
              <span className="text-[11px] font-medium">{rating}</span>
            </div>
          </div>
          <h3 className="text-[13.5px] font-semibold leading-tight">{productName}</h3>
          <p className="mt-1 !text-[11px] !font-medium">₩ {price.toLocaleString()}~</p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            onToggleLike?.()
          }}
          aria-label="찜하기"
          className=" absolute -bottom-12 -right-12 h-25 w-25 rounded-full bg-white flex items-center justify-center"
        >
          <Heart
            size={25}
            className={`absolute bottom-14 right-14 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-900'
            }`}
          />
        </button>
      </div>
    </div>
  )
}
