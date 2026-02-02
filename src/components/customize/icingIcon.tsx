type IcingColor = {
  id: number
  colorCode: string
}

interface IcingButtonProps {
  color: IcingColor
  selected: boolean
  onClick: () => void
}

export default function IcingButton({ color, selected, onClick }: IcingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative bg-white rounded-2xl p-4
        flex flex-col items-center justify-between
        h-36 w-32
        border-2 transition-all
        ${selected ? 'border-[#FF9980]' : 'border-transparent'}
      `}
    >
      <div
        className={`
          absolute top-3 left-3
          w-5 h-5 rounded-full
          flex items-center justify-center
          ${selected ? 'bg-[#FF9980]' : 'border-2 border-[#E0E0E0] bg-white'}
        `}
      >
        {selected && (
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-none stroke-current stroke-3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      {/* 아이싱 미리보기 */}
      <div className="flex-1 flex items-center justify-center mt-4 mb-4">
        <svg
          width="50"
          height="50"
          viewBox="0 0 244 233"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.8658 220.596L15.0256 194.492L38.4604 217.883L12.3769 229.091L3.8658 220.596Z"
            fill="#D9D9D9"
            stroke="#787878"
            strokeWidth="6.52138"
            strokeLinejoin="round"
          />

          <path
            d="M57.5661 209.251L31.2781 183.011C25.4205 177.164 24.1651 168.135 28.2062 160.912L107.171 19.7753C113.15 9.08856 127.683 7.06821 136.35 15.7191L224.664 103.87C233.331 112.521 231.337 127.057 220.662 133.056L79.6708 212.282C72.4554 216.336 63.4239 215.097 57.5661 209.251Z"
            fill={color.colorCode}
            stroke="#787878"
            strokeWidth="6.52138"
            strokeLinejoin="round"
          />

          <path
            d="M227.069 16.089C227.385 16.4021 227.597 16.7672 227.7 17.1129
            C227.778 17.3749 227.784 17.5919 227.762 17.7534
            L227.727 17.8647L220.467 41.3644
            L219.208 45.4396L223.472 45.5856
            L238 46.0827
            C239.921 47.1678 240.267 48.3291 240.216 48.5345
            L239.829 48.9898L215.092 63.8719
            C214.275 64.0202 213.425 63.7387 213.035 63.3534
            L179.968 30.6648
            C179.22 29.0488 179.307 28.8103 179.376 28.7001
            L194.098 3.57759
            C195.014 3.23549 196.246 3.8849 196.536 4.2914
            L197.615 20.0255
            L201.871 22.9814
            L225.286 15.4508
            C226.752 15.7759 227.069 16.089 227.069 16.089Z"
            stroke="#787878"
            strokeWidth="6.52138"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 라벨 */}
      <div className="flex flex-col items-center justify-center rounded-[42px] px-2.5 border-2 border-[#FF9886] bg-white">
        <span className="text-sm font-semibold text-[#0D0D0D]">{color.id}번</span>
      </div>
    </button>
  )
}
