import OrderInfo from '@/components/order/OrderInfo'
import OrderUserForm from '@/components/order/OrderUserForm'
import PickupDateTime from '@/components/order/PickupDateTime'
import ExtraRequest from '@/components/order/ExtraRequest'
import ConfirmButton from '@/components/order/ConfirmButton'

export default function OrderDetailPage() {
  return (
    <div className="min-h-screen w-full bg-[#FCF4F3] mt-14">
      <div className="container !px-5">
        <OrderInfo />
        <OrderUserForm />
        <PickupDateTime />
        <ExtraRequest />
        <ConfirmButton />
      </div>
    </div>
  )
}
