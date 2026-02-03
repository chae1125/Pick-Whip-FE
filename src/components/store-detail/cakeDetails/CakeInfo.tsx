type Props = {
  cakeName: string
  keywords?: string[]
  price: number
  onGoReview: () => void
}

export default function CakeInfoSection({ cakeName, keywords, price, onGoReview }: Props) {
  return (
    <>
      <p className="!text-[20px] !font-semibold !text-black">{cakeName}</p>

      <p className="!text-[10px] !text-[#6A7282]">{keywords?.join(' / ') ?? ''}</p>

      <div className="mt-1 flex justify-end">
        <button
          type="button"
          onClick={onGoReview}
          className="!text-[10px] !text-black !border-b-[0.5px] !border-b-[#6A7282]"
        >
          리뷰 보기 ↗
        </button>
      </div>

      <p className="mt-3 text-[14px] font-semibold text-black">₩ {price.toLocaleString()} ~</p>
    </>
  )
}
