import { useLocation, useNavigate } from 'react-router-dom'
import BackHeader from '@/components/BackHeader'
import StoreCard, { type StoreInfoCard } from './StoreCard'

export type StoreTabKey = 'design' | 'info' | 'review'

const getActiveTabFromPath = (pathname: string): StoreTabKey =>
  pathname.includes('/store-detail/info')
    ? 'info'
    : pathname.includes('/store-detail/review')
      ? 'review'
      : 'design'

export default function StoreTabsHeader({ store }: { store: StoreInfoCard }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const activeTab = getActiveTabFromPath(pathname)
  const activeIndex = activeTab === 'design' ? 0 : activeTab === 'info' ? 1 : 2

  const tabBtnClass = (on: boolean) =>
    [
      'flex items-center justify-center gap-1 h-full !text-[14px] !font-semibold',
      on ? 'text-[#57504F]' : 'text-[#868F91]',
    ].join(' ')

  return (
    <div className="w-full bg-[#FCF4F3]">
      <BackHeader
        title="매장 상세"
        bgColor="bg-[#FCF4F3]"
        titleClassName="!text-[20px] font-semibold"
        height="h-[66px]"
      />

      <StoreCard {...store} />

      <div className="sticky top-0 z-50 bg-[#FCF4F3]">
        <div className="-mx-4">
          <div className="relative h-[48px]">
            <div className="flex h-full">
              <button
                type="button"
                onClick={() => navigate('/store-detail/design')}
                className={['flex-1 h-full', tabBtnClass(activeTab === 'design')].join(' ')}
              >
                <span>케이크</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/store-detail/info')}
                className={['flex-1 h-full', tabBtnClass(activeTab === 'info')].join(' ')}
              >
                <span>매장 정보</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/store-detail/review')}
                className={['flex-1 h-full', tabBtnClass(activeTab === 'review')].join(' ')}
              >
                <span>리뷰 ({store.reviewCount})</span>
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-[2px]">
              <div
                className="h-full transition-transform duration-300 ease-out"
                style={{
                  width: '33.333333%',
                  transform: `translateX(${activeIndex * 100}%)`,
                }}
              >
                <div className="h-full bg-[#57504F]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
