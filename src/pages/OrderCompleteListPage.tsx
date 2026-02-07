import BackHeader from '@/components/BackHeader'
import OrderListCard from '@/components/order-history/OrderListCard'
import { mockOrderComplete } from '@/types/orderComplete.mock'

export default function OrderCompleteListPage() {
  return (
    <main className="relative pt-10 container w-full bg-white">
      <BackHeader
        title="주문 완료 내역"
        titleClassName="!font-semibold !text-[20px]"
        iconColor="text-[#BA8675]"
        iconSize={30}
      />

      <div className="w-full mt-6 flex flex-col">
        {mockOrderComplete.map((item, idx) => (
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
