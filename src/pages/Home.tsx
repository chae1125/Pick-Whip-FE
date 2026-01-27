import { useState } from 'react'
import { SearchInput } from '../components/input/SearchInput'
import { BottomSheet } from '../components/BottomSheet'
import StoreCard from '../components/StoreCard'

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <div className="p-4">
      <SearchInput value={keyword} onChange={setKeyword} onSubmit={() => setIsSheetOpen(true)} />

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="검색 결과"
        description={'다가오는 크리스마스,\n마음에 쏙 드는 선물을 찾아보세요!'}
      >
        <StoreCard
          image={''}
          tags={['크리스마스', '기념일', '파티']}
          name={'스위트 드림즈 베이커리'}
          star={4.25}
          distance={2.5}
          minprice={20000}
          maxprice={100000}
        />
      </BottomSheet>
    </div>
  )
}
