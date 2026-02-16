/* ShapeCard: explicit function component */

export interface ShapeItem {
  id: number | string
  label: string
  additionalPrice?: number
}

function renderShapeSwatch(shape: ShapeItem) {
  const label = (shape.label ?? '').toString()
  if (/원형/.test(label)) {
    return <div className="w-14 h-14 rounded-full bg-[#F4D3D3] border border-[#EAEAEA]" />
  }
  if (/하트/.test(label)) {
    return (
      <div
        className="w-14 h-14"
        style={{
          backgroundColor: '#F4D3D3',
          WebkitClipPath: 'url(#prettyHeartClip)',
          clipPath: 'url(#prettyHeartClip)',
        }}
      />
    )
  }
  if (/사각/.test(label)) {
    return <div className="w-14 h-14 rounded-sm bg-[#F4D3D3] border border-[#EAEAEA]" />
  }
  return <div className="w-14 h-14 rounded-full bg-[#F5F5F5]" />
}

interface ShapeCardProps {
  shape: ShapeItem
  isSelected: boolean
  onClick: (label: string) => void
}

export default function ShapeCard({ shape, isSelected, onClick }: ShapeCardProps) {
  return (
    <button
      onClick={() => onClick(shape.label)}
      className={`relative bg-white rounded-2xl p-4 h-40 flex flex-col items-center justify-between border-2 transition-all ${
        isSelected ? 'border-[#FF9980]' : 'border-transparent'
      }`}
    >
      <div
        className={`absolute top-3 left-3 w-5 h-5 rounded-full flex items-center justify-center ${
          isSelected ? 'bg-[#FF9980]' : 'border-2 border-[#E0E0E0] bg-white'
        }`}
      >
        {isSelected && (
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-none stroke-current stroke-3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center mt-4 mb-3 text-chat-header">
        {renderShapeSwatch(shape)}
      </div>
      <span className="font-bold text-sm">{shape.label}</span>
      {shape.additionalPrice ? (
        <div className="text-[12px] text-[#666] mt-1">
          + {Number(shape.additionalPrice).toLocaleString()}원
        </div>
      ) : null}
    </button>
  )
}
