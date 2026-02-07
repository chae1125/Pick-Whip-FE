import { MapPin } from 'lucide-react'
import { CakeTopTopping } from './CakeTopTopping'

type ToppingType = 'strawberry' | 'blueberry' | 'oreo' | 'none'

export type CakeVisual = {
  icingColor: string
  dot: { from: string; to: string }
  creamColor: string
  sheetColor: string
  toppingType?: ToppingType
}

type PopularCakeCardProps = {
  shopName: string
  cakeName: string
  text: string
  visual: CakeVisual
  view?: 'top' | 'side'
  active?: boolean
  onClick?: () => void
}

function StrawberryTopper({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.82)}
      viewBox="0 0 120 98"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.18))' }}
    >
      <path
        d="M60 6
           C78 6 88 18 94 30
           L114 68
           C118 76 114 92 100 92
           H20
           C6 92 2 76 6 68
           L26 30
           C32 18 42 6 60 6 Z"
        fill="#D84A3C"
      />
      <circle cx="60" cy="38" r="9" fill="#F6D34B" />
      <circle cx="43" cy="64" r="9" fill="#F6D34B" />
      <circle cx="77" cy="64" r="9" fill="#F6D34B" />
    </svg>
  )
}

function BlueberryTopper({ size = 14 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: '#3E4CB8',
        boxShadow: '0px 1px 1px rgba(0,0,0,0.18)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 3,
          top: 3,
          width: 4,
          height: 4,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.65)',
        }}
      />
    </div>
  )
}

function OreoTriplet({
  barW = 5,
  barH = 22,
  gap = 2,
}: {
  barW?: number
  barH?: number
  gap?: number
}) {
  const radius = 9999
  return (
    <div className="relative" style={{ width: barW * 3 + gap * 2, height: barH }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: barW,
          height: barH,
          borderRadius: radius,
          background: '#4A4A4A',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: barW + gap,
          top: 0,
          width: barW,
          height: barH,
          borderRadius: radius,
          background: '#FFFFFF',
          border: '1px solid #CFCFCF',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: (barW + gap) * 2,
          top: 0,
          width: barW,
          height: barH,
          borderRadius: radius,
          background: '#4A4A4A',
        }}
      />
    </div>
  )
}

function CakeSideMini({ visual }: { visual: CakeVisual }) {
  const topping = visual.toppingType ?? 'none'

  return (
    <div className="mt-[-6px] flex flex-col items-center">
      <div className="h-[22px] w-[70px] flex items-end justify-center gap-2">
        {topping === 'strawberry' && (
          <>
            <StrawberryTopper size={14} />
            <StrawberryTopper size={14} />
            <StrawberryTopper size={14} />
          </>
        )}

        {topping === 'blueberry' && (
          <>
            <BlueberryTopper size={11} />
            <BlueberryTopper size={11} />
            <BlueberryTopper size={11} />
          </>
        )}

        {topping === 'oreo' && (
          <>
            <div style={{ transform: 'rotate(90deg)' }}>
              <OreoTriplet barW={3} barH={14} gap={1} />
            </div>
            <div style={{ transform: 'rotate(90deg)' }}>
              <OreoTriplet barW={3} barH={14} gap={1} />
            </div>
            <div style={{ transform: 'rotate(270deg)' }}>
              <OreoTriplet barW={3} barH={14} gap={1} />
            </div>
          </>
        )}
      </div>

      <div className="relative h-[52px] w-[70px] overflow-hidden rounded-[5px]">
        <div
          className="absolute right-0 top-0 h-full w-[35px] border-t-[4px] border-r-[4px] rounded-r-[5px]"
          style={{
            borderTopColor: visual.icingColor,
            borderRightColor: visual.icingColor,
          }}
        />

        <div className="absolute right-[6px] top-[6px] z-10 flex w-[40px] flex-col gap-[6px]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative">
              <div
                className="h-[12px] w-full rounded-[6px]"
                style={{ background: visual.sheetColor }}
              />
              {i !== 2 && (
                <div
                  className="absolute -bottom-[4px] left-0 h-[3px] w-full rounded-full"
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
    </div>
  )
}

export default function PopularCakeCard({
  shopName,
  cakeName,
  text,
  visual,
  view = 'top',
  active = false,
  onClick,
}: PopularCakeCardProps) {
  const activeBorder = 'var(--color-main-red-200)'

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center text-left active:scale-[0.99] transition"
    >
      <div className="flex flex-col items-center">
        <div
          className="relative flex h-[100px] w-[100px] items-center justify-center rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
          style={active ? { border: `2px solid ${activeBorder}` } : undefined}
        >
          {view === 'top' ? (
            <div
              className="relative flex h-[80px] w-[80px] items-center justify-center rounded-full border"
              style={{ background: visual.icingColor }}
            >
              <CakeTopTopping visual={visual} radius={30} size="sm" />
              <div className="z-10 rounded-md border bg-white px-1 py-0.5 text-[8px] font-semibold">
                {text}
              </div>
            </div>
          ) : (
            <div className="relative flex h-[90px] w-[90px] items-center justify-center rounded-full">
              <CakeSideMini visual={visual} />
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <div className="mb-1 flex items-center justify-center gap-1 text-[11px] font-semibold text-[var(--color-sub-gray-100)]">
            <MapPin size={11} />
            {shopName}
          </div>
          <div className="border-y-[1px] border-[var(--color-sub-brown-100)] py-2 text-[12px] font-bold text-[var(--color-sub-gray-100)]">
            {cakeName}
          </div>
        </div>
      </div>
    </button>
  )
}
