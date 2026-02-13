import { useMemo } from 'react'
import type { ChipOption, FilterState, PriceRange } from '@/types/filter'

const KOREAN_MAP: Record<string, string> = {
  minimal: '미니멀',
  decorated: '화려한',
  vintage: '빈티지',
  modern: '모던',
  lovely: '러블리',
  antique: '앤틱',
  simple: '심플',
  luxury: '럭셔리',
  circle: '원형',
  heart: '하트',
  square: '사각',
  vanilla: '바닐라',
  chocolate: '초콜릿',
  strawberry: '딸기',
  green_tea: '말차',
  cheese: '치즈',
  tiramisu: '티라미수',
  red_velvet: '레드벨벳',
  carrot: '당근',
  earl_grey: '얼그레이',
  fruit: '생과일',
  macaron: '마카롱',
  flower: '생화',
  artificial_flower: '조화',
  gold_leaf: '금박',
  cookie: '쿠키',
  meringue: '머랭',
  photo_cake: '포토케이크',
  lettering: '레터링',
  idol: '아이돌',
  gluten_free: '글루텐프리',
  vegan: '비건',
  birthday: '생일',
  anniversary: '기념일',
  christmas: '크리스마스',
  graduation: '졸업',
  opening: '개업',
}

const PURPOSE_OPTIONS: ChipOption[] = [
  { label: '생일', value: 'birthday' },
  { label: '기념일', value: 'anniversary' },
  { label: '크리스마스', value: 'christmas' },
  { label: '졸업', value: 'graduation' },
  { label: '개업', value: 'opening' },
]

interface FilterSummaryProps {
  filters: FilterState
  pickupDate: Date
  isTodayPickup: boolean
  regionOptions: ChipOption[]
  hotspotOptions: Record<string, ChipOption[]>
  priceRange: PriceRange
  onChipsClick?: (key: string) => void
}

interface FilterChipItem {
  key: string
  id: string
  text: string
}

export default function FilterSummary({
  filters,
  regionOptions,
  hotspotOptions,
  priceRange,
  onChipsClick,
}: FilterSummaryProps) {
  const regionChips = useMemo<FilterChipItem[]>(() => {
    if (filters.hotspots.length > 0) {
      const selectedRegion = filters.regions[0]
      const options = hotspotOptions[selectedRegion] || []

      return filters.hotspots.map((hotspot) => ({
        key: 'region',
        id: `hotspot-${hotspot}`,
        text: getLabel(hotspot, options),
      }))
    }

    if (filters.regions.length > 0) {
      return filters.regions.map((region) => ({
        key: 'region',
        id: `region-${region}`,
        text: getLabel(region, regionOptions),
      }))
    }

    return []
  }, [filters.regions, filters.hotspots, regionOptions, hotspotOptions])

  const styleChip = useMemo<FilterChipItem | null>(() => {
    const allStyleValues = [
      ...filters.designStyles,
      ...filters.shapes,
      ...filters.flavors,
      ...filters.toppings,
      ...filters.specialOptions,
    ]

    if (allStyleValues.length === 0) return null

    return {
      key: 'style',
      id: 'style-summary',
      text: formatLabel(allStyleValues, []),
    }
  }, [filters])

  const purposeChip = useMemo<FilterChipItem | null>(() => {
    if (filters.purpose.length === 0) return null
    return {
      key: 'purpose',
      id: 'purpose-summary',
      text: formatLabel(filters.purpose, PURPOSE_OPTIONS),
    }
  }, [filters.purpose])

  const priceChip = useMemo<FilterChipItem | null>(() => {
    if (priceRange.min === 0 && priceRange.max === 200000) return null
    return {
      key: 'price',
      id: 'price-summary',
      text: `${priceRange.min.toLocaleString()}원 ~ ${priceRange.max.toLocaleString()}원`,
    }
  }, [priceRange])

  const allChips = [...regionChips, styleChip, purposeChip, priceChip].filter(
    (chip): chip is FilterChipItem => chip !== null,
  )

  return (
    <div className="flex gap-2 overflow-x-auto py-1.5 scrollbar-hide items-center">
      {allChips.map((chip) => (
        <button
          key={chip.id}
          onClick={() => onChipsClick?.(chip.key)}
          className="flex-shrink-0 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.05)] active:bg-gray-50 transition-colors"
        >
          <span className="text-[14px] font-medium text-[#0A0A0A] whitespace-nowrap">
            {chip.text}
          </span>
        </button>
      ))}
    </div>
  )
}

function convertToKorean(value: string) {
  return KOREAN_MAP[value] || value
}

function getLabel(value: string, options: ChipOption[]) {
  return options.find((o) => o.value === value)?.label || convertToKorean(value)
}

function formatLabel(selectedValues: string[], options: ChipOption[]) {
  if (selectedValues.length === 0) return ''

  const firstValue = selectedValues[0]
  const firstLabel = getLabel(firstValue, options)

  if (selectedValues.length === 1) {
    return firstLabel
  }
  return `${firstLabel} 외 ${selectedValues.length - 1}개`
}
