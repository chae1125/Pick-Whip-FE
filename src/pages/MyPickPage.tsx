import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import BackHeader from '@/components/BackHeader'
import FavoriteShopCard from '@/components/FavoriteShopCard'
import { getFavoriteShops, removeFavoriteShop } from '@/apis/user'
import type { FavoriteShop } from '@/types/favorite'
import { getUserIdFromToken } from '@/utils/auth'

type TabKey = 'shop' | 'design'
type Tab = { key: TabKey; label: string }

const TABS: Tab[] = [
  { key: 'shop', label: '찜한 가게' },
  { key: 'design', label: '찜한 디자인' },
]

export default function MyPickPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<TabKey>('shop')
  const [shops, setShops] = useState<FavoriteShop[]>([])

  const userId = getUserIdFromToken()

  const cursorRef = useRef<number | null>(null)
  const hasNextRef = useRef(true)

  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(false)

  const isEmpty = !initialLoading && shops.length === 0

  const fetchFavoriteShops = useCallback(
    async (isReset = false) => {
      if (loadingRef.current) return
      if (!isReset && !hasNextRef.current) return

      loadingRef.current = true
      setLoading(true)
      if (isReset) setInitialLoading(true)

      try {
        if (!userId) {
          console.error('로그인이 필요합니다')
          return
        }

        const res = await getFavoriteShops({
          userId,
          cursor: isReset ? undefined : (cursorRef.current ?? undefined),
          size: 20,
        })

        const fetched = res.shopList
        const nextHasNext = res.hasNext

        setShops((prev) => (isReset ? fetched : [...prev, ...fetched]))

        cursorRef.current = res.nextCursor
        hasNextRef.current = nextHasNext
        setHasNext(nextHasNext)
      } catch (error) {
        console.error('찜한 가게 목록 조회 실패:', error)
      } finally {
        loadingRef.current = false
        setLoading(false)
        if (isReset) setInitialLoading(false)
      }
    },
    [userId],
  )

  useEffect(() => {
    const el = loadMoreRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextRef.current && !loadingRef.current) {
          fetchFavoriteShops(false)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [fetchFavoriteShops])

  useEffect(() => {
    if (tab === 'shop') {
      setShops([])
      cursorRef.current = null
      hasNextRef.current = true
      setHasNext(true)
      setInitialLoading(true)
      fetchFavoriteShops(true)
    }
  }, [tab, fetchFavoriteShops])

  const handleShopClick = useCallback(
    (shopId: number) => {
      navigate(`/shop/${shopId}`)
    },
    [navigate],
  )

  const handleRemoveFavorite = useCallback(
    async (shopId: number) => {
      try {
        if (!userId) {
          console.error('로그인이 필요합니다')
          return
        }

        setShops((prev) => prev.filter((shop) => shop.shopId !== shopId))

        await removeFavoriteShop({ shopId, userId })
      } catch (error) {
        console.error('찜 해제 실패:', error)
        fetchFavoriteShops(true)
      }
    },
    [userId, fetchFavoriteShops],
  )

  return (
    <div className="bg-[#FCF4F3]">
      <div className="mx-auto min-h-screen w-full max-w-lg">
        <div className="relative px-2">
          <BackHeader title="마이픽" bgColor="#FCF4F3" titleClassName="font-bold" />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-1">
            {TABS.map((t) => {
              const active = tab === t.key
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className="relative flex-1 pb-3 !text-[15px] text-center !font-bold"
                >
                  <span className={active ? 'text-[var(--color-main-pink-200)]' : 'text-[#2B2B2B]'}>
                    {t.label}
                  </span>
                  {active && (
                    <span className="absolute left-0 right-0 -bottom-[1px] mx-auto h-[2px] w-full rounded-full bg-[#E85C5C]" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#F1DADA]" />

        <main className="pb-10 pt-6">
          <div className="px-6">
            {tab === 'shop' && (
              <>
                {initialLoading ? (
                  <div className="py-16 text-center text-xs text-gray-400">불러오는 중...</div>
                ) : isEmpty ? (
                  <div className="py-16 text-center text-[13px] text-gray-400">
                    찜한 가게가 없습니다
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-4">
                      {shops.map((shop) => (
                        <FavoriteShopCard
                          key={shop.favoriteId}
                          shop={shop}
                          onClick={() => handleShopClick(shop.shopId)}
                          onRemoveFavorite={handleRemoveFavorite}
                        />
                      ))}
                    </div>

                    {hasNext && !initialLoading && (
                      <div ref={loadMoreRef} className="h-10 w-full" />
                    )}

                    {!initialLoading && loading && (
                      <div className="px-6 py-4 text-center text-xs text-gray-400">
                        불러오는 중...
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {tab === 'design' && (
              <div className="py-16 text-center text-[13px] text-gray-400">
                찜한 디자인 기능은 준비 중입니다
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
