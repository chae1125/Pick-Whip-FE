import { useState } from 'react'
import { motion } from 'framer-motion'
import IcingIcon from '@/components/customize/icingIcon'
import OptionHeader from '@/components/customize/OptionHeader'
import { useParams } from 'react-router-dom'
import ImageUploadStep from './ImageUploadStep'
import Header from '@/components/customize/Header'
import { Download } from 'lucide-react'

type TabType = '디자인' | '맛' | '데코' | '추가사항'
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
  const [currentTab, setCurrentTab] = useState<TabType>('디자인')
  const [viewMode, setViewMode] = useState<ViewMode>('top')
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const [selectedSize, setSelectedSize] = useState<string>('도시락')
  const [selectedShape, setSelectedShape] = useState<string>('원형')
  const [selectedSheet, setSelectedSheet] = useState<string>('바닐라')
  const [selectedCream, setSelectedCream] = useState<string>('생크림')
  const [lettering, setLettering] = useState<string>('메리 크리스마스❤️')
  const [additionalOptions, setAdditionalOptions] =
    useState<string>('뒤에 하트는 꼭 빨간색으로 해주세요!')
  const [letteringStyle, setLetteringStyle] = useState<LetterStyle>('center')
  const [selectedIcingId, setSelectedIcingId] = useState<number | null>(1)
  const [decoTab, setDecoTab] = useState<DecoSubTab>('align')
  const [letterColor, setLetterColor] = useState<string>('#333333')

  const cakeSizes = [
    { label: '도시락', cm: '10cm', circleSize: 'w-10 h-10', scale: 'scale-[0.75]' },
    { label: '1호', cm: '15cm', circleSize: 'w-12 h-12', scale: 'scale-[0.88]' },
    { label: '2호', cm: '18cm', circleSize: 'w-14 h-14', scale: 'scale-100' },
  ]
  const sheets = [
    { label: '바닐라', color: '#E9C496' },
    { label: '초코', color: '#8B4513' },
    { label: '딸기', color: '#FADADD' },
  ]
  const creams = [
    { label: '생크림', color: '#D2EFFB' },
    { label: '크림치즈', color: '#F5F5DC' },
    { label: '초코크림', color: '#5D4037' },
  ]
  const icingColors = [
    { id: 1, colorCode: '#FFB6C1' },
    { id: 2, colorCode: '#87CEFA' },
    { id: 3, colorCode: '#333333' },
    { id: 4, colorCode: '#FFFFFF' },
  ]

  const currentSheetColor = sheets.find((s) => s.label === selectedSheet)?.color || '#E9C496'
  const currentCakeColor = icingColors.find((c) => c.id === selectedIcingId)?.colorCode || '#FFFFFF'
  const totalPrice = 15000

  const handleImageUpload = (image: { file: File; previewUrl: string }) => {
    setUploadedImage(image.previewUrl)
    setStep('CUSTOMIZE')
  }

  const LetteringSectionUI = (
    <div className="space-y-10">
      <section>
        <OptionHeader
          title="레터링"
          tag="인기 옵션"
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
            {icingColors.map((color) => (
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
    <div className="w-full mx-auto bg-chat-bg h-screen flex flex-col font-sans text-gray-800 relative overflow-hidden">
      <Header title={viewMode} type="customize" />

      {/* 금액 바 */}
      <div className="max-w-md mx-auto w-50%">
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
      </div>

      <motion.div
        animate={{ scale: isSheetOpen ? 0.82 : 1.25, y: isSheetOpen ? -80 : 40 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="flex-none h-[45%] flex flex-col relative z-10"
      >
        <div className="flex-1 flex flex-col items-center justify-center -mt-8">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute -bottom-10 -right-5 flex flex-col items-center gap-1">
              <button className="z-20 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform">
                <Download size={20} strokeWidth={3} className="text-main-red-100" />
              </button>
              <span className="text-[13px] font-bold whitespace-nowrap">임시 저장</span>
            </div>

            {uploadedImage ? (
              <div className="relative w-full h-full flex items-center justify-center animate-fadeIn p-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="max-w-full max-h-full object-contain rounded-xl shadow-lg border-4 border-white"
                />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-0 right-0 bg-[#FF9980] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                {viewMode === 'top' ? (
                  <div className="relative w-full h-full flex items-center justify-center animate-fadeIn">
                    <div className="absolute inset-0 rounded-full border-14 border-chat-header opacity-40 shadow-inner" />
                    <div
                      className={`transition-all duration-500 transform ${cakeSizes.find((s) => s.label === selectedSize)?.scale}`}
                    >
                      <div
                        style={{
                          clipPath:
                            selectedShape === '하트'
                              ? 'url(#prettyHeartClip)'
                              : selectedShape === '원형'
                                ? 'circle(50% at 50% 50%)'
                                : 'inset(0% round 1rem)',
                          backgroundColor: currentCakeColor,
                        }}
                        className="w-48 h-48 shadow-2xl flex items-center justify-center transition-colors"
                      >
                        <div className="relative w-full h-full flex items-center justify-center p-6 text-center">
                          {letteringStyle === 'center' ? (
                            <span
                              className="text-[12px] font-bold break-all leading-tight"
                              style={{ color: letterColor }}
                            >
                              {lettering || '문구를 입력하세요'}
                            </span>
                          ) : (
                            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                              <defs>
                                <path id="topCurve" d="M 20,40 Q 50,10 80,40" />
                                <path id="bottomCurve" d="M 20,60 Q 50,90 80,60" />
                              </defs>
                              <g transform="translate(0, -22)">
                                <text className="text-[10px] font-bold">
                                  <textPath
                                    href="#topCurve"
                                    startOffset="50%"
                                    textAnchor="middle"
                                    style={{ fill: letterColor }}
                                  >
                                    {lettering || '메리 크리스마스'}
                                  </textPath>
                                </text>
                              </g>
                              {letteringStyle === 'both-arc' && (
                                <g transform="translate(0, 22)">
                                  <text className="text-[10px] font-bold">
                                    <textPath
                                      href="#bottomCurve"
                                      startOffset="50%"
                                      textAnchor="middle"
                                      style={{ fill: letterColor }}
                                    >
                                      {lettering || '행복한 하루'}
                                    </textPath>
                                  </text>
                                </g>
                              )}
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center animate-fadeIn pt-4 mb-10">
                    <div className="relative w-44 h-36 scale-110">
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-52 h-6 bg-chat-header rounded-sm" />
                      <div className="absolute inset-0 bg-white border-2 border-gray-50 rounded-t-2xl overflow-hidden flex shadow-lg">
                        <div
                          className="w-1/2 h-full"
                          style={{ backgroundColor: currentCakeColor }}
                        />
                        <div className="w-1/2 h-full flex flex-col p-1 gap-1">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex-1 flex flex-col gap-1">
                              <div
                                className="flex-2 rounded-sm"
                                style={{ backgroundColor: currentSheetColor }}
                              />
                              <div
                                className="flex-1 rounded-sm"
                                style={{ backgroundColor: currentCakeColor }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {!uploadedImage && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setViewMode('top')}
                className={`w-3 h-3 rounded-full ${viewMode === 'top' ? 'bg-[#FF9980]' : 'bg-[#D9C8BC]'}`}
              />
              <button
                onClick={() => setViewMode('side')}
                className={`w-3 h-3 rounded-full ${viewMode === 'side' ? 'bg-[#FF9980]' : 'bg-[#D9C8BC]'}`}
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* 제작하기 버튼 */}
      <div className="absolute bottom-10 left-0 right-0 px-6 z-100 pointer-events-none">
        <button className="w-full bg-[#F4A792] text-white py-3.25 rounded-[50px] font-black text-lg shadow-xl pointer-events-auto active:scale-95 transition-transform">
          이대로 제작하기
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ y: isSheetOpen ? 50 : 270 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        className="absolute bottom-0 left-0 right-0 h-[60vh] bg-[#FAF7F5] rounded-t-[45px] z-50 flex flex-col"
      >
        <button
          onClick={() => setIsSheetOpen(!isSheetOpen)}
          className="w-full flex justify-center pt-5 pb-3 group"
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-15 h-15 bg-chat-bg rounded-full flex items-center justify-center">
            <motion.svg
              animate={{ rotate: isSheetOpen ? 180 : 0 }}
              width="45"
              height="45"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M6 14L12 8L18 14"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>
        </button>

        <div className="px-7 flex flex-col h-full overflow-hidden">
          <div className="text-center mb-6">
            <h2 className="text-[19px] text-[#1E2939] font-bold">크리스마스 파티 케이크</h2>
          </div>

          {mode === 'DIRECT' && (
            <>
              <nav className="flex justify-between bg-white rounded-full p-1 border border-gray-100 mb-6">
                {['디자인', '맛', '데코', '추가사항'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCurrentTab(tab as TabType)}
                    className={`flex-1 py-2.5 rounded-full text-[13px] font-bold ${currentTab === tab ? 'bg-[#FBE9E9] text-[#FF9980]' : 'text-[#D1C1B7]'}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
              <hr className="border border-chat-header mb-6" />
            </>
          )}

          <div className="flex-1 overflow-y-auto pb-48 scrollbar-hide">
            {mode === 'MENU' ? (
              <div className="space-y-10 animate-fadeIn">
                {LetteringSectionUI}
                <section>
                  <OptionHeader title="요청사항" tag="" value="" />
                  <textarea
                    value={additionalOptions}
                    onChange={(e) => setAdditionalOptions(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl mt-3 bg-white border-none shadow-inner focus:ring-1 focus:ring-[#FF9980] outline-none text-sm resize-none"
                    rows={4}
                    placeholder="예시) 하트 색상을 변경해주세요 등"
                  />
                </section>
              </div>
            ) : (
              <div className="space-y-10 animate-fadeIn">
                {currentTab === '디자인' && (
                  <>
                    <section>
                      <OptionHeader title="사이즈" tag="인기 옵션" value={selectedSize} />
                      <div className="grid grid-cols-3 gap-3">
                        {cakeSizes.map((item) => {
                          const isSelected = selectedSize === item.label
                          return (
                            <button
                              key={item.label}
                              onClick={() => setSelectedSize(item.label)}
                              className={`relative bg-white rounded-2xl p-3 h-36 flex flex-col items-center border-2 transition-all ${isSelected ? 'border-[#FF9980]' : 'border-transparent'}`}
                            >
                              <div
                                className={`absolute top-2.5 left-2.5 w-5 h-5 rounded-full flex items-center justify-center z-10 ${isSelected ? 'bg-[#FF9980]' : 'border-2 border-[#E0E0E0] bg-white'}`}
                              >
                                {isSelected && (
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="w-3 h-3 text-white fill-none stroke-current stroke-3"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1 flex items-center justify-center mt-4">
                                <div
                                  className={`${item.circleSize} aspect-square rounded-full bg-main-pink-30 flex items-center justify-center shadow-sm`}
                                >
                                  <span className="text-[9px] font-extrabold text-[#999]">
                                    {item.cm}
                                  </span>
                                </div>
                              </div>
                              <span
                                className={`font-bold text-[13px] mt-2 ${isSelected ? 'text-[#222]' : 'text-[#666]'}`}
                              >
                                {item.label}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </section>
                    <section>
                      <OptionHeader title="모양" tag="인기 옵션" value={selectedShape} />
                      <div className="grid grid-cols-3 gap-3">
                        {['원형', '하트', '사각형'].map((shape) => {
                          const isSelected = selectedShape === shape
                          return (
                            <button
                              key={shape}
                              onClick={() => setSelectedShape(shape)}
                              className={`relative bg-white rounded-2xl p-4 h-36 flex flex-col items-center justify-between border-2 transition-all ${isSelected ? 'border-[#FF9980]' : 'border-transparent'}`}
                            >
                              <div
                                className={`absolute top-3 left-3 w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-[#FF9980]' : 'border-2 border-[#E0E0E0] bg-white'}`}
                              >
                                {isSelected && (
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="w-3 h-3 text-white fill-none stroke-current stroke-3"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1 flex items-center justify-center mt-4 mb-3 text-chat-header">
                                {shape === '원형' && (
                                  <div className="w-14 h-14 rounded-full bg-current" />
                                )}
                                {shape === '사각형' && (
                                  <div className="w-14 h-14 rounded-md bg-current" />
                                )}
                                {shape === '하트' && (
                                  <svg
                                    width="56"
                                    height="56"
                                    viewBox="0 0 72 72"
                                    fill="currentColor"
                                  >
                                    <path d="M70.7142 25.4112C70.5959 17.2752 65.9827 9.26263 58.901 5.96091C55.0949 4.18214 50.7525 3.92638 46.7639 5.24606C43.1382 6.39806 39.5022 8.75863 35.9999 12.4718C32.4976 8.75863 28.8616 6.4032 25.2359 5.24606C21.2472 3.92638 16.9049 4.18214 13.0987 5.96091C6.01701 9.26263 1.40387 17.2752 1.28558 25.4112V25.4523C1.28558 37.3169 8.34158 47.8289 15.8193 55.2089C19.214 58.5812 22.9804 61.5573 27.0462 64.0803C28.7844 65.1398 30.425 65.9883 31.8804 66.5849C33.269 67.1506 34.7244 67.5826 35.9999 67.5826C37.2753 67.5826 38.7256 67.1506 40.1142 66.5849C41.5747 65.9935 43.2153 65.1449 44.9484 64.0855C49.0163 61.5612 52.7844 58.5833 56.1804 55.2089C63.6582 47.8289 70.7142 37.3169 70.7142 25.4575V25.4112Z" />
                                  </svg>
                                )}
                              </div>
                              <span className="font-bold text-sm">{shape}</span>
                            </button>
                          )
                        })}
                      </div>
                    </section>
                  </>
                )}

                {currentTab === '맛' && (
                  <>
                    <section>
                      <OptionHeader title="시트" tag="인기 옵션" value={selectedSheet} />
                      <div className="grid grid-cols-3 gap-3">
                        {sheets.map((sheet) => (
                          <button
                            key={sheet.label}
                            onClick={() => {
                              setSelectedSheet(sheet.label)
                              setViewMode('side')
                            }}
                            className={`bg-white rounded-3xl p-5 flex flex-col items-center border-2 transition-all ${selectedSheet === sheet.label ? 'border-[#FF9980]' : 'border-transparent'}`}
                          >
                            <div className="flex flex-col gap-1.5 mb-5 mt-2">
                              {[1, 2, 3].map((i) => (
                                <div
                                  key={i}
                                  style={{ backgroundColor: sheet.color }}
                                  className="w-16 h-4 rounded-sm shadow-sm"
                                />
                              ))}
                            </div>
                            <span className="font-bold text-[15px]">{sheet.label}</span>
                          </button>
                        ))}
                      </div>
                    </section>
                    <section>
                      <OptionHeader title="크림" tag="인기 옵션" value={selectedCream} />
                      <div className="grid grid-cols-3 gap-3">
                        {creams.map((cream) => {
                          const isSelected = selectedCream === cream.label
                          return (
                            <button
                              key={cream.label}
                              onClick={() => setSelectedCream(cream.label)}
                              className={`bg-white rounded-3xl p-5 flex flex-col items-center border-2 transition-all ${isSelected ? 'border-[#FF9980]' : 'border-transparent'}`}
                            >
                              <div className="mb-4 mt-1">
                                <svg width="40" height="40" viewBox="0 0 37 37" fill="none">
                                  <path
                                    d="M33.3474 19.1617C33.3189 21.7555 32.4639 22.6129 31.5991 24.3312C34.9384 27.8296 38.3886 31.2632 34.839 36.4109L1.04701 36.0239C1.04701 36.0239 -0.620355 34.3402 0.253152 31.7573C0.584962 30.8719 1.95862 29.7929 2.81678 29.1912C0.898903 23.7497 2.91457 20.5439 7.02595 18.8909C6.35294 15.3937 8.93758 11.0972 12.3363 9.40791C15.7363 7.7174 17.4053 9.46718 19.9492 8.63036C22.4942 7.79478 22.5338 4.33634 21.6987 3.46205C20.8623 2.58653 19.0963 1.08147 20.554 0.242002C21.4539 -0.26017 22.7023 -0.128454 26.2081 2.07778C28.1729 3.32092 30.2883 5.93075 30.3416 8.74936C30.3744 10.4804 28.9412 12.8025 28.339 13.916C28.6503 14.0712 33.3795 16.5667 33.3474 19.1617Z"
                                    fill={cream.color}
                                  />
                                </svg>
                              </div>
                              <span
                                className={`font-bold text-[15px] ${isSelected ? 'text-[#222]' : 'text-[#666]'}`}
                              >
                                {cream.label}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </section>
                  </>
                )}

                {currentTab === '데코' && (
                  <div className="space-y-10 animate-fadeIn">
                    <section>
                      <OptionHeader title="아이싱" tag="인기 옵션" value="컬러선택" />
                      <div className="flex gap-4">
                        {icingColors.map((color) => (
                          <IcingIcon
                            key={color.id}
                            color={color}
                            selected={selectedIcingId === color.id}
                            onClick={() => setSelectedIcingId(color.id)}
                          />
                        ))}
                      </div>
                    </section>
                    {LetteringSectionUI}
                  </div>
                )}

                {currentTab === '추가사항' && (
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
            )}
          </div>
        </div>
      </motion.div>

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
