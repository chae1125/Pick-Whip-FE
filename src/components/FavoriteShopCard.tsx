import { Heart } from 'lucide-react'
import type { FavoriteShop } from '@/types/favorite'

interface FavoriteShopCardProps {
  shop: FavoriteShop
  onClick?: () => void
  onRemoveFavorite?: (shopId: number) => void
}

export default function FavoriteShopCard({
  shop,
  onClick,
  onRemoveFavorite,
}: FavoriteShopCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemoveFavorite?.(shop.shopId)
  }

  return (
    <div
      onClick={onClick}
      className="relative flex flex-row p-1.5 rounded-[10px] bg-[#FFFFFF] w-full items-start cursor-pointer hover:shadow-sm transition-shadow gap-3"
    >
      <svg
        className="absolute bottom-0 left-0 z-[9]"
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M42 42C37.968 5.75748 12.32 -1.02374 0 0.115958V42H42Z" fill="white" />
        <path d="M36 42C32.544 10.935 10.56 5.1225 0 6.09939V42H36Z" fill="#FCF4F3" />
      </svg>

      <div className="relative flex-shrink-0">
        <img
          src={shop.shopImageUrl}
          alt={shop.shopName}
          className="w-[100px] h-[100px] object-cover rounded-[7.5px]"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute -bottom-0.5 -left-0.5 z-10 hover:scale-110 transition-transform drop-shadow-md"
        >
          <Heart size={20} className="fill-[#E85C5C] stroke-[#E85C5C]" />
        </button>
      </div>

      <div className="flex flex-col flex-1 p-3 justify-center gap-3">
        <h3 className="text-[16px] text-[#BA8675] font-semibold leading-tight">{shop.shopName}</h3>

        <div className="flex flex-row mt-4 flex-wrap gap-2">
          {shop.keywords.slice(0, 3).map((keyword, index) => (
            <span
              key={index}
              className="text-[10px] text-[#BA8675] border border-[#BA8675] rounded-full px-2 py-1"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
