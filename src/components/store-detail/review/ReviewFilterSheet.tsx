import { useEffect, useMemo, useState } from 'react'
import { BottomSheet } from '../../BottomSheet'
import { FilterNavbar } from '../../FilterNavbar'
import { FilterChipsGroup } from '../../FilterChipsGroup'
import FilterBottomActions from '../../FilterBottomActions'
import { getReviewFilterDesigns } from '@/apis/shop'
import {
  DESIGN_STYLE_OPTIONS,
  SHAPE_OPTIONS,
  FLAVOR_OPTIONS,
  TOPPINGS_OPTIONS,
  SPECIAL_OPTIONS,
} from '@/constants/filter'

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

const DEFAULT_FILTERS: ReviewFilters = {
  gallery: [],
  style: [],
  shape: [],
  base: [],
  topping: [],
  special: [],
}

export default function ReviewFilterSheet({
  shopId,
  isOpen,
  onClose,
  value,
  onApply,
}: {
  shopId: number
  isOpen: boolean
  onClose: () => void
  value: ReviewFilters
  onApply: (next: ReviewFilters) => void
}) {
  const [activeTab, setActiveTab] = useState<TabKey>('gallery')
  const [draft, setDraft] = useState<ReviewFilters>(value)

  const [galleryOptions, setGalleryOptions] = useState<ChipOption[]>([])
  const [galleryLoading, setGalleryLoading] = useState(false)

  useEffect(() => {
    setDraft(value)
  }, [value])

  useEffect(() => {
    if (!isOpen) return

    const run = async () => {
      setGalleryLoading(true)
      try {
        const res = await getReviewFilterDesigns(shopId)
        const opts: ChipOption[] = (res.items ?? []).map((it) => ({
          value: String(it.designId),
          label: it.designName,
        }))
        setGalleryOptions(opts)
      } catch {
        setGalleryOptions([])
      } finally {
        setGalleryLoading(false)
      }
    }

    run()
  }, [isOpen, shopId])

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
    <BottomSheet isOpen={isOpen} title="필터" onClose={onClose} allowPeek={false}>
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
              options={galleryOptions}
              value={draft.gallery}
              onChange={setField('gallery')}
            />
            {galleryLoading && <div className="text-xs text-gray-400">불러오는 중...</div>}
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-12">
            <FilterChipsGroup
              title="디자인 스타일"
              options={DESIGN_STYLE_OPTIONS}
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
              options={FLAVOR_OPTIONS}
              value={draft.base}
              onChange={setField('base')}
            />
            <FilterChipsGroup
              title="토핑 / 데코레이션"
              options={TOPPINGS_OPTIONS}
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
