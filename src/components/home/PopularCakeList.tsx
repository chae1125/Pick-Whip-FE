import PopularCakeCard from './PopularCakeCard'

type ToppingType = 'strawberry' | 'blueberry' | 'oreo' | 'none'

type CakeVisual = {
  icingColor: string
  dot: { from: string; to: string }
  creamColor: string
  sheetColor: string
  toppingType?: ToppingType
}

type CakeColor = 'red' | 'blue' | 'pink'

type PopularCake = {
  id: number
  shopName: string
  cakeName: string
  text: string
  color: CakeColor
  visual: CakeVisual
}

type PopularCakeListProps = {
  cakes: PopularCake[]
  selectedId: number
  view: 'top' | 'side'
  onSelect: (id: number) => void
}

export default function PopularCakeList({
  cakes,
  selectedId,
  view,
  onSelect,
}: PopularCakeListProps) {
  return (
    <section className="mt-10 px-4">
      <p className="!mb-6 !text-[15px] !font-semibold text-left">인기 케이크 도안</p>

      <div className="flex justify-between gap-3">
        {cakes.map((cake) => (
          <PopularCakeCard
            key={cake.id}
            shopName={cake.shopName}
            cakeName={cake.cakeName}
            text={cake.text}
            active={cake.id === selectedId}
            onClick={() => onSelect(cake.id)}
            visual={cake.visual}
            view={view}
          />
        ))}
      </div>
    </section>
  )
}
