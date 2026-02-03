import { useMemo, useState } from 'react'
import { mock } from '@/types/designgallery.mock'
import type { CakeCardItem } from '@/types/designgallery'
import CakeCardSection from '@/components/store-detail/designGallery/CakeCardSection'
import CakeDetailModal, {
  type CakeDetailItem,
} from '@/components/store-detail/designGallery/CakeDetailModal'

type SectionKey = 'all' | 'pick' | 'birth' | 'letter'
type SectionDef = {
  key: SectionKey
  title: string
  items: CakeCardItem[]
  pageSize: number
  columns: 2 | 3
}

type DesignGalleryProps = {
  shopName: string
}

export default function DesignGallery({ shopName }: DesignGalleryProps) {
  const [page, setPage] = useState<Record<SectionKey, number>>({
    all: 0,
    pick: 0,
    birth: 0,
    letter: 0,
  })

  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({})

  const [modalOpen, setModalOpen] = useState(false)
  const [modalItems, setModalItems] = useState<CakeDetailItem[]>([])
  const [modalIndex, setModalIndex] = useState(0)

  const { all, bestPick, birthdayBest, letteringBest } = useMemo(() => mock(), [])

  const withLiked = (items: CakeCardItem[]) =>
    items.map((c) => ({ ...c, isLiked: !!likedMap[c.id] }))

  const toDetail = (items: CakeCardItem[]): CakeDetailItem[] =>
    items.map((c) => ({
      id: c.id,
      imageUrl: c.imageUrl ?? '',
      cakeName: c.cakeName,
      price: c.price,
      keywords: c.keywords,
      isOwnersPick: {
        shape: ['원형', '하트', '미니'][c.id % 3],
        sheet: ['크림치즈', '바닐라', '초코'][c.id % 3],
        cream: ['레드벨벳', '생크림', '초코'][c.id % 3],
        icingColor: ['화이트', '핑크', '라벤더'][c.id % 3],
      },
    }))

  const toggleLike = (id: number) => setLikedMap((p) => ({ ...p, [id]: !p[id] }))

  const openFromCards = (cards: CakeCardItem[], cakeId: number) => {
    const detail = toDetail(withLiked(cards))
    const idx = Math.max(
      0,
      detail.findIndex((x) => x.id === cakeId),
    )
    setModalItems(detail)
    setModalIndex(idx)
    setModalOpen(true)
  }

  const sections: SectionDef[] = [
    { key: 'all', title: '전체 디자인', items: all, pageSize: 6, columns: 3 },
    { key: 'pick', title: `${shopName}'s Best Pick!`, items: bestPick, pageSize: 3, columns: 3 },
    { key: 'birth', title: '생일 케이크 BEST', items: birthdayBest, pageSize: 3, columns: 3 },
    { key: 'letter', title: '레터링 케이크 BEST', items: letteringBest, pageSize: 3, columns: 3 },
  ]

  return (
    <>
      <div className="mx-auto w-full pt-10 pb-10 mb-30">
        <p className="!text-[18px] !text-[#2A2929] !font-bold text-center">DESIGN GALLERY</p>

        {sections.map((s) => (
          <CakeCardSection
            key={s.key}
            title={s.title}
            items={withLiked(s.items)}
            pageSize={s.pageSize}
            pageIndex={page[s.key]}
            onChangePage={(next) => setPage((p) => ({ ...p, [s.key]: next }))}
            columns={s.columns}
            onToggleLike={(item) => toggleLike(item.id)}
            onClickCard={(item) => openFromCards(s.items, item.id)}
          />
        ))}
      </div>

      {modalOpen && (
        <CakeDetailModal
          key={`${modalIndex}-${modalItems.length}`}
          isOpen={modalOpen}
          items={modalItems}
          initialIndex={modalIndex}
          onClose={() => setModalOpen(false)}
          onGoReview={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
