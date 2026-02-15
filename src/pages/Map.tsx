import { useCallback, useEffect, useRef, useState } from 'react'
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
import { getNearbyShops, type NearbyShopItem } from '@/apis/shop'
import type { MapBounds, MapShop } from '@/apis/map'
import StoreCard from '@/components/StoreCard'
import ShopDetailPage from '@/pages/ShopDetailPage'
import RadiusDropdown from '@/components/map/RadiusDropdown'

export default function Map() {
  const [shops, setShops] = useState<MapShop[]>([])
  const [isMyPick, setIsMyPick] = useState<boolean>(false)
  const [nearbyShops, setNearbyShops] = useState<NearbyShopItem[]>([])
  const [nearbyLoading, setNearbyLoading] = useState(false)
  const [nearbyError, setNearbyError] = useState<string | null>(null)
  const [currentRadius, setCurrentRadius] = useState<number>(1000)
  const RADIUS_OPTIONS = [300, 500, 800, 1000, 1500, 3000]
  const [isNearbyOpen, setIsNearbyOpen] = useState(false)
  const [nearbyAllowPeek, setNearbyAllowPeek] = useState(true)
  const [nearbyOpenRatio, setNearbyOpenRatio] = useState<number | undefined>(undefined)
  const prevNearbyOpenRef = useRef<boolean>(false)
  const nearbyOpenTimerRef = useRef<number | null>(null)
  const DEFAULT_LOCATION = { lat: 37.5665, lng: 126.978 }
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null)
  const initialMyLocationRef = useRef<{ lat: number; lng: number } | null>(null)
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null)
  const currentRadiusRef = useRef<number>(currentRadius)

  const showNearbyPeek = () => {
    if (nearbyOpenTimerRef.current) {
      window.clearTimeout(nearbyOpenTimerRef.current)
      nearbyOpenTimerRef.current = null
    }
    setNearbyAllowPeek(true)
    setNearbyOpenRatio(0.12)
    nearbyOpenTimerRef.current = window.setTimeout(() => {
      setIsNearbyOpen(true)
      nearbyOpenTimerRef.current = null
    }, 60)
  }

  useEffect(() => {
    return () => {
      if (nearbyOpenTimerRef.current) {
        window.clearTimeout(nearbyOpenTimerRef.current)
        nearbyOpenTimerRef.current = null
      }
    }
  }, [currentRadius])

  const handleUserLocation = (loc: { lat: number; lng: number } | null) => {
    const base = loc ?? DEFAULT_LOCATION
    setMyLocation(base)
    if (!initialMyLocationRef.current) initialMyLocationRef.current = base
    void fetchNearby(base.lat, base.lng, currentRadiusRef.current)
  }

  const fetchNearby = useCallback(async (lat: number, lon: number, radius: number) => {
    setNearbyLoading(true)
    setNearbyError(null)
    try {
      const list = await getNearbyShops(lat, lon, radius)
      setNearbyShops(list)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setNearbyError(msg || '주변 가게 조회 실패')
    } finally {
      setNearbyLoading(false)
    }
  }, [])

  useEffect(() => {
    currentRadiusRef.current = currentRadius
  }, [currentRadius])

  function handleRadiusChange(r: number) {
    setCurrentRadius(r)
    skipBoundsRef.current = true
    const center = mapCenter ?? myLocation
    if (center) {
      void fetchNearby(center.lat, center.lng, r)
    }
    window.setTimeout(() => {
      skipBoundsRef.current = false
    }, 800)
  }

  const openShopDetail = (shopId: number) => {
    setSelectedShopId(shopId)
    setIsChildSheetOpen(true)
    prevNearbyOpenRef.current = isNearbyOpen
    setNearbyAllowPeek(false)
    setIsNearbyOpen(false)
  }

  const closeShopDetail = () => {
    setSelectedShopId(null)
    setIsChildSheetOpen(false)
    setNearbyAllowPeek(true)
    setNearbyOpenRatio(0.12)
    setIsNearbyOpen(true)
  }

  const boundsDebounceRef = useRef<number | null>(null)
  const skipBoundsRef = useRef<boolean>(false)

  function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (v: number) => (v * Math.PI) / 180
    const R = 6371000
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  function formatRadiusLabel(meters: number) {
    if (meters < 1000) return `${meters}m`
    const km = meters / 1000
    return `${Number(km % 1 === 0 ? km.toFixed(0) : km.toFixed(1))}km`
  }

  const handleBoundsChange = useCallback((bounds: MapBounds) => {
    const centerLat = (bounds.lowLat + bounds.highLat) / 2
    const centerLon = (bounds.lowLon + bounds.highLon) / 2
    setMapCenter({ lat: centerLat, lng: centerLon })

    void (async () => {
      try {
        const data = await getShopsInMap(bounds)
        if (data.isSuccess) setShops(data.result?.shops ?? [])
      } catch (err: unknown) {
        console.error('getShopsInMap failed', err)
      }
    })()

    if (boundsDebounceRef.current) window.clearTimeout(boundsDebounceRef.current)
    boundsDebounceRef.current = window.setTimeout(async () => {
      if (skipBoundsRef.current) {
        skipBoundsRef.current = false
        return
      }
      try {
        setNearbyLoading(true)
        setNearbyError(null)
        const list = await getNearbyShops(centerLat, centerLon, currentRadiusRef.current)
        setNearbyShops(list)
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        setNearbyError(msg ?? '주변 가게 조회 실패')
      } finally {
        setNearbyLoading(false)
      }
    }, 300)
  }, [])

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isChildSheetOpen, setIsChildSheetOpen] = useState(false)
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
    prevNearbyOpenRef.current = isNearbyOpen
    setNearbyAllowPeek(false)
    setIsNearbyOpen(false)
    setIsFilterOpen(true)
  }

  const closeFilter = () => {
    setIsFilterOpen(false)
    showNearbyPeek()
  }

  const handleApply = () => {
    setAppliedFilters(tempFilters)
    setAppliedPickupDate(tempPickupDate)
    setAppliedIsTodayPickup(tempIsTodayPickup)
    setAppliedPriceRange(tempPriceRange)
    setIsFilterOpen(false)
    showNearbyPeek()
  }

  useEffect(() => {
    return () => {
      if (nearbyOpenTimerRef.current) window.clearTimeout(nearbyOpenTimerRef.current)
    }
  }, [])

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

  useEffect(() => {
    if (!isFilterOpen && !isChildSheetOpen) {
      showNearbyPeek()
    } else {
      if (nearbyOpenTimerRef.current) {
        window.clearTimeout(nearbyOpenTimerRef.current)
        nearbyOpenTimerRef.current = null
      }
      setIsNearbyOpen(false)
    }
  }, [isFilterOpen, isChildSheetOpen])

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
        <KakaoMap
          onBoundsChange={handleBoundsChange}
          shops={shops}
          isMyPick={isMyPick}
          onMapReady={() => {
            setIsNearbyOpen(true)
          }}
          onChildSheetOpen={(open: boolean) => {
            setIsChildSheetOpen(open)
            if (open) {
              prevNearbyOpenRef.current = isNearbyOpen
              setNearbyAllowPeek(false)
              setIsNearbyOpen(false)
              setIsFilterOpen(false)
            } else {
              setNearbyAllowPeek(true)
              setNearbyOpenRatio(0.12)
              setIsNearbyOpen(true)
            }
          }}
          onUserLocation={handleUserLocation}
        />
      </div>

      <BottomSheet isOpen={isFilterOpen} title="필터" onClose={closeFilter} allowPeek={false}>
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

      <BottomSheet
        isOpen={Boolean(selectedShopId)}
        allowPeek={false}
        onClose={closeShopDetail}
        title=""
        sheetBg="#FCF4F3"
      >
        {({ isFull }) =>
          selectedShopId ? (
            <ShopDetailPage shopId={selectedShopId} onBack={closeShopDetail} sheetFull={isFull} />
          ) : null
        }
      </BottomSheet>

      <BottomSheet
        isOpen={isNearbyOpen}
        title="가게 목록"
        onClose={() => setIsNearbyOpen(false)}
        sheetBg="#FCF4F3"
        allowPeek={nearbyAllowPeek}
        openRatio={nearbyOpenRatio}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-4 mt-2 pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm text-[#364153]">
                주변 <span className="font-semibold">{formatRadiusLabel(currentRadius)}</span> 이내
              </div>
              <div>
                <RadiusDropdown
                  value={currentRadius}
                  options={RADIUS_OPTIONS}
                  onChange={(val) => {
                    setCurrentRadius(val)
                    handleRadiusChange(val)
                  }}
                />
              </div>
            </div>

            {nearbyLoading && (
              <div className="p-4 text-center text-sm text-gray-600">
                주변 가게를 불러오는 중입니다…
              </div>
            )}

            {nearbyError && (
              <div className="p-4 text-center text-sm text-red-600">{nearbyError}</div>
            )}

            {!nearbyLoading && !nearbyError && nearbyShops.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-600">
                주변에 등록된 가게가 없습니다.
              </div>
            )}

            <div className="flex flex-col gap-4">
              {nearbyShops.map((s) => {
                let displayDistance = 0

                const baseLoc = initialMyLocationRef.current ?? myLocation ?? DEFAULT_LOCATION

                if (baseLoc && s.lat && s.lon) {
                  const distMeters = haversineMeters(baseLoc.lat, baseLoc.lng, s.lat, s.lon)
                  displayDistance = distMeters / 1000
                } else {
                  displayDistance =
                    typeof s.distance === 'number' ? s.distance : parseFloat(s.distance ?? '0')
                }

                return (
                  <StoreCard
                    key={s.shopId}
                    onClick={() => openShopDetail(s.shopId)}
                    image={s.shopImageUrl ?? ''}
                    tags={s.tags ?? []}
                    name={s.shopName}
                    star={s.averageRating ?? 0}
                    distance={Number(displayDistance.toFixed(2))}
                    minprice={s.minPrice ?? 0}
                    maxprice={s.maxPrice ?? 0}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
