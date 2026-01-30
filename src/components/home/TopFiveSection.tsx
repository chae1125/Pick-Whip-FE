import TopFiveCarousel from './TopFiveCarousel'

export default function TopFiveSection() {
  return (
    <section className="mt-6">
      <div className="mx-auto max-w-lg bg-[#F7DEDD] rounded-sm py-5 px-6 text-center relative">
        <div className="absolute left-0 right-0 top-0 h-[1.5px] bg-[#D65151]" />
        <div className="absolute left-0 right-0 top-2 h-[0.8px] bg-[#EFA8A3]" />

        <h2 className="font-['Rammetto_One'] text-[#D65151]">Pick ! &amp; Order</h2>
        <p className="mt-2 !text-[11px] font-bold text-[var(--color-sub-gray-100)]">
          인기 케이크 TOP 5를 만나보세요
        </p>

        <div className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#D65151]" />
        <div className="absolute left-0 right-0 bottom-2 h-[0.8px] bg-[#EFA8A3]" />
      </div>

      <div>
        <TopFiveCarousel />
      </div>
    </section>
  )
}
