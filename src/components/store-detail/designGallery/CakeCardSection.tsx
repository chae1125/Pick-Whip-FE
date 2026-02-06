import type { CakeCardItem } from '@/types/designgallery'
import usePageSlider from '@/hooks/usePageSlider'
import CakeCardGrid from './CakeCardGrid'
import CakeCardPagination from './CakeCardPagination'

type Props = {
  title: string
  items: CakeCardItem[]
  pageIndex: number
  pageSize: number
  columns?: 2 | 3
  onChangePage: (nextIndex: number) => void
  onClickCard?: (item: CakeCardItem) => void
  onToggleLike?: (item: CakeCardItem) => void
}

export default function CakeCardSection({
  title,
  items,
  pageIndex,
  pageSize,
  columns = 3,
  onChangePage,
  onClickCard,
  onToggleLike,
}: Props) {
  const {
    totalPages,
    safeIndex,
    canPrev,
    canNext,
    animDir,
    offset,
    transitionOn,
    windowPages,
    goPrev,
    goNext,
    onTransitionEnd,
  } = usePageSlider({ items, pageSize, pageIndex, onChangePage })

  return (
    <div className="w-full">
      <p className="!mt-8 !text-[14px] !font-bold !text-[#2A2929]">{title}</p>

      <div className="mt-3">
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${offset * 100}%)`,
              transition: transitionOn ? 'transform 500ms ease-out' : 'none',
              willChange: 'transform',
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {windowPages.map((page, i) => (
              <div key={i} className="min-w-full w-full flex-shrink-0">
                <CakeCardGrid
                  page={page}
                  columns={columns}
                  onClickCard={onClickCard}
                  onToggleLike={onToggleLike}
                />
              </div>
            ))}
          </div>
        </div>

        <CakeCardPagination
          safeIndex={safeIndex}
          totalPages={totalPages}
          canPrev={canPrev}
          canNext={canNext}
          animating={!!animDir}
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>
    </div>
  )
}
