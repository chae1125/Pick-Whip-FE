import { useMemo, useState } from 'react'
import { BottomSheet } from '../../BottomSheet'
import { FilterNavbar } from '../../FilterNavbar'
import { FilterChipsGroup } from '../../FilterChipsGroup'
import FilterBottomActions from '../../FilterBottomActions'

type ChipOption = { value: string; label: string }

export type ReviewFilters = {
  gallery: string[]
  style: string[]
  shape: string[]
  base: string[]
  topping: string[]
  special: string[]
}

const TABS = [
  { key: 'gallery', label: '디자인 갤러리' },
  { key: 'style', label: '스타일' },
] as const
type TabKey = (typeof TABS)[number]['key']
const TAB_ITEMS: { key: string; label: string }[] = [...TABS]

const GALLERY_OPTIONS: ChipOption[] = [
  { value: 'christmas_party', label: '크리스마스 파티 케이크' },
  { value: 'mini', label: '미니 케이크' },
]
const STYLE_OPTIONS: ChipOption[] = [
  { value: 'minimal', label: '미니멀' },
  { value: 'colorful', label: '화려한' },
]
const SHAPE_OPTIONS: ChipOption[] = [
  { value: 'round', label: '원형' },
  { value: 'heart', label: '하트' },
]
const BASE_OPTIONS: ChipOption[] = [
  { value: 'vanilla', label: '바닐라' },
  { value: 'choco', label: '초콜릿' },
]
const TOPPING_OPTIONS: ChipOption[] = [
  { value: 'fruit', label: '생과일' },
  { value: 'macaron', label: '마카롱' },
]
const SPECIAL_OPTIONS: ChipOption[] = [
  { value: 'photo', label: '포토케이크' },
  { value: 'lettering', label: '레터링' },
]

const DEFAULT_FILTERS: ReviewFilters = {
  gallery: [],
  style: [],
  shape: [],
  base: [],
  topping: [],
  special: [],
}

export default function ReviewFilterSheet({
  isOpen,
  onClose,
  value,
  onApply,
}: {
  isOpen: boolean
  onClose: () => void
  value: ReviewFilters
  onApply: (next: ReviewFilters) => void
}) {
  const [activeTab, setActiveTab] = useState<TabKey>('gallery')
  const [draft, setDraft] = useState<ReviewFilters>(value)

  const applyDisabled = useMemo(
    () =>
      !(
        draft.gallery.length ||
        draft.style.length ||
        draft.shape.length ||
        draft.base.length ||
        draft.topping.length ||
        draft.special.length
      ),
    [draft],
  )
  const setField = (k: keyof ReviewFilters) => (next: string[]) =>
    setDraft((prev) => ({ ...prev, [k]: next }))

  return (
    <BottomSheet isOpen={isOpen} title="필터" onClose={onClose}>
      <div className="space-y-6">
        <FilterNavbar
          items={TAB_ITEMS}
          activeKey={activeTab}
          onChange={(key: string) => (key === 'gallery' || key === 'style') && setActiveTab(key)}
        />

        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <FilterChipsGroup
              title="디자인 갤러리"
              options={GALLERY_OPTIONS}
              value={draft.gallery}
              onChange={setField('gallery')}
            />
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-12">
            <FilterChipsGroup
              title="디자인 스타일"
              options={STYLE_OPTIONS}
              value={draft.style}
              onChange={setField('style')}
            />
            <FilterChipsGroup
              title="케이크 형태"
              options={SHAPE_OPTIONS}
              value={draft.shape}
              onChange={setField('shape')}
            />
            <FilterChipsGroup
              title="맛 / 베이스"
              options={BASE_OPTIONS}
              value={draft.base}
              onChange={setField('base')}
            />
            <FilterChipsGroup
              title="토핑 / 데코레이션"
              options={TOPPING_OPTIONS}
              value={draft.topping}
              onChange={setField('topping')}
            />
            <FilterChipsGroup
              title="특별 옵션"
              options={SPECIAL_OPTIONS}
              value={draft.special}
              onChange={setField('special')}
            />
          </div>
        )}

        <div className="sticky bottom-0 bg-white pt-4">
          <FilterBottomActions
            onReset={() => {
              setDraft(DEFAULT_FILTERS)
              onApply(DEFAULT_FILTERS)
            }}
            onApply={() => {
              onApply(draft)
              onClose()
            }}
            applyDisabled={applyDisabled}
          />
        </div>
      </div>
    </BottomSheet>
  )
}
