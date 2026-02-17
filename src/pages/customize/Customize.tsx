import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import IcingIcon from '@/components/customize/icingIcon'
import OptionHeader from '@/components/customize/OptionHeader'
import SizeCard from '@/components/customize/SizeCard'
import ShapeCard from '@/components/customize/ShapeCard'
import SheetCard from '@/components/customize/SheetCard'
import CreamCard from '@/components/customize/CreamCard'
import ToppingPill from '@/components/customize/ToppingPill'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import ImageUploadStep from './ImageUploadStep'
import Header from '@/components/customize/Header'
import TopSidePreview from '@/components/customize/TopSidePreview'
import CustomizeBottomSheet from '@/components/customize/CustomizeBottomSheet'
import { getShopCustomOptions, type CustomOptionItem } from '@/apis/shop'
import { getDesignDetailForCustomize } from '@/apis/design'
import { createCustomOrderDraft } from '@/apis/custom'
import { getUserIdFromToken } from '@/utils/auth'
import type { DesignDetailData } from '@/types/designgallery'

type TabType = '사이즈' | '맛' | '데코' | '추가요청'
type ViewMode = 'top' | 'side'
type LetterStyle = 'center' | 'top-arc' | 'both-arc'
type DecoSubTab = 'align' | 'color'

export default function Customize() {
  const { cakeId } = useParams()
  const mode = cakeId ? 'MENU' : 'DIRECT'

  const [step, setStep] = useState<'UPLOAD' | 'CUSTOMIZE'>(
    mode === 'DIRECT' ? 'UPLOAD' : 'CUSTOMIZE',
  )

  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState<TabType | ''>('')
  const [viewMode, setViewMode] = useState<ViewMode>('top')
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedShape, setSelectedShape] = useState<string>('원형')
  const [selectedSheet, setSelectedSheet] = useState<string>('')
  const [selectedCream, setSelectedCream] = useState<string>('')
  const [lettering, setLettering] = useState<string>(mode === 'DIRECT' ? '' : '문구를 입력하세요.')
  const [additionalOptions, setAdditionalOptions] = useState<string>('요청 사항을 입력해주세요.')
  const [letteringStyle, setLetteringStyle] = useState<LetterStyle>('center')
  const [selectedIcingId, setSelectedIcingId] = useState<number | null>(null)
  const [decoTab, setDecoTab] = useState<DecoSubTab>('align')
  const [letterColor, setLetterColor] = useState<string>('#333333')

  const location = useLocation()
  const navState = (location.state ?? {}) as {
    shopId?: number
    designId?: number
    shopName?: string
    cakeName?: string
    price?: number
    pickupDatetime?: string
  }
  const shopIdFromState = navState.shopId
  const designIdFromState = navState.designId
  const cakeNameFromState = navState.cakeName
  const pickupDatetimeFromState = navState.pickupDatetime
  const navigate = useNavigate()

  const [apiCakeSizes, setApiCakeSizes] = useState<string[]>([])
  const [apiOptions, setApiOptions] = useState<CustomOptionItem[]>([])
  const [apiLoaded, setApiLoaded] = useState(false)
  const [, setApiError] = useState<string | null>(null)
  const [, setDesignData] = useState<DesignDetailData | null>(null)

  useEffect(() => {
    let alive = true
    if (!designIdFromState) return

    const run = async () => {
      setApiLoaded(false)
      setApiError(null)
      try {
        const res = await getDesignDetailForCustomize(Number(designIdFromState))
        if (!alive) return

        setDesignData(res)

        const customOptions: CustomOptionItem[] = res.availOptions.map((opt, index) => {
          const matchedOption = res.options.find(
            (o) => o.category === opt.category && o.optionName === opt.name,
          )
          const matchedTopping =
            opt.category === 'TOPPING' ? res.toppings.find((t) => t.name === opt.name) : null

          return {
            optionId: matchedOption?.optionId ?? matchedTopping?.optionId ?? -(index + 1),
            category: opt.category,
            optionName: opt.name,
            additionalPrice: opt.price,
            colorRgbCode: opt.colorCode,
          }
        })

        setApiCakeSizes([res.cakeSize])
        setApiOptions(customOptions)

        if (res.letteringText) {
          setLettering(res.letteringText)
        }
        if (res.letteringColor) {
          setLetterColor(res.letteringColor)
        }
        if (res.letteringLineCount) {
          if (res.letteringLineCount === 'TWO_LINE' || res.letteringAlignment === 'CURVE_UP_DOWN') {
            setLetteringStyle('both-arc')
          } else if (res.letteringAlignment === 'CURVE_UP') {
            setLetteringStyle('top-arc')
          } else {
            setLetteringStyle('center')
          }
        }

        const shapeOption = res.options.find((opt) => opt.category === 'SHAPE')
        if (shapeOption) {
          setSelectedShape(shapeOption.optionName)
        }

        const sheetOption = res.options.find((opt) => opt.category === 'SHEET')
        if (sheetOption) {
          setSelectedSheet(sheetOption.optionName)
        }

        const creamOption = res.options.find((opt) => opt.category === 'CREAM')
        if (creamOption) {
          setSelectedCream(creamOption.optionName)
        }

        const icingOption = res.options.find((opt) => opt.category === 'ICING')
        if (icingOption) {
          setSelectedIcingId(icingOption.optionId)
        }

        const toppingIds = res.toppings.map((t) => t.optionId)
        setSelectedToppingIds(toppingIds)
      } catch (e) {
        if (!alive) return
        setApiError(e instanceof Error ? e.message : '디자인 정보를 불러오지 못했습니다.')
      } finally {
        if (alive) setApiLoaded(true)
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [designIdFromState])

  useEffect(() => {
    let alive = true
    if (!shopIdFromState || designIdFromState) return

    const run = async () => {
      setApiLoaded(false)
      setApiError(null)
      try {
        const res = await getShopCustomOptions(Number(shopIdFromState))
        if (!alive) return
        setApiCakeSizes(res.cakeSizes ?? [])
        setApiOptions(res.customOptions ?? [])
      } catch (e) {
        if (!alive) return
        setApiError(e instanceof Error ? e.message : '가게 옵션을 불러오지 못했습니다.')
      } finally {
        if (alive) setApiLoaded(true)
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [shopIdFromState, designIdFromState])

  const sizeVisuals: Record<string, { cm: string; circleSize: string; scale: string }> = {
    도시락: { cm: '10cm', circleSize: 'w-10 h-10', scale: 'scale-[0.75]' },
    '1호': { cm: '15cm', circleSize: 'w-15 h-15', scale: 'scale-[0.88]' },
    '2호': { cm: '18cm', circleSize: 'w-18 h-18', scale: 'scale-100' },
  }

  const mappedCakeSizes = (apiCakeSizes || []).map((label) => {
    const sizeOption = apiOptions.find(
      (o) => o.optionName === label || (o.category === 'SIZE' && o.optionName === label),
    )
    const additionalPrice = sizeOption ? Number(sizeOption.additionalPrice ?? 0) : 0

    const visual = sizeVisuals[label] ?? { cm: '', circleSize: 'w-12 h-12', scale: '' }
    return {
      label,
      cm: visual.cm,
      circleSize: visual.circleSize,
      scale: visual.scale,
      additionalPrice,
    }
  })

  const sheetsFromApi = apiOptions
    .filter((o) => o.category === 'SHEET')
    .map((o) => ({
      label: o.optionName,
      color: o.colorRgbCode ?? '#F8F8F8',
      additionalPrice: o.additionalPrice,
    })) as { label: string; color: string; additionalPrice?: number }[]
  const creamsFromApi = apiOptions
    .filter((o) => o.category === 'CREAM')
    .map((o) => ({
      label: o.optionName,
      color: o.colorRgbCode ?? '#F8F8F8',
      additionalPrice: o.additionalPrice,
    })) as { label: string; color: string; additionalPrice?: number }[]
  const icingFromApi = apiOptions
    .filter((o) => o.category === 'ICING' && o.colorRgbCode)
    .map((o) => ({
      id: o.optionId,
      label: o.optionName,
      colorCode: o.colorRgbCode!,
      additionalPrice: o.additionalPrice,
    })) as { id: number; label: string; colorCode: string; additionalPrice?: number }[]
  const shapesFromApi = apiOptions
    .filter((o) => o.category === 'SHAPE')
    .map((o) => ({
      id: o.optionId,
      label: o.optionName,
      additionalPrice: o.additionalPrice,
      colorRgbCode: o.colorRgbCode,
    })) as { id: number; label: string; additionalPrice?: number; colorRgbCode?: string | null }[]
  const toppingsFromApi = apiOptions
    .filter((o) => o.category === 'TOPPING')
    .map((o) => ({ id: o.optionId, label: o.optionName, additionalPrice: o.additionalPrice })) as {
    id: number
    label: string
    additionalPrice?: number
  }[]

  const sheetsToUse = sheetsFromApi.length ? sheetsFromApi : []
  const creamsToUse = creamsFromApi.length ? creamsFromApi : []
  const icingColorsToUse = icingFromApi.length ? icingFromApi : []
  const shapesToUse = shapesFromApi.length ? shapesFromApi : []
  const toppingsToUse = toppingsFromApi.length ? toppingsFromApi : []

  const hasSheet = sheetsToUse.length > 0
  const hasCream = creamsToUse.length > 0
  const hasIcing = icingColorsToUse.length > 0
  const hasShape = shapesToUse.length > 0
  const hasTopping = toppingsToUse.length > 0

  const sizeOrShape = mappedCakeSizes.length > 0 || hasShape
  const taste = hasSheet || hasCream
  const navItems: { key: string; label: string }[] = []
  if (sizeOrShape) navItems.push({ key: '사이즈', label: '사이즈' })
  if (taste) navItems.push({ key: '맛', label: '맛' })
  navItems.push({ key: '데코', label: '데코' })
  navItems.push({ key: '추가요청', label: '추가요청' })

  useEffect(() => {
    if (!apiLoaded) return

    if (!currentTab) {
      if (sizeOrShape) setCurrentTab('사이즈')
      else if (taste) setCurrentTab('맛')
      else setCurrentTab('데코')
      return
    }

    if (!navItems.find((it) => it.key === currentTab)) {
      setCurrentTab(navItems[0].key as TabType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCakeSizes, apiOptions, hasShape, hasSheet, hasCream, apiLoaded])

  useEffect(() => {
    if (mappedCakeSizes.length && !mappedCakeSizes.find((s) => s.label === selectedSize)) {
      setSelectedSize(mappedCakeSizes[0].label)
    }
    if (hasSheet && !sheetsToUse.find((s) => s.label === selectedSheet)) {
      setSelectedSheet(sheetsToUse[0]?.label ?? '')
    }
    if (hasCream && !creamsToUse.find((c) => c.label === selectedCream)) {
      setSelectedCream(creamsToUse[0]?.label ?? '')
    }
    if (hasIcing && !icingColorsToUse.find((i) => i.id === selectedIcingId)) {
      setSelectedIcingId(icingColorsToUse[0]?.id ?? null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCakeSizes, apiOptions])

  const shapeClipPath = /하트/.test(selectedShape)
    ? 'url(#prettyHeartClip)'
    : /원형|원/.test(selectedShape)
      ? 'circle(50% at 50% 50%)'
      : 'inset(0% round 1rem)'

  const [selectedToppingIds, setSelectedToppingIds] = useState<number[]>([])
  const toggleTopping = (id: number) => {
    setSelectedToppingIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const currentSheetColor = sheetsToUse.find((s) => s.label === selectedSheet)?.color ?? '#E9C496'
  const currentCakeColor =
    icingColorsToUse.find((c) => c.id === selectedIcingId)?.colorCode ?? '#FFFFFF'
  const currentCreamColor = creamsToUse.find((c) => c.label === selectedCream)?.color ?? '#F5F5F5'
  const basePrice = mode === 'DIRECT' ? 15000 : Number(navState.price ?? 15000)

  const sizeExtra = Number(
    mappedCakeSizes.find((s) => s.label === selectedSize)?.additionalPrice ?? 0,
  )
  const shapeExtra = Number(
    shapesToUse.find((s) => s.label === selectedShape)?.additionalPrice ?? 0,
  )
  const sheetExtra = Number(
    sheetsToUse.find((s) => s.label === selectedSheet)?.additionalPrice ?? 0,
  )
  const creamExtra = Number(
    creamsToUse.find((c) => c.label === selectedCream)?.additionalPrice ?? 0,
  )
  const toppingsExtra = selectedToppingIds.reduce((sum, id) => {
    const t = toppingsToUse.find((x) => x.id === id)
    return sum + Number(t?.additionalPrice ?? 0)
  }, 0)

  const icingExtra = Number(
    icingColorsToUse.find((i) => i.id === selectedIcingId)?.additionalPrice ?? 0,
  )

  const totalPrice =
    basePrice + sizeExtra + shapeExtra + sheetExtra + creamExtra + toppingsExtra + icingExtra

  const handleImageUpload = (image: { file: File; previewUrl: string }) => {
    setUploadedImage(image.previewUrl)
    setStep('CUSTOMIZE')
  }

  const handleOrderSubmit = async () => {
    if (!shopIdFromState || !pickupDatetimeFromState) {
      alert('가게 정보 또는 픽업 시간이 없습니다.')
      return
    }

    const userId = getUserIdFromToken()
    if (!userId) {
      alert('로그인이 필요합니다.')
      return
    }

    try {
      const shopCustoms = await getShopCustomOptions(Number(shopIdFromState))

      const customOptionIds: number[] = []

      if (selectedSheet) {
        const matched = shopCustoms.customOptions.find(
          (opt) => opt.category === 'SHEET' && opt.optionName === selectedSheet,
        )
        if (matched && matched.optionId > 0) {
          customOptionIds.push(matched.optionId)
        }
      }

      if (selectedCream) {
        const matched = shopCustoms.customOptions.find(
          (opt) => opt.category === 'CREAM' && opt.optionName === selectedCream,
        )
        if (matched && matched.optionId > 0) {
          customOptionIds.push(matched.optionId)
        }
      }

      if (selectedIcingId) {
        const icingFromApi = apiOptions.find(
          (o) => o.category === 'ICING' && o.optionId === selectedIcingId,
        )
        if (icingFromApi) {
          const matched = shopCustoms.customOptions.find(
            (opt) => opt.category === 'ICING' && opt.optionName === icingFromApi.optionName,
          )
          if (matched && matched.optionId > 0) {
            customOptionIds.push(matched.optionId)
          }
        }
      }

      if (selectedShape) {
        const matched = shopCustoms.customOptions.find(
          (opt) => opt.category === 'SHAPE' && opt.optionName === selectedShape,
        )
        if (matched && matched.optionId > 0) {
          customOptionIds.push(matched.optionId)
        }
      }

      const toppings = selectedToppingIds
        .map((toppingId) => {
          const toppingFromApi = apiOptions.find(
            (o) => o.category === 'TOPPING' && o.optionId === toppingId,
          )
          if (!toppingFromApi) return null

          const matched = shopCustoms.customOptions.find(
            (opt) => opt.category === 'TOPPING' && opt.optionName === toppingFromApi.optionName,
          )
          return matched && matched.optionId > 0
            ? { optionId: matched.optionId, x: 0.5, y: 0.5 }
            : null
        })
        .filter((t): t is { optionId: number; x: number; y: number } => t !== null)

      let letteringLineCount: 'ONE_LINE' | 'TWO_LINE' | null = 'ONE_LINE'
      let letteringAlignment: 'CENTER' | 'CURVE_UP' | 'CURVE_UP_DOWN' | null = 'CENTER'

      if (letteringStyle === 'both-arc') {
        letteringLineCount = 'TWO_LINE'
        letteringAlignment = 'CENTER'
      } else if (letteringStyle === 'top-arc') {
        letteringLineCount = 'ONE_LINE'
        letteringAlignment = 'CURVE_UP'
      } else {
        letteringLineCount = 'ONE_LINE'
        letteringAlignment = 'CENTER'
      }

      let shopCakeSizeId = 1
      if (selectedSize === '도시락') {
        shopCakeSizeId = 11
      } else if (selectedSize === '1호') {
        shopCakeSizeId = 12
      } else if (selectedSize === '2호') {
        shopCakeSizeId = 13
      }

      const orderData = {
        shopId: shopIdFromState,
        shopCakeSizeId,
        pickupDatetime: pickupDatetimeFromState,
        letteringText: lettering || null,
        letteringLineCount,
        letteringAlignment,
        additionalRequest:
          additionalOptions && additionalOptions !== '요청 사항을 입력해주세요.'
            ? additionalOptions
            : null,
        referenceImageUrl: uploadedImage || null,
        paymentMethod: null,
        customOptionIds,
        toppings,
      }

      if (customOptionIds.length === 0) {
        alert('주문 가능한 옵션이 없습니다. 옵션을 선택해주세요.')
        return
      }

      const result = await createCustomOrderDraft(userId, orderData)

      navigate(`/order/detail/${result.customId}`, {
        state: { shopId: shopIdFromState },
      })
    } catch (error) {
      console.error('주문 임시저장 실패:', error)
      alert('주문 처리 중 오류가 발생했습니다.')
    }
  }

  const LetteringSectionUI = (
    <div className="space-y-10">
      <section>
        <OptionHeader
          title="레터링"
          tag={mode === 'DIRECT' ? '' : '인기 옵션'}
          value={letteringStyle === 'center' ? '가운데정렬' : '곡선정렬'}
        />
        <p className="text-[12px] text-[#57504F] mt-1">줄바꿈 그대로 적용됩니다.</p>
        <textarea
          value={lettering}
          onChange={(e) => setLettering(e.target.value)}
          className="w-full py-3 px-4 rounded-xl mt-3 bg-white border-none shadow-inner focus:ring-1 focus:ring-[#FF9980] outline-none text-sm resize-none"
          rows={2}
          placeholder="문구를 입력해주세요."
        />
      </section>

      <section>
        <div className="flex gap-2 mb-4">
          {[
            { id: 'align', label: '정렬' },
            { id: 'color', label: '색상' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDecoTab(tab.id as DecoSubTab)}
              className={`px-5 py-1.5 rounded-full text-[13px] font-bold transition-all ${decoTab === tab.id ? 'bg-[#FFE6DF] text-[#333] border border-[#FF9980]' : 'bg-white text-gray-400'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {decoTab === 'align' && (
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                id: 'center',
                label: '가운데',
                icon: <rect x="5" y="14" width="20" height="2" rx="1" fill="currentColor" />,
              },
              {
                id: 'top-arc',
                label: '위로 둥글게',
                icon: (
                  <path
                    d="M5 18C5 18 8 10 15 10C22 10 25 18 25 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                ),
              },
              {
                id: 'both-arc',
                label: '위아래 둥글게',
                icon: (
                  <g>
                    <path
                      d="M7 12C7 12 10 7 15 7C20 7 23 12 23 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M7 18C7 18 10 23 15 23C20 23 23 18 23 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </g>
                ),
              },
            ].map((style) => (
              <button
                key={style.id}
                onClick={() => {
                  setLetteringStyle(style.id as LetterStyle)
                  setViewMode('top')
                }}
                className={`relative flex flex-col items-center justify-center aspect-square p-2 rounded-[18px] border-2 transition-all ${letteringStyle === style.id ? 'border-[#FF9980] bg-white shadow-sm' : 'border-transparent bg-white'}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${letteringStyle === style.id ? 'bg-[#FFF2EF] text-[#FF9980]' : 'bg-[#F8F8F8] text-gray-300'}`}
                >
                  <svg viewBox="0 0 30 30" className="w-6 h-6">
                    {style.icon}
                  </svg>
                </div>
                <span
                  className={`text-[11px] font-bold ${letteringStyle === style.id ? 'text-gray-800' : 'text-gray-400'}`}
                >
                  {style.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {decoTab === 'color' && (
          <div className="flex gap-4">
            {icingColorsToUse.map((color) => (
              <IcingIcon
                key={color.id}
                color={color}
                selected={letterColor === color.colorCode}
                onClick={() => setLetterColor(color.colorCode)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )

  if (step === 'UPLOAD') {
    return <ImageUploadStep onSkip={() => setStep('CUSTOMIZE')} onNext={handleImageUpload} />
  }

  return (
    <div className="w-full mx-auto bg-chat-bg h-screen flex flex-col text-gray-800 relative overflow-hidden">
      <Header
        title={viewMode}
        type="customize"
        onBack={() => {
          if (shopIdFromState) {
            navigate('/', { state: { openShopId: shopIdFromState } })
          } else {
            navigate(-1)
          }
        }}
      />

      <motion.div
        animate={{ opacity: isSheetOpen ? 0 : 1, y: isSheetOpen ? -8 : 0 }}
        transition={{ duration: 0.18 }}
        className="max-w-md mx-auto w-50%"
        style={{ pointerEvents: isSheetOpen ? 'none' : 'auto' }}
      >
        <div className="h-px bg-sub-brown-100" />
        <div className="flex justify-between items-center py-2 px-1 gap-2">
          <span className="text-[13.5px] tracking-tight text-[#2a2929] font-bold">현재금액</span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[14px] font-bold text-sub-gray-100">
              {totalPrice.toLocaleString()}
            </span>
            <span className="text-[12px] font-bold text-sub-gray-100">원</span>
          </div>
        </div>
        <div className="h-px bg-sub-brown-100" />
      </motion.div>

      <TopSidePreview
        isSheetOpen={isSheetOpen}
        viewMode={viewMode}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        mappedCakeSizes={mappedCakeSizes}
        selectedSize={selectedSize}
        shapeClipPath={shapeClipPath}
        currentCakeColor={currentCakeColor}
        currentSheetColor={currentSheetColor}
        currentCreamColor={currentCreamColor}
        setViewMode={setViewMode}
        lettering={lettering}
        letteringStyle={letteringStyle}
        letterColor={letterColor}
      />

      <div className="absolute bottom-2 left-0 right-0 px-6 z-100 pointer-events-none">
        <button
          onClick={handleOrderSubmit}
          className="w-full bg-[#F4A792] text-white py-3 rounded-[50px] font-black text-lg shadow-xl pointer-events-auto active:scale-95 transition-transform"
        >
          이대로 제작하기
        </button>
      </div>

      <CustomizeBottomSheet
        mode={mode}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        cakeNameFromState={cakeNameFromState}
        navItems={navItems}
        currentTab={currentTab}
        setCurrentTab={(k: string) => setCurrentTab(k as TabType)}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="space-y-10 animate-fadeIn">
              {currentTab === '사이즈' && (
                <>
                  <section>
                    <OptionHeader
                      title="사이즈"
                      tag={mode === 'DIRECT' ? '' : '인기 옵션'}
                      value={selectedSize}
                    />
                    <div className="grid grid-cols-3 gap-3">
                      {mappedCakeSizes.map((item) => (
                        <SizeCard
                          key={item.label}
                          item={item}
                          isSelected={selectedSize === item.label}
                          onClick={(label: string) => setSelectedSize(label)}
                        />
                      ))}
                    </div>
                  </section>
                  {hasShape && (
                    <section>
                      <OptionHeader
                        title="모양"
                        tag={mode === 'DIRECT' ? '' : '인기 옵션'}
                        value={selectedShape}
                      />
                      <div className="grid grid-cols-3 gap-3">
                        {shapesToUse.map((shape) => (
                          <ShapeCard
                            key={shape.id}
                            shape={shape}
                            isSelected={selectedShape === shape.label}
                            onClick={(label: string) => setSelectedShape(label)}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )}

              {currentTab === '맛' && (
                <>
                  {hasSheet && (
                    <section>
                      <OptionHeader
                        title="시트"
                        tag={mode === 'DIRECT' ? '' : '인기 옵션'}
                        value={selectedSheet}
                      />
                      <div className="grid grid-cols-3 gap-3">
                        {sheetsToUse.map((sheet) => (
                          <SheetCard
                            key={sheet.label}
                            sheet={sheet}
                            selectedSheet={selectedSheet}
                            onClick={(label: string) => {
                              setSelectedSheet(label)
                              setViewMode('side')
                            }}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                  {hasCream && (
                    <section>
                      <OptionHeader
                        title="크림"
                        tag={mode === 'DIRECT' ? '' : '인기 옵션'}
                        value={selectedCream}
                      />
                      <div className="grid grid-cols-3 gap-3">
                        {creamsToUse.map((cream) => (
                          <CreamCard
                            key={cream.label}
                            cream={cream}
                            isSelected={selectedCream === cream.label}
                            onClick={(label: string) => setSelectedCream(label)}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )}

              {currentTab === '데코' && (
                <div className="space-y-10 animate-fadeIn">
                  {hasIcing && (
                    <section>
                      <OptionHeader
                        title="아이싱"
                        tag={mode === 'DIRECT' ? '' : '인기 옵션'}
                        value="컬러선택"
                      />
                      <div className="flex gap-4">
                        {icingColorsToUse.map((color) => (
                          <IcingIcon
                            key={color.id}
                            color={color}
                            selected={selectedIcingId === color.id}
                            onClick={() => setSelectedIcingId(color.id)}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                  {hasTopping && (
                    <section>
                      <OptionHeader title="토핑" tag="유료 옵션" value="선택" />
                      <div className="flex flex-wrap gap-3 mt-3">
                        {toppingsToUse.map((t) => (
                          <ToppingPill
                            key={t.id}
                            t={t}
                            active={selectedToppingIds.includes(t.id)}
                            onClick={(id: number) => toggleTopping(id)}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                  {LetteringSectionUI}
                </div>
              )}

              {currentTab === '추가요청' && (
                <section>
                  <OptionHeader title="요청사항" tag="" value="" />
                  <textarea
                    value={additionalOptions}
                    onChange={(e) => setAdditionalOptions(e.target.value)}
                    className="w-full py-4 px-4 rounded-xl mt-3 bg-white border-none shadow-inner text-sm"
                    rows={5}
                  />
                </section>
              )}
            </div>
          </div>
        </div>
      </CustomizeBottomSheet>

      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="prettyHeartClip" clipPathUnits="objectBoundingBox">
            <path d="M0.982,0.37 C0.98,0.252,0.916,0.136,0.818,0.088 C0.765,0.062,0.705,0.058,0.649,0.077 C0.599,0.094,0.549,0.128,0.5,0.183 C0.451,0.128,0.401,0.094,0.351,0.077 C0.295,0.058,0.235,0.062,0.182,0.088 C0.084,0.136,0.02,0.252,0.018,0.37 V0.371 C0.018,0.543,0.116,0.695,0.22,0.803 C0.267,0.851,0.319,0.895,0.376,0.931 C0.4,0.947,0.423,0.959,0.443,0.968 C0.462,0.976,0.482,0.982,0.5,0.982 C0.518,0.982,0.538,0.976,0.557,0.968 C0.577,0.959,0.6,0.947,0.624,0.932 C0.681,0.895,0.733,0.851,0.78,0.803 C0.884,0.695,0.982,0.543,0.982,0.371 V0.37 Z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}
