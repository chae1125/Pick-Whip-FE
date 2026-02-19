import { useEffect, useState } from 'react'
import { getDraftDetail } from '@/apis/custom'
import { getShopCustomOptions } from '@/apis/shop'
import type { DraftDetailResult } from '@/types/custom-order'
import type { CakeSize } from '@/apis/shop'

type OrderProduct = {
  imageUrl: string
  options: {
    label: string
    value: string
  }[]
}

const dummyOrderProduct: OrderProduct = {
  imageUrl:
    'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=1000&auto=format&fit=crop',
  options: [
    { label: '디자인', value: '1호 원형' },
    { label: '맛', value: '초코 시트 + 생크림' },
    { label: '레터링', value: '메리 크리스마스' },
    { label: '데코', value: '오레오' },
    { label: '추가요청', value: '크리스마스 토퍼' },
  ],
}

type OrderInfoProps = {
  draftId?: string
  shopId: number
}

export default function OrderInfo({ draftId, shopId }: OrderInfoProps) {
  const [draftData, setDraftData] = useState<DraftDetailResult | null>(null)
  const [cakeSizes, setCakeSizes] = useState<CakeSize[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [shopCustoms, draftDetail] = await Promise.all([
          getShopCustomOptions(shopId),
          draftId ? getDraftDetail(Number(draftId)) : null,
        ])
        if (!alive) return
        setCakeSizes(shopCustoms.cakeSizes)
        if (draftDetail) {
          setDraftData(draftDetail)
        }
      } catch (e) {
        if (!alive) return
        setError(e instanceof Error ? e.message : '주문 정보를 불러오지 못했습니다.')
      } finally {
        if (alive) setLoading(false)
      }
    }

    fetchData()
    return () => {
      alive = false
    }
  }, [draftId, shopId])

  const orderProduct: OrderProduct = draftData
    ? {
        imageUrl: draftData.referenceImageUrl || dummyOrderProduct.imageUrl,
        options: [
          ...(() => {
            const cakeSize = cakeSizes.find((size) => size.id === draftData.shopCakeSizeId)
            const sizeLabel = cakeSize ? cakeSize.name : `${draftData.shopCakeSizeId}호`
            const shapes = draftData.options.filter((o) => o.category === 'SHAPE')
            const shapeLabel = shapes.length > 0 ? shapes[0].optionName.replace(' 쉐입', '') : ''

            return [
              {
                label: '디자인',
                value: shapeLabel ? `${sizeLabel} ${shapeLabel}` : sizeLabel,
              },
            ]
          })(),
          ...(() => {
            const sheets = draftData.options.filter((o) => o.category === 'SHEET')
            const creams = draftData.options.filter((o) => o.category === 'CREAM')
            if (sheets.length > 0 || creams.length > 0) {
              const sheetNames = sheets.map((s) => s.optionName).join(', ')
              const creamNames = creams.map((c) => c.optionName).join(', ')
              return [
                {
                  label: '맛',
                  value: [sheetNames, creamNames].filter(Boolean).join(' + '),
                },
              ]
            }
            return []
          })(),
          ...(draftData.letteringText ? [{ label: '레터링', value: draftData.letteringText }] : []),
          ...(() => {
            const icings = draftData.options.filter((o) => o.category === 'ICING')

            const toppingNames: string[] = []

            const toppingsFromOptions = draftData.options.filter((o) => o.category === 'TOPPING')
            if (toppingsFromOptions.length > 0) {
              toppingNames.push(...toppingsFromOptions.map((t) => t.optionName))
            }

            const toppingsArray = draftData.toppings || []
            if (toppingsArray.length > 0) {
              toppingNames.push(...toppingsArray.map((t) => t.name))
            }

            const decoParts: string[] = []
            if (icings.length > 0) {
              decoParts.push(icings.map((i) => i.optionName).join(', '))
            }
            if (toppingNames.length > 0) {
              decoParts.push(toppingNames.join(', '))
            }

            if (decoParts.length > 0) {
              return [
                {
                  label: '데코',
                  value: decoParts.join(' + '),
                },
              ]
            }
            return []
          })(),
          ...(draftData.additionalRequest
            ? [{ label: '추가요청', value: draftData.additionalRequest }]
            : []),
        ],
      }
    : dummyOrderProduct

  if (loading) {
    return (
      <section className="max-w-lg mx-auto pt-4 mb-6 border-b border-[var(--color-main-pink-30)] pb-6">
        <span className="block pb-3 text-[17px] font-semibold text-[#364153]">주문 상품</span>
        <p className="text-sm text-gray-500">로딩 중...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-lg mx-auto pt-4 mb-6 border-b border-[var(--color-main-pink-30)] pb-6">
        <span className="block pb-3 text-[17px] font-semibold text-[#364153]">주문 상품</span>
        <p className="text-sm text-red-500">{error}</p>
      </section>
    )
  }

  return (
    <section className="max-w-lg mx-auto pt-4 mb-6 border-b border-[var(--color-main-pink-30)] pb-6">
      <span className="block pb-3 text-[17px] font-semibold text-[#364153]">주문 상품</span>

      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-2">
          <img
            src={orderProduct.imageUrl}
            alt="케이크 이미지"
            className="h-25 w-25 rounded-[11px] object-cover"
          />
        </div>

        <div className="text-[14px] text-[#2A2929] leading-6">
          {orderProduct.options.map((opt, idx) => (
            <p key={`${opt.label}-${idx}`}>
              <span className="!font-medium">{opt.label}</span> :{' '}
              <span className="font-regular">{opt.value}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
