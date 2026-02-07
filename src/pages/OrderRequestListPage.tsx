import BackHeader from '@/components/BackHeader'
import OrderListCard from '@/components/order-history/OrderListCard'
import { mockOrderRequests } from '@/types/orderRequests.mock'

export default function OrderRequestListPage() {
  return (
    <main className="relative pt-10 container w-full bg-white">
      <BackHeader
        title="주문 요청 내역"
        titleClassName="!font-semibold !text-[20px]"
        iconColor="text-[#BA8675]"
        iconSize={30}
      />

      <div className="w-full mt-6 flex flex-col">
        {mockOrderRequests.map((item, idx) => (
          <OrderListCard
            key={`${item.storeName}-${idx}`}
            item={item}
            onClickPreview={() => {}}
            onClickMessage={() => {}}
          />
        ))}
      </div>
    </main>
  )
}
