import myPickBannerImg from '../../assets/img/myPickBanner.png'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function MyPickBanner() {
  const navigate = useNavigate()

  return (
    <section className="mt-6">
      <div className="mx-auto max-w-lg bg-[#F7DEDD] rounded-sm py-3 px-3 text-center relative">
        <div className="flex justify-center">
          <img src={myPickBannerImg} alt="My Pick Banner" className="w-full object-contain" />
        </div>
        <div
          className="absolute inset-0 flex flex-col items-start justify-center text-left
                px-12 md:px-13 lg:px-14"
        >
          <p className="!text-[14px] font-semibold text-[#000000] leading-5">
            내 취향 케이크 샵을
            <br />
            마이픽으로 Pick 하세요 !
          </p>

          <button
            type="button"
            className="mt-2.5 !text-[14px] font-semibold text-[#000000]"
            onClick={() => navigate('/map')}
          >
            지도에서 마이픽 찾기{' '}
            <ChevronRight size={16} className="inline-block text-[#909090CC]" />
          </button>
        </div>
      </div>
    </section>
  )
}
