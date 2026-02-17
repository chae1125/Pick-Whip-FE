// src/components/store-detail/designGallery/DesignGallery.tsx
import { useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import type { CakeCardItem } from '@/types/designgallery'
import CakeCardSection from '@/components/store-detail/designGallery/CakeCardSection'
import CakeDetailModal, {
  type CakeDetailItem,
  type CustomizeFromModalArgs,
} from '@/components/store-detail/designGallery/CakeDetailModal'

import { getShopDesignGallery } from '@/apis/shop'
import { addFavoriteDesign, removeFavoriteDesign } from '@/apis/design'
import { getUserIdWithCookie } from '@/utils/auth'

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
  shopId?: number
}

function hasWord(item: { cakeName: string; keywords?: string[] }, word: string) {
  if (item.cakeName?.includes(word)) return true
  return (item.keywords ?? []).some((k) => k.includes(word))
}

export default function DesignGallery({ shopName, shopId: shopIdProp }: DesignGalleryProps) {
  const navigate = useNavigate()
  const shopId = shopIdProp ?? 2
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    getUserIdWithCookie().then(setUserId)
  }, [])

  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [allDesigns, setAllDesigns] = useState<CakeCardItem[]>([])
  const [page, setPage] = useState<Record<SectionKey, number>>({
    all: 0,
    pick: 0,
    birth: 0,
    letter: 0,
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [modalItems, setModalItems] = useState<CakeDetailItem[]>([])
  const [modalIndex, setModalIndex] = useState(0)

  useEffect(() => {
    let alive = true

    const run = async () => {
      setLoading(true)
      setErrorMsg(null)

      try {
        const data = await getShopDesignGallery(shopId, userId ?? undefined)

        const mapped: CakeCardItem[] = (data.designs ?? []).map((d) => ({
          designId: d.designId,
          imageUrl: d.imageUrl ?? '',
          cakeName: d.cakeName ?? '',
          price: d.price ?? 0,
          keywords: d.keywords ?? [],
          isLiked: d.myPick ?? false,
        }))

        if (alive) setAllDesigns(mapped)
      } catch (e) {
        if (alive) setErrorMsg(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.')
      }

      if (alive) setLoading(false)
    }

    run()
    return () => {
      alive = false
    }
  }, [shopId, userId])

  const withLiked = useCallback((items: CakeCardItem[]) => items, [])

  const toDetail = useCallback(
    (items: CakeCardItem[]): CakeDetailItem[] =>
      items.map((c) => ({
        id: c.designId,
        imageUrl: c.imageUrl ?? '',
        cakeName: c.cakeName,
        price: c.price,
        keywords: c.keywords,
        isOwnersPick: {
          shape: ['원형', '하트', '미니'][c.designId % 3],
          sheet: ['크림치즈', '바닐라', '초코'][c.designId % 3],
          cream: ['레드벨벳', '생크림', '초코'][c.designId % 3],
          icingColor: ['화이트', '핑크', '라벤더'][c.designId % 3],
        },
      })),
    [],
  )

  const toggleLike = useCallback(
    async (designId: number) => {
      if (!userId) {
        console.error('로그인이 필요합니다')
        return
      }

      const currentItem = allDesigns.find((d) => d.designId === designId)
      if (!currentItem) return

      const wasLiked = currentItem.isLiked

      setAllDesigns((prev) =>
        prev.map((d) => (d.designId === designId ? { ...d, isLiked: !wasLiked } : d)),
      )

      try {
        if (wasLiked) {
          await removeFavoriteDesign({ designId, userId })
        } else {
          await addFavoriteDesign({ designId, userId })
        }
      } catch (error) {
        console.error('찜하기 토글 실패:', error)
        setAllDesigns((prev) =>
          prev.map((d) => (d.designId === designId ? { ...d, isLiked: wasLiked } : d)),
        )
      }
    },
    [userId, allDesigns],
  )

  const openFromCards = useCallback(
    (cards: CakeCardItem[], designId: number) => {
      const detail = toDetail(withLiked(cards))
      const idx = Math.max(
        0,
        detail.findIndex((x) => x.id === designId),
      )
      setModalItems(detail)
      setModalIndex(idx)
      setModalOpen(true)
    },
    [toDetail, withLiked],
  )

  const { all, bestPick, birthdayBest, letteringBest } = useMemo(() => {
    const all = allDesigns
    const bestPick = all.slice(0, 3)

    const birthCandidates = all.filter((x) =>
      hasWord({ cakeName: x.cakeName, keywords: x.keywords }, '생일'),
    )
    const birthdayBest = birthCandidates.length >= 3 ? birthCandidates.slice(0, 3) : all.slice(0, 3)

    const letterCandidates = all.filter((x) =>
      hasWord({ cakeName: x.cakeName, keywords: x.keywords }, '레터링'),
    )
    const letteringBest =
      letterCandidates.length >= 3 ? letterCandidates.slice(0, 3) : all.slice(0, 3)

    return { all, bestPick, birthdayBest, letteringBest }
  }, [allDesigns])

  const sections: SectionDef[] = useMemo(
    () => [
      { key: 'all', title: '전체 디자인', items: all, pageSize: 6, columns: 3 },
      { key: 'pick', title: `${shopName}'s Best Pick!`, items: bestPick, pageSize: 3, columns: 3 },
      { key: 'birth', title: '생일 케이크 BEST', items: birthdayBest, pageSize: 3, columns: 3 },
      { key: 'letter', title: '레터링 케이크 BEST', items: letteringBest, pageSize: 3, columns: 3 },
    ],
    [all, bestPick, birthdayBest, letteringBest, shopName],
  )

  if (loading) return <div className="mx-auto w-full pt-10 pb-10 mb-30" />
  if (errorMsg) {
    return (
      <div className="mx-auto w-full pt-10 pb-10 mb-30 p-6">
        <p className="text-sm text-gray-700">디자인 갤러리를 불러오기에 실패했어요.</p>
        <p className="mt-1 text-xs text-gray-500">{errorMsg}</p>
      </div>
    )
  }

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
            onToggleLike={(item) => toggleLike(item.designId)}
            onClickCard={(item) => openFromCards(s.items, item.designId)}
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
          shopId={shopId}
          shopName={shopName}
          onCustomize={({ designId, pickupDatetime, cakeName, price }: CustomizeFromModalArgs) => {
            setModalOpen(false)
            navigate(`/customize/${designId}`, {
              state: { shopId, designId, shopName, pickupDatetime, cakeName, price },
            })
          }}
        />
      )}
    </>
  )
}
