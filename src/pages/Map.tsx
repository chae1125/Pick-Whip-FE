import { useCallback, useState } from 'react'
import { MapInput } from '../components/input/MapInput'
import { BottomSheet } from '../components/BottomSheet'
import KakaoMap from '../components/map/KakaoMap'
import FilterNavbar from '@/components/FilterNavbar'
import FilterBottomActions from '@/components/FilterBottomActions'
import FilterChipsGroup from '@/components/FilterChipsGroup'
import PickUpCalendar from '@/components/calendar/PickUpCalendar'
import PriceRangeSlider from '@/components/PriceRangeSlider'
import FilterSummary from '@/components/FilterSummary'
import type { FilterState, PriceRange } from '@/types/filter'
import {
  FILTER_TABS,
  REGION_OPTIONS,
  HOTSPOT_OPTIONS,
  INITIAL_FILTERS,
  INITIAL_PRICE,
  INITIAL_DATE,
} from '@/constants/filter'
import { getShopsInMap } from '@/apis/map'
import type { MapBounds, MapShop } from '@/apis/map'

export default function Map() {
  const [shops, setShops] = useState<MapShop[]>([])
  const [isMyPick, setIsMyPick] = useState<boolean>(false)

  const handleBoundsChange = useCallback(async (bounds: MapBounds) => {
    const data = await getShopsInMap(bounds)
    if (data.isSuccess) setShops(data.result?.shops ?? [])
  }, [])

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [activeKey, setActivekey] = useState<string>(FILTER_TABS[0].key)

  const [appliedFilters, setAppliedFilters] = useState<FilterState>(INITIAL_FILTERS)
  const [appliedPickupDate, setAppliedPickupDate] = useState<Date>(INITIAL_DATE)
  const [appliedIsTodayPickup, setAppliedIsTodayPickup] = useState(false)
  const [appliedPriceRange, setAppliedPriceRange] = useState<PriceRange>(INITIAL_PRICE)

  const [tempFilters, setTempFilters] = useState<FilterState>(INITIAL_FILTERS)
  const [tempPickupDate, setTempPickupDate] = useState<Date>(INITIAL_DATE)
  const [tempIsTodayPickup, setTempIsTodayPickup] = useState(false)
  const [tempPriceRange, setTempPriceRange] = useState<PriceRange>(INITIAL_PRICE)

  const selectedRegionValue = tempFilters.regions[0]
  const selectedRegionLabel = REGION_OPTIONS.find((r) => r.value === selectedRegionValue)?.label

  const handleOpenFilter = () => {
    setTempFilters(appliedFilters)
    setTempPickupDate(appliedPickupDate)
    setTempIsTodayPickup(appliedIsTodayPickup)
    setTempPriceRange(appliedPriceRange)
    setIsFilterOpen(true)
  }

  const handleApply = () => {
    setAppliedFilters(tempFilters)
    setAppliedPickupDate(tempPickupDate)
    setAppliedIsTodayPickup(tempIsTodayPickup)
    setAppliedPriceRange(tempPriceRange)
    setIsFilterOpen(false)
  }

  const handleReset = () => {
    switch (activeKey) {
      case 'date':
        setTempPickupDate(INITIAL_DATE)
        setTempIsTodayPickup(false)
        break
      case 'region':
        setTempFilters((prev) => ({ ...prev, regions: [], hotspots: [] }))
        break
      case 'style':
        setTempFilters((prev) => ({
          ...prev,
          designStyles: [],
          shapes: [],
          flavors: [],
          toppings: [],
          specialOptions: [],
        }))
        break
      case 'purpose':
        setTempFilters((prev) => ({ ...prev, purpose: [] }))
        break
      case 'price':
        setTempPriceRange(INITIAL_PRICE)
        break
    }
  }

  const handleSummaryChipClick = (tabKey: string) => {
    setActivekey(tabKey)
    handleOpenFilter()
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-18 left-0 right-0 z-30 pointer-events-none">
        <div className="px-4 py-2 pointer-events-auto">
          <MapInput value={keyword} onChange={setKeyword} onFilterClick={handleOpenFilter} />
        </div>

        <div className="pointer-events-auto px-4 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => setIsMyPick(!isMyPick)}
            className={`
              flex items-center gap-1 px-3 py-1.5 rounded-full !text-[14px] font-semibold border transition-all shrink-0
              ${
                isMyPick
                  ? 'bg-[#FE577A] border-[#FE577A] text-white'
                  : 'bg-white border-gray-200 text-[#0A0A0A] hover:bg-gray-50'
              }
            `}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={isMyPick ? '#FFFFFF' : 'none'}
              stroke={isMyPick ? '#FFFFFF' : '#373E49'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            My Pick!
          </button>

          <FilterSummary
            filters={appliedFilters}
            pickupDate={appliedPickupDate}
            isTodayPickup={appliedIsTodayPickup}
            regionOptions={REGION_OPTIONS}
            hotspotOptions={HOTSPOT_OPTIONS}
            priceRange={appliedPriceRange}
            onChipsClick={handleSummaryChipClick}
          />
        </div>
      </div>

      <div className="w-full h-full border-none">
        <KakaoMap onBoundsChange={handleBoundsChange} shops={shops} isMyPick={isMyPick} />
      </div>

      <BottomSheet isOpen={isFilterOpen} title="필터" onClose={() => setIsFilterOpen(false)}>
        <div className="flex flex-col h-full">
          <div className="flex-none px-1 pt-1">
            <FilterNavbar items={FILTER_TABS} activeKey={activeKey} onChange={setActivekey} />
          </div>

          <div className="flex-1 overflow-y-auto px-1 mt-4 scrollbar-hide">
            {activeKey === 'date' && (
              <div className="pb-4">
                <PickUpCalendar value={tempPickupDate} onChange={setTempPickupDate} />
                <label className="mt-4 flex items-center gap-2 px-1 text-[14px] text-[#0A0A0A]">
                  <input
                    type="checkbox"
                    checked={tempIsTodayPickup}
                    onChange={(e) => setTempIsTodayPickup(e.target.checked)}
                    className="h-4 w-4 accent-[var(--color-main-pink-50)]"
                  />
                  오늘 픽업 가능한 곳
                </label>
              </div>
            )}

            {activeKey === 'region' && (
              <div className="pb-4">
                <div className="mt-4">
                  <FilterChipsGroup
                    title="내 지역"
                    options={REGION_OPTIONS}
                    value={tempFilters.regions}
                    onChange={(newRegions) =>
                      setTempFilters((prev) => ({
                        ...prev,
                        regions: newRegions,
                        hotspots: [],
                      }))
                    }
                    multiple={false}
                  />
                </div>

                {selectedRegionValue && (
                  <div className="mt-6">
                    <FilterChipsGroup
                      title={
                        <span>
                          <span className="text-[#8E0B0A]">{selectedRegionLabel}</span>
                          {' 핫플레이스'}
                        </span>
                      }
                      options={HOTSPOT_OPTIONS[selectedRegionValue] ?? []}
                      value={tempFilters.hotspots}
                      onChange={(newHotspots) =>
                        setTempFilters((prev) => ({ ...prev, hotspots: newHotspots }))
                      }
                      multiple={false}
                    />
                  </div>
                )}
              </div>
            )}

            {activeKey === 'style' && (
              <div className="pb-4">
                <div className="mt-4">
                  <FilterChipsGroup
                    title="디자인 스타일"
                    options={[
                      { label: '미니멀', value: 'minimal' },
                      { label: '화려한', value: 'decorated' },
                      { label: '빈티지', value: 'vintage' },
                      { label: '모던', value: 'modern' },
                      { label: '러블리', value: 'lovely' },
                      { label: '앤틱', value: 'antique' },
                      { label: '심플', value: 'simple' },
                      { label: '럭셔리', value: 'luxury' },
                    ]}
                    value={tempFilters.designStyles}
                    onChange={(newDesignStyles) =>
                      setTempFilters((prev) => ({ ...prev, designStyles: newDesignStyles }))
                    }
                  />
                </div>
                <div className="mt-6">
                  <FilterChipsGroup
                    title="케이크 형태"
                    options={[
                      { label: '원형', value: 'circle' },
                      { label: '하트', value: 'heart' },
                      { label: '사각', value: 'square' },
                    ]}
                    value={tempFilters.shapes}
                    onChange={(newShapes) =>
                      setTempFilters((prev) => ({ ...prev, shapes: newShapes }))
                    }
                  />
                </div>
                <div className="mt-6">
                  <FilterChipsGroup
                    title="맛 / 베이스"
                    options={[
                      { label: '바닐라', value: 'vanilla' },
                      { label: '초콜릿', value: 'chocolate' },
                      { label: '딸기', value: 'strawberry' },
                      { label: '말차', value: 'green_tea' },
                      { label: '치즈', value: 'cheese' },
                      { label: '티라미수', value: 'tiramisu' },
                      { label: '레드벨벳', value: 'red_velvet' },
                      { label: '당근', value: 'carrot' },
                      { label: '얼그레이', value: 'earl_grey' },
                    ]}
                    value={tempFilters.flavors}
                    onChange={(newFlavors) =>
                      setTempFilters((prev) => ({ ...prev, flavors: newFlavors }))
                    }
                  />
                </div>
                <div className="mt-6">
                  <FilterChipsGroup
                    title="토핑 / 데코레이션"
                    options={[
                      { label: '생과일', value: 'fruit' },
                      { label: '마카롱', value: 'macaron' },
                      { label: '생화', value: 'flower' },
                      { label: '조화', value: 'artificial_flower' },
                      { label: '금박', value: 'gold_leaf' },
                      { label: '초콜릿', value: 'chocolate' },
                      { label: '쿠키', value: 'cookie' },
                      { label: '머랭', value: 'meringue' },
                    ]}
                    value={tempFilters.toppings}
                    onChange={(newToppings) =>
                      setTempFilters((prev) => ({ ...prev, toppings: newToppings }))
                    }
                  />
                </div>
                <div className="mt-6">
                  <FilterChipsGroup
                    title="특별 옵션"
                    options={[
                      { label: '포토케이크', value: 'photo_cake' },
                      { label: '레터링', value: 'lettering' },
                      { label: '아이돌', value: 'idol' },
                      { label: '글루텐프리', value: 'gluten_free' },
                      { label: '비건', value: 'vegan' },
                    ]}
                    value={tempFilters.specialOptions}
                    onChange={(newSpecialOptions) =>
                      setTempFilters((prev) => ({ ...prev, specialOptions: newSpecialOptions }))
                    }
                  />
                </div>
              </div>
            )}

            {activeKey === 'purpose' && (
              <div className="pb-4">
                <div className="mt-4">
                  <FilterChipsGroup
                    title="케이크 용도"
                    options={[
                      { label: '생일', value: 'birthday' },
                      { label: '기념일', value: 'anniversary' },
                      { label: '크리스마스', value: 'christmas' },
                      { label: '졸업', value: 'graduation' },
                      { label: '개업', value: 'opening' },
                    ]}
                    value={tempFilters.purpose}
                    onChange={(newPurpose) =>
                      setTempFilters((prev) => ({ ...prev, purpose: newPurpose }))
                    }
                  />
                </div>
              </div>
            )}

            {activeKey === 'price' && (
              <div className="pb-4">
                <div className="mt-6 mb-8">
                  <PriceRangeSlider
                    min={0}
                    max={200000}
                    onChange={(min, max) => setTempPriceRange({ min, max })}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex-none bg-white border-t border-gray-100">
            <FilterBottomActions onReset={handleReset} onApply={handleApply} />
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
