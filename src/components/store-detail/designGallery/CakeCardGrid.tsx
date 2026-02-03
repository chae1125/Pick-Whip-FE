import type { CakeCardItem } from '@/types/designgallery'
import CakeCardTile from './CakeCardTile'

type Props = {
  page: CakeCardItem[]
  columns: 2 | 3
  onClickCard?: (item: CakeCardItem) => void
  onToggleLike?: (item: CakeCardItem) => void
}

export default function CakeCardGrid({ page, columns, onClickCard, onToggleLike }: Props) {
  const gridColsClass = columns === 2 ? 'grid-cols-2' : 'grid-cols-3'

  return (
    <div className={`grid gap-x-3 gap-y-6 ${gridColsClass}`}>
      {page.map((item) => (
        <CakeCardTile key={item.id} item={item} onClick={onClickCard} onToggleLike={onToggleLike} />
      ))}
      {page.length === 0 && <div className="min-h-[1px]" />}
    </div>
  )
}
