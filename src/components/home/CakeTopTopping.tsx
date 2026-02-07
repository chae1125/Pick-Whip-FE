import OreoTriplet from './OreoTriplet'

type ToppingType = 'strawberry' | 'blueberry' | 'oreo' | 'none'

type CakeVisual = {
  dot: { from: string; to: string }
  toppingType?: ToppingType
}

type Props = {
  visual: CakeVisual
  radius: number
  size?: 'sm' | 'xl'
}

const SIZE_MAP = {
  sm: { dot: 12, oreoW: 4, oreoH: 14, gap: 2 },
  xl: { dot: 20, oreoW: 8, oreoH: 30, gap: 3 },
}

export function CakeTopTopping({ visual, radius, size = 'xl' }: Props) {
  const topping = visual.toppingType ?? 'none'

  if (topping === 'none') return null

  const conf = SIZE_MAP[size]

  if (topping === 'oreo') {
    return [...Array(6)].map((_, i) => {
      const angle = i * 60

      return (
        <div
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
          }}
        >
          <OreoTriplet barW={conf.oreoW} barH={conf.oreoH} gap={conf.gap} />
        </div>
      )
    })
  }

  return [...Array(6)].map((_, i) => (
    <span
      key={i}
      className="absolute rounded-full"
      style={{
        width: conf.dot,
        height: conf.dot,
        background: `radial-gradient(
          50% 50% at 50% 50%,
          ${visual.dot.from} 0%,
          ${visual.dot.to} 100%
        )`,
        transform: `rotate(${i * 60}deg) translateY(-${radius}px)`,
      }}
    />
  ))
}
