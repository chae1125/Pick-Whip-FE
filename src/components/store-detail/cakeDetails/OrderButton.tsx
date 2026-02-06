type Props = {
  onOrder: () => void
  onCustomize: () => void
}

export default function OrderButton({ onOrder, onCustomize }: Props) {
  return (
    <div className="w-full space-y-2">
      <button
        type="button"
        onClick={onOrder}
        className="w-full h-[35px] rounded-[10px] !border !border-[#57504F] !text-[#57504F] !text-[12px] !font-semibold"
      >
        이대로 주문하기
      </button>

      <button
        type="button"
        onClick={onCustomize}
        className="w-full h-[35px] rounded-[10px] !bg-[#57504F] !text-white !text-[12px] !font-semibold rounded-[10px]"
      >
        내 취향대로 커스터마이징하기
      </button>
    </div>
  )
}
