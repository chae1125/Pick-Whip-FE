export interface CreamItem {
  label: string
  color?: string
  additionalPrice?: number
}

interface CreamCardProps {
  cream: CreamItem
  isSelected: boolean
  onClick: (label: string) => void
}

export default function CreamCard({ cream, isSelected, onClick }: CreamCardProps) {
  return (
    <button
      onClick={() => onClick(cream.label)}
      className={`bg-white rounded-3xl p-5 flex flex-col items-center border-2 transition-all ${
        isSelected ? 'border-[#FF9980]' : 'border-transparent'
      }`}
    >
      <div className="mb-4 mt-1">
        <svg width="40" height="40" viewBox="0 0 37 37" fill="none">
          <path
            d="M33.3474 19.1617C33.3189 21.7555 32.4639 22.6129 31.5991 24.3312C34.9384 27.8296 38.3886 31.2632 34.839 36.4109L1.04701 36.0239C1.04701 36.0239 -0.620355 34.3402 0.253152 31.7573C0.584962 30.8719 1.95862 29.7929 2.81678 29.1912C0.898903 23.7497 2.91457 20.5439 7.02595 18.8909C6.35294 15.3937 8.93758 11.0972 12.3363 9.40791C15.7363 7.7174 17.4053 9.46718 19.9492 8.63036C22.4942 7.79478 22.5338 4.33634 21.6987 3.46205C20.8623 2.58653 19.0963 1.08147 20.554 0.242002C21.4539 -0.26017 22.7023 -0.128454 26.2081 2.07778C28.1729 3.32092 30.2883 5.93075 30.3416 8.74936C30.3744 10.4804 28.9412 12.8025 28.339 13.916C28.6503 14.0712 33.3795 16.5667 33.3474 19.1617Z"
            fill={cream.color ?? '#D2EFFB'}
          />
        </svg>
      </div>
      <div className={`font-bold text-[15px] ${isSelected ? 'text-[#222]' : 'text-[#666]'}`}>
        {cream.label}
      </div>
      {cream.additionalPrice ? (
        <div className="text-[12px] text-[#666]">
          +₩{Number(cream.additionalPrice).toLocaleString()}
        </div>
      ) : null}
    </button>
  )
}
