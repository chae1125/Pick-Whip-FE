import LogoImg from '../../assets/img/logo.png'
import Cake3DPreview from './Cake3DPrview'

export default function PopularCake() {
  return (
    <section>
      <div
        className="mx-auto max-w-lg bg-[#F7DEDD] rounded-sm py-3 px-3 text-center relative"
        style={{
          background:
            'linear-gradient(180deg, #FCF4F3 0%, #F6E1DC 60.1%, #F1D2CA 68.66%, #ECC3B7 77.14%, #F4DCD5 93.27%, #F8E8E4 96.63%, #FCF4F3 100%)',
        }}
      >
        <div className="flex justify-center">
          <img src={LogoImg} alt="Popular Cake Banner" className="w-full object-contain" />
        </div>
        <p className="!text-[14px] font-bold text-[var(--color-sub-brown-200)] leading-5 mt-2">
          픽커들이 Pick한 인기 케이크 도안을
          <br />
          3D 프리뷰로 만나보세요
        </p>
        <Cake3DPreview />
      </div>
    </section>
  )
}
