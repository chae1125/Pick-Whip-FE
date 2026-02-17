import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import OrderInfo from '@/components/order/OrderInfo'
import OrderUserForm from '@/components/order/OrderUserForm'
import PickupDateTime from '@/components/order/PickupDateTime'
import ExtraRequest from '@/components/order/ExtraRequest'
import ConfirmButton from '@/components/order/ConfirmButton'
import { getDraftDetail, updateDraftPickupTime, createOrder } from '@/apis/custom'
import type { DraftDetailResult } from '@/types/custom-order'
import { getUserIdWithCookie } from '@/utils/auth'

export default function OrderDetailPage() {
  const { draftId } = useParams<{ draftId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const shopId = location.state?.shopId as number | undefined
  const [draftData, setDraftData] = useState<DraftDetailResult | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [additionalRequest, setAdditionalRequest] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePickupTimeChange = async (pickupDatetime: string) => {
    if (!draftId) return

    try {
      const userId = await getUserIdWithCookie()
      if (!userId) {
        alert('로그인이 필요합니다.')
        return
      }

      await updateDraftPickupTime(userId, Number(draftId), pickupDatetime)
      console.log('픽업 시간이 변경되었습니다:', pickupDatetime)
    } catch (error) {
      console.error('픽업 시간 변경 실패:', error)
      alert('픽업 시간 변경에 실패했습니다.')
    }
  }

  const handleOrderSubmit = async () => {
    if (!draftId || !customerName.trim() || !customerPhone.trim()) return

    setIsSubmitting(true)
    try {
      const result = await createOrder({
        draftId: Number(draftId),
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        additionalRequest: additionalRequest.trim() || null,
      })

      alert(`주문이 완료되었습니다!\n주문번호: ${result.orderCode}`)
      // TODO: 주문 완료 페이지로 이동하거나 적절한 페이지로 리다이렉트
      navigate('/', { replace: true })
    } catch (error) {
      console.error('주문 생성 실패:', error)
      alert('주문 생성에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isPhoneValid = /^010-\d{4}-\d{4}$/.test(customerPhone.trim())
  const isFormValid = customerName.trim() !== '' && isPhoneValid

  useEffect(() => {
    if (!shopId) {
      alert('잘못된 접근입니다. 주문은 케이크 선택 또는 커스터마이징 페이지를 통해 진행해주세요.')
      navigate('/', { replace: true })
    }
  }, [shopId, navigate])

  useEffect(() => {
    let alive = true
    if (!draftId) return

    const fetchDraft = async () => {
      try {
        const data = await getDraftDetail(Number(draftId))
        if (!alive) return
        setDraftData(data)
      } catch (e) {
        console.error('draft 조회 실패:', e)
      }
    }

    fetchDraft()
    return () => {
      alive = false
    }
  }, [draftId])

  if (!shopId) {
    return null
  }

  return (
    <div className="min-h-screen w-full bg-[#FCF4F3] mt-14">
      <div className="container !px-5">
        <OrderInfo draftId={draftId} />
        <OrderUserForm
          name={customerName}
          phone={customerPhone}
          onNameChange={setCustomerName}
          onPhoneChange={setCustomerPhone}
        />
        <PickupDateTime
          key={draftData?.pickupDatetime || 'default'}
          shopId={shopId}
          initialPickupDatetime={draftData?.pickupDatetime}
          onPickupTimeChange={handlePickupTimeChange}
        />
        <ExtraRequest value={additionalRequest} onChange={setAdditionalRequest} />
        <ConfirmButton disabled={!isFormValid || isSubmitting} onClick={handleOrderSubmit} />
      </div>
    </div>
  )
}
