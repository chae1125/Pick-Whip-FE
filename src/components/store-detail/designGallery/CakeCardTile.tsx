import type { CakeCardItem } from '@/types/designgallery'
import CakeThumCard from '../../CakeThumbCard'

type Props = {
  item: CakeCardItem
  onClick?: (item: CakeCardItem) => void
  onToggleLike?: (item: CakeCardItem) => void
}

export default function CakeCardTile({ item, onClick, onToggleLike }: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(item)
        }
      }}
      className="cursor-pointer"
    >
      <CakeThumCard
        imageUrl={item.imageUrl ?? ''}
        isLiked={item.isLiked}
        onToggleLike={() => onToggleLike?.(item)}
        likeButtonSizePx={75}
        likeIconSizePx={20}
        likeOffsetPx={{ bottom: 36, right: 36 }}
        likeIconInsetPx={{ bottom: 40, right: 40 }}
      />

      <div className="mt-4 px-1">
        <p className="!text-[12px] !font-semibold !text-[#BA8675] line-clamp-2">{item.cakeName}</p>

        <p className="!mt-0.5 !text-[12px] !font-semibold !text-[#BA8675]">
          ₩ {item.price.toLocaleString()} ~
        </p>

        {!!item.keywords?.length && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {item.keywords.slice(0, 3).map((tag) => (
              <span
                key={`${item.id}-${tag}`}
                className="inline-flex items-center rounded-full border border-[#BA8675] px-2 py-[2px] text-[8px] font-semibold text-[#BA8675]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
