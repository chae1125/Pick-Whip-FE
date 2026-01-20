import { useState } from 'react'
import { MapInput } from '../components/MapInput'
import { BottomSheet } from '../components/BottomSheet'

export default function Map() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [keyword, setKeyword] = useState('')

  return (
    <>
      <div className="flex flex-col items-center px-4 pt-4">
        <MapInput
          value={keyword}
          onChange={(value) => {
            setKeyword(value)
          }}
          onFilterClick={() => {
            setIsFilterOpen(true)
          }}
        />
      </div>

      <BottomSheet isOpen={isFilterOpen} title="필터" onClose={() => setIsFilterOpen(false)}>
        <div className="space-y-4">{/* 필터 옵션 컴포넌트 */}</div>
      </BottomSheet>
    </>
  )
}
