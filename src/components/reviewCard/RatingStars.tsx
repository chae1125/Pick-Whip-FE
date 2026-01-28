import IconStarFilled from '../../assets/reviewCard/icon-star-filled.svg?react'
import IconStar from '../../assets/reviewCard/icon-star.svg?react'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function RatingStars({ rating }: { rating: number }) {
  const r = clamp(Math.round(rating), 0, 5)

  return (
    <div className="flex gap-1" aria-label={`별점 ${r}점`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < r
        return (
          <span
            key={i}
            className={`inline-flex h-10 w-5 items-center justify-center ${
              filled ? 'text-amber-400' : 'text-zinc-200'
            }`}
            aria-hidden="true"
          >
            {filled ? (
              <IconStarFilled width="14" height="14" className="h-full w-full object-contain" />
            ) : (
              <IconStar width="14" height="14" className="h-full w-full object-contain" />
            )}
          </span>
        )
      })}
    </div>
  )
}
