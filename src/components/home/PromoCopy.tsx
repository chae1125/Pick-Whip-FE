import { useEffect, useState } from 'react'
import homeBackground from '../../assets/img/homeBackground.png'
import promoCopyImg from '../../assets/img/promoCopyImg.png'

export default function PromoCopy() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = document.getElementById('promo-copy-section')
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
      },
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="promo-copy-section"
      className={`relative mx-auto flex w-full max-w-lg flex-col items-center px-6 pt-10 pb-3 text-center ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >
      <div
        className="mt-[100px] pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${homeBackground})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 35%',
          backgroundSize: 'contain',
          opacity: 0.9,
        }}
      />

      <div className="relative z-10 w-full">
        <div className="w-full mx-auto font-['Rammetto_One'] opacity-52">
          <p className="text-left !text-[50px] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#D65151]">
            Pick
          </p>

          <p className="text-left !text-[50px] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#E5AFAF]">
            your taste,
          </p>

          <div className="mt-12 flex items-end justify-end gap-3">
            <p className="text-right !text-[70px] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#E5AFAF]">
              &
            </p>
            <p className="text-right !text-[55px] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#D65151]">
              Whip
            </p>
          </div>

          <p className="text-right !text-[55px] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#E5AFAF]">
            your cake
          </p>
        </div>

        <div className="mt-15 w-full">
          <p className="!text-[22px] !font-bold tracking-[-0.02em] text-[var(--color-sub-gray-100)]">
            세상에 하나뿐인 케이크,
            <br />
            내가 원하는대로 만들어집니다
          </p>

          <p className="!mt-8 !text-[16px] font-bold text-[var(--color-sub-gray-100)]">
            Pick &amp; Whip에서는 취향대로 케이크를 고르고
            <br />
            주문과 예약을 한 번에 할 수 있어요.
          </p>
        </div>

        <div className="mt-8 w-full">
          <div className="my-6 flex flex-col items-center gap-7">
            <span className="h-[9px] w-[9px] rounded-full border-[1px] border-[#D6D6D6]" />

            <p className="!text-[15px] font-semibold text-black">
              디자인 탐색부터 결제까지 한 곳에서!
            </p>

            <span className="h-[11px] w-[11px] rounded-full border-[1px] border-[#989898]" />

            <p className="!text-[15px] font-semibold text-black">
              원하는 그대로 나오는지 3D로 디자인 미리보기!
            </p>

            <span className="h-[14px] w-[14px] rounded-full border-[1px] border-[#666666]" />

            <p className="!text-[15px] font-semibold text-black">
              사장님과의 소통 오류를 줄이는 시각화된 주문서 템플릿!
            </p>
          </div>
        </div>

        <div className="mt-25 flex flex-col items-center justify-center">
          <img src={promoCopyImg} alt="프로모션 이미지" className="w-full max-w-sm" />

          <div className="my-6 w-full">
            <p className="!text-[18px] !font-semibold tracking-[-0.02em] text-[var(--color-sub-gray-100)]">
              내 취향대로 케이크를 골라볼까요?
            </p>
          </div>

          <button className="rounded-[50px] px-14 py-3 !text-[16px] !font-semibold text-black border-[1.5px] border-[var(--color-sub-brown-200)]">
            케이크 디자인 둘러보기
          </button>
        </div>
      </div>
    </section>
  )
}
