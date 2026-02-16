import { Star, MapPin, Phone, Cake, CalendarDays, Info } from 'lucide-react'

export interface StoreInfoCard {
  shopId: number
  shopName: string
  shopImageUrl: string | null
  averageRating: number
  reviewCount: number
  distance: string
  address: string
  phone: string
  keywords: string[]
}

export type StoreCardProps = StoreInfoCard & { isPage?: boolean }

export default function StoreCard({
  //shopId,
  shopName,
  shopImageUrl,
  averageRating,
  reviewCount,
  distance,
  address,
  phone,
  keywords = [],
}: StoreCardProps) {
  const chips = keywords.map((label) => ({
    label,
    tone: label.includes('당일') ? ('accent' as const) : ('neutral' as const),
  }))

  const neutralClass =
    'h-[24px] inline-flex items-center gap-1 rounded-[4px] bg-[#EFE2DF] px-2 text-[12px] text-[#2A2929]'
  const accentClass =
    'h-[24px] inline-flex items-center gap-1 rounded-[4px] bg-[#FFE1DC] px-2 py-2 text-[12px] text-[#EA113B]'

  return (
    <div className="w-auto overflow-hidden bg-white">
      <div className="w-full">
        {shopImageUrl ? (
          <img
            src={shopImageUrl}
            alt={shopName}
            className="h-auto w-full max-h-[260px] object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-[16/9] max-h-[260px] flex items-center justify-center bg-[#F3F4F6] text-[#57504F] text-[14px]">
            등록된 이미지가 없습니다.
          </div>
        )}
      </div>

      <div className="bg-[#FCF4F3] px-5 py-5">
        <p className="!text-[16.5px] !font-bold !text-[#2A2929]">{shopName}</p>

        <div className="mt-3 flex items-center gap-4 text-[14px] text-[#57504F]">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-[#FDC700] stroke-none" />
            <span>{averageRating}</span>
          </div>

          <span className="text-[#4A4A4A]">리뷰 {reviewCount}</span>
          <span className="text-[#4A4A4A]">{distance}</span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[12px] text-[#57504F]">
          <MapPin className="h-[16px] w-[16px] shrink-0 text-[#BA8675]" />
          <span>{address}</span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-[12px] text-[#57504F]">
          <Phone className="h-[16px] w-[16px] shrink-0 fill-[#BA8675] stroke-none" />
          <span>{phone}</span>
        </div>

        {chips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((c) => {
              const Icon = c.label.includes('당일')
                ? CalendarDays
                : c.label.includes('레터링')
                  ? Cake
                  : c.label.includes('픽업')
                    ? Info
                    : Cake

              return (
                <span key={c.label} className={c.tone === 'accent' ? accentClass : neutralClass}>
                  <Icon
                    className={`h-[14px] w-[14px] ${
                      c.tone === 'accent' ? 'text-[#EA113B]' : 'text-[#2A2929]'
                    }`}
                  />
                  {c.label}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
