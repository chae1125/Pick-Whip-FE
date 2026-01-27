import { useState } from 'react'
import { MapInput } from '../components/input/MapInput'
import { BottomSheet } from '../components/BottomSheet'
import KakaoMap from '../components/map/KakaoMap'

export default function Map() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [keyword, setKeyword] = useState('')

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-18 left-0 right-0 z-30 pointer-events-none">
        <div className="p-4 pointer-events-auto">
          <MapInput
            value={keyword}
            onChange={setKeyword}
            onFilterClick={() => setIsFilterOpen(true)}
          />
        </div>
      </div>

      <div className="w-full h-full border-none">
        <KakaoMap />
      </div>

      <BottomSheet isOpen={isFilterOpen} title="필터" onClose={() => setIsFilterOpen(false)}>
        <div className="p-4">{/* 필터 옵션 */}</div>
      </BottomSheet>
    </div>
  )
}
