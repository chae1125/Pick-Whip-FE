import type { StoreInfoCard } from './StoreCard'

export type StoreTabKey = 'design' | 'info' | 'review'

export default function StoreTabsHeader({
  store,
  activeTab = 'design',
  onChange,
}: {
  store: StoreInfoCard
  activeTab?: StoreTabKey
  onChange?: (tab: StoreTabKey) => void
}) {
  const activeIndex = activeTab === 'design' ? 0 : activeTab === 'info' ? 1 : 2

  const tabBtnClass = (on: boolean) =>
    [
      'flex items-center justify-center gap-1 h-full !text-[14px] !font-semibold',
      on ? 'text-[#57504F]' : 'text-[#868F91]',
    ].join(' ')

  return (
    <div className="w-full bg-[#FCF4F3]">
      <div className="sticky top-0 z-50 bg-[#FCF4F3]">
        <div className="-mx-4">
          <div className="relative h-[48px]">
            <div className="flex h-full">
              <button
                type="button"
                onClick={() => onChange?.('design')}
                className={['flex-1 h-full', tabBtnClass(activeTab === 'design')].join(' ')}
              >
                <span>케이크</span>
              </button>

              <button
                type="button"
                onClick={() => onChange?.('info')}
                className={['flex-1 h-full', tabBtnClass(activeTab === 'info')].join(' ')}
              >
                <span>매장 정보</span>
              </button>

              <button
                type="button"
                onClick={() => onChange?.('review')}
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
