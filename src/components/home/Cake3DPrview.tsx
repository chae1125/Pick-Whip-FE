import { useMemo, useState } from 'react'
import Cake3DActions from './Cake3DActions'
import PopularCakeList from './PopularCakeList'
import { CakeTopTopping } from './CakeTopTopping'
import StrawberryTopper from './StrawberryTopper'
import BlueberryTopper from './BlueberryTopper'
import OreoTriplet from './OreoTriplet'

type CakeColor = 'red' | 'blue' | 'pink'
type ToppingType = 'strawberry' | 'blueberry' | 'oreo' | 'none'

type CakeVisual = {
  icingColor: string
  dot: { from: string; to: string }

  creamColor: string
  sheetColor: string
  toppingType?: ToppingType
}

type CakeDetailOption = { label: string; value: string } | { label: string; value: string[] }

type PopularCake = {
  id: number
  shopName: string
  cakeName: string
  text: string
  color: CakeColor

  visual: CakeVisual
  detailOptions: CakeDetailOption[]
}

const dummyCakes: PopularCake[] = [
  {
    id: 1,
    shopName: '해피 데이',
    cakeName: '딸기 생크림 케이크',
    text: 'I love you ❤️',
    color: 'red',
    visual: {
      icingColor: '#ffffff',
      dot: { from: '#EF4D3C', to: '#D32512' },
      creamColor: '#FFF6E9',
      sheetColor: '#E8CFA9',
      toppingType: 'strawberry',
    },
    detailOptions: [
      { label: '디자인', value: '1호 원형' },
      { label: '맛', value: '초코 시트 + 생크림' },
      { label: '레터링', value: ['I love you ❤️', '가운데 정렬 + 1번'] },
    ],
  },
  {
    id: 2,
    shopName: '올데이',
    cakeName: '블루베리 케이크',
    text: '생일 축하해 ❤️',
    color: 'blue',
    visual: {
      icingColor: '#EAF0FF',
      dot: { from: '#6B78D1', to: '#3E4CB8' },
      creamColor: '#ffffff',
      sheetColor: '#E8CFA9',
      toppingType: 'blueberry',
    },
    detailOptions: [
      { label: '디자인', value: '1호 원형' },
      { label: '맛', value: '바닐라 시트 + 요거트 크림' },
      { label: '레터링', value: ['생일 축하해 ❤️', '왼쪽 정렬 + 2번'] },
    ],
  },
  {
    id: 3,
    shopName: '메종 드 블루',
    cakeName: '크리스마스 케이크',
    text: '메리 크리스마스 ❤️',
    color: 'pink',
    visual: {
      icingColor: '#F4E3E3',
      dot: { from: '#EF4D3C', to: '#D32512' },
      creamColor: '#fffeeb',
      sheetColor: '#F2C9D3',
      toppingType: 'oreo',
    },
    detailOptions: [
      { label: '디자인', value: '2호 원형' },
      { label: '맛', value: '딸기 시트 + 크림치즈' },
      { label: '레터링', value: ['메리 크리스마스 ❤️', '가운데 정렬 + 1번'] },
    ],
  },
]

function CakeTopView({ text, visual }: { text: string; visual: CakeVisual }) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="relative h-[220px] w-[220px] rounded-full bg-[var(--color-main-pink-30)] flex items-center justify-center"
        style={{ filter: 'drop-shadow(0px 0px 20px #00000059)' }}
      >
        <div
          className="h-[170px] w-[170px] rounded-full border-2 border-[#7A7A7A] flex items-center justify-center relative"
          style={{ background: visual.icingColor }}
        >
          <CakeTopTopping visual={visual} radius={60} size="xl" />

          <div className="rounded-lg border border-[#99A1AF] bg-white px-2 py-1 text-[11px] font-semibold z-10">
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}

function CakeSideView({ visual }: { visual: CakeVisual }) {
  const topping = visual.toppingType ?? 'none'

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="flex flex-col items-center"
        style={{ filter: 'drop-shadow(0px 0px 20px #00000059)' }}
      >
        <div className="h-[56px] w-[210px] flex items-end justify-center gap-6">
          {topping === 'strawberry' && (
            <>
              <StrawberryTopper size={30} />
              <StrawberryTopper size={30} />
              <StrawberryTopper size={30} />
            </>
          )}

          {topping === 'blueberry' && (
            <>
              <BlueberryTopper size={18} />
              <BlueberryTopper size={18} />
              <BlueberryTopper size={18} />
            </>
          )}

          {topping === 'oreo' && (
            <>
              <div style={{ transform: 'rotate(90deg)' }}>
                <OreoTriplet barW={6} barH={30} gap={2} />
              </div>
              <div style={{ transform: 'rotate(90deg)' }}>
                <OreoTriplet barW={6} barH={30} gap={2} />
              </div>
              <div style={{ transform: 'rotate(270deg)' }}>
                <OreoTriplet barW={6} barH={30} gap={2} />
              </div>
            </>
          )}
        </div>

        <div className="relative h-[150px] w-[210px] overflow-hidden rounded-[6px]">
          <div
            className="absolute right-0 top-0 h-full w-[105px] border-t-[10px] border-r-[10px] rounded-r-[6px]"
            style={{
              borderTopColor: visual.icingColor,
              borderRightColor: visual.icingColor,
            }}
          />

          <div className="absolute right-[14px] top-[16px] z-10 flex w-[100px] flex-col gap-[14px]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative">
                <div
                  className="h-[34px] w-full rounded-[12px]"
                  style={{ background: visual.sheetColor }}
                />
                {i !== 2 && (
                  <div
                    className="absolute -bottom-[10px] left-0 h-[7px] w-full rounded-full"
                    style={{ background: visual.creamColor }}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            className="absolute left-0 top-0 z-30 h-full w-[52%]"
            style={{ background: visual.icingColor }}
          />
        </div>

        <div className="pointer-events-none flex flex-col items-center">
          <div className="z-20 h-[20px] w-[260px] rounded-[4px] bg-[var(--color-main-pink-30)]" />
          <div className="mx-auto -mt-2 h-[30px] w-[110px] bg-[#EBCBCB]" />
          <div className="mx-auto -mt-2 h-[20px] w-[165px] rounded-[4px] bg-[var(--color-main-pink-30)]" />
        </div>
      </div>
    </div>
  )
}

export default function Cake3DPreview() {
  const [index, setIndex] = useState(0)
  const [selectedId, setSelectedId] = useState(dummyCakes[0].id)

  const selectedCake = useMemo(
    () => dummyCakes.find((c) => c.id === selectedId) ?? dummyCakes[0],
    [selectedId],
  )

  return (
    <section className="mt-6">
      <p className="text-center !text-[22px] font-bold text-[var(--color-sub-brown-200)]">
        {index === 0 ? 'TOP' : 'SIDE'}
      </p>

      <div className="overflow-hidden flex items-center justify-center w-full h-[340px]">
        <div
          className="flex transition-transform duration-300 h-full" // ✅ h-full 추가
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          <div className="w-full flex-shrink-0 h-full flex items-center justify-center">
            <CakeTopView text={selectedCake.text} visual={selectedCake.visual} />
          </div>

          <div className="w-full flex-shrink-0 h-full flex items-center justify-center">
            <CakeSideView visual={selectedCake.visual} />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-[var(--color-main-red-100)]' : 'bg-white'}`}
          />
        ))}
      </div>

      <Cake3DActions
        shopName={selectedCake.shopName}
        cakeName={selectedCake.cakeName}
        options={selectedCake.detailOptions}
        onToggleMyPick={() => console.log('찜')}
      />

      <PopularCakeList
        cakes={dummyCakes}
        selectedId={selectedId}
        view={index === 0 ? 'top' : 'side'}
        onSelect={(id) => {
          setSelectedId(id)
        }}
      />
    </section>
  )
}
