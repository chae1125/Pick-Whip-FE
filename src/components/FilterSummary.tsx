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

export default function FilterSummary({
  filters,
  regionOptions,
  hotspotOptions,
  priceRange,
  onChipsClick,
}: FilterSummaryProps) {
  const regionLabel = useMemo(() => {
    if (filters.hotspots.length > 0) {
      const selectedRegion = filters.regions[0]
      const options = hotspotOptions[selectedRegion] || []
      return formatLabel(filters.hotspots, options)
    }
    if (filters.regions.length > 0) {
      return formatLabel(filters.regions, regionOptions)
    }
    return null
  }, [filters.regions, filters.hotspots, regionOptions, hotspotOptions])

  const styleLabel = useMemo(() => {
    const allStyleValues = [
      ...filters.designStyles,
      ...filters.shapes,
      ...filters.flavors,
      ...filters.toppings,
      ...filters.specialOptions,
    ]

    if (allStyleValues.length === 0) return null

    return formatLabel(allStyleValues, [])
  }, [filters])

  const purposeLabel = useMemo(() => {
    return formatLabel(filters.purpose, PURPOSE_OPTIONS)
  }, [filters.purpose])

  const priceLabel = useMemo(() => {
    return `${priceRange.min.toLocaleString()}원 ~ ${priceRange.max.toLocaleString()}원`
  }, [priceRange])

  const chips = [
    { key: 'region', text: regionLabel, active: !!regionLabel },
    { key: 'style', text: styleLabel, active: !!styleLabel },
    { key: 'purpose', text: purposeLabel, active: !!purposeLabel },
    { key: 'price', text: priceLabel, active: priceRange.min !== 0 || priceRange.max !== 200000 },
  ].filter((c) => c.active)

  return (
    <div className="flex gap-2 overflow-x-auto py-1.5 no-scrollbar items-center">
      {chips.map((chip) => (
        <div
          key={chip.key}
          className="flex-shrink-0 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.05)] cursor-pointer active:bg-gray-50 transition-colors"
          onClick={() => onChipsClick?.(chip.key)}
        >
          <span className="text-[14px] font-medium text-[#0A0A0A] whitespace-nowrap">
            {chip.text}
          </span>
        </div>
      ))}
    </div>
  )
}

function convertToKorean(value: string) {
  return KOREAN_MAP[value] || value
}

function formatLabel(selectedValues: string[], options: ChipOption[]) {
  if (selectedValues.length === 0) return null

  const firstValue = selectedValues[0]
  const firstLabel =
    options.find((o) => o.value === firstValue)?.label || convertToKorean(firstValue)

  if (selectedValues.length === 1) {
    return firstLabel
  }
  return `${firstLabel} 외 ${selectedValues.length - 1}개`
}
