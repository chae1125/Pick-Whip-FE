export type PickupInfo = {
  operatingHours: string
  pickupTime: string
  sameDayOrder: string
  parking: string
}

export default function PickupSection({ pickup }: { pickup: PickupInfo }) {
  return (
    <div className="w-full rounded-[10px] bg-white p-4">
      <dl className="grid grid-cols-[84px_1fr] gap-x-6 gap-y-2">
        <dt className="text-[12px] text-[#6A7282]">운영시간:</dt>
        <dd className="text-[12px] text-[var(--color-sub-gray-100)]">
          {pickup.operatingHours || '-'}
        </dd>

        <dt className="text-[12px] text-[#6A7282]">픽업시간:</dt>
        <dd className="text-[12px] text-[var(--color-sub-gray-100)]">{pickup.pickupTime || '-'}</dd>

        <dt className="text-[12px] text-[#6A7282]">당일주문:</dt>
        <dd className="text-[12px] text-[var(--color-sub-gray-100)]">
          {pickup.sameDayOrder || '-'}
        </dd>

        <dt className="text-[12px] text-[#6A7282]">주차:</dt>
        <dd className="text-[12px] text-[var(--color-sub-gray-100)]">{pickup.parking || '-'}</dd>
      </dl>
    </div>
  )
}
