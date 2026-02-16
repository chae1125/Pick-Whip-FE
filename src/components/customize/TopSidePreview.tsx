import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import type { SizeItem } from '@/components/customize/SizeCard'
import type { ReactNode } from 'react'

type ViewMode = 'top' | 'side'
type LetterStyle = 'center' | 'top-arc' | 'both-arc'

interface TopSidePreviewProps {
  isSheetOpen: boolean
  viewMode: ViewMode
  uploadedImage: string | null
  setUploadedImage: (v: string | null) => void
  mappedCakeSizes: Array<SizeItem & { cm?: string; scale?: string }>
  selectedSize: string
  shapeClipPath: string
  currentCakeColor: string
  currentSheetColor: string
  currentCreamColor: string
  setViewMode: (v: ViewMode) => void
  lettering: string
  letteringStyle: LetterStyle
  letterColor: string
  children?: ReactNode
}

export default function TopSidePreview(props: TopSidePreviewProps) {
  const {
    isSheetOpen,
    viewMode,
    uploadedImage,
    setUploadedImage,
    mappedCakeSizes,
    selectedSize,
    shapeClipPath,
    currentCakeColor,
    currentSheetColor,
    currentCreamColor,
    setViewMode,
    lettering,
    letteringStyle,
    letterColor,
  } = props

  const makeArcPath = (cx: number, cy: number, r: number, dir: 'top' | 'bottom') => {
    const startX = cx - r
    const endX = cx + r
    const sweep = dir === 'top' ? 0 : 1
    return `M ${startX} ${cy} A ${r} ${r} 0 0 ${sweep} ${endX} ${cy}`
  }

  return (
    <motion.div
      animate={{ scale: isSheetOpen ? 0.78 : 1.25, y: isSheetOpen ? -120 : 40 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="flex-none h-[45%] flex flex-col relative z-10"
    >
      <div className="flex-1 flex flex-col items-center justify-center -mt-8">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {!isSheetOpen && (
            <div className="absolute -bottom-10 right-0 flex flex-col items-center gap-1">
              <button className="z-20 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform">
                <Download size={15} strokeWidth={3} className="text-main-red-100" />
              </button>
              <span className="text-[11px] font-bold whitespace-nowrap">임시 저장</span>
            </div>
          )}

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
                    className={`transition-all duration-500 transform ${mappedCakeSizes.find((s) => s.label === selectedSize)?.scale ?? ''}`}
                  >
                    <div
                      style={{
                        clipPath: shapeClipPath,
                        backgroundColor: currentCakeColor,
                      }}
                      className="w-48 h-48 shadow-2xl flex items-center justify-center transition-colors"
                    >
                      <div className="relative w-full h-full flex items-center justify-center p-6 text-center">
                        {lettering ? (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
                            {letteringStyle === 'center' && (
                              <div
                                className="text-[16px] font-extrabold leading-snug break-words text-center"
                                style={{ color: letterColor }}
                              >
                                {lettering}
                              </div>
                            )}

                            {(letteringStyle === 'top-arc' || letteringStyle === 'both-arc') &&
                              (() => {
                                const cx = 50

                                const topCy = 44
                                const bottomCy = 56

                                const r = 40

                                return (
                                  <svg
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="xMidYMid meet"
                                    className="w-full h-full pointer-events-none"
                                  >
                                    <defs>
                                      <path id="pw-arc-top" d={makeArcPath(cx, topCy, r, 'top')} />
                                      <path
                                        id="pw-arc-bottom"
                                        d={makeArcPath(cx, bottomCy, r, 'bottom')}
                                      />
                                    </defs>

                                    {letteringStyle === 'top-arc' && (
                                      <text fill={letterColor} fontWeight={700} fontSize={8}>
                                        <textPath
                                          href="#pw-arc-bottom"
                                          startOffset="50%"
                                          textAnchor="middle"
                                        >
                                          {lettering}
                                        </textPath>
                                      </text>
                                    )}

                                    {letteringStyle === 'both-arc' && (
                                      <>
                                        <text fill={letterColor} fontWeight={700} fontSize={7}>
                                          <textPath
                                            href="#pw-arc-top"
                                            startOffset="50%"
                                            textAnchor="middle"
                                          >
                                            {lettering}
                                          </textPath>
                                        </text>
                                        <text fill={letterColor} fontWeight={700} fontSize={7}>
                                          <textPath
                                            href="#pw-arc-bottom"
                                            startOffset="50%"
                                            textAnchor="middle"
                                          >
                                            {lettering}
                                          </textPath>
                                        </text>
                                      </>
                                    )}
                                  </svg>
                                )
                              })()}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center animate-fadeIn pt-4 mb-10">
                  <div className="relative w-44 h-40 scale-110">
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-52 h-6 bg-chat-header rounded-sm" />
                    <div
                      className="absolute inset-0 bg-transparent border-t-6 border-r-6 border-l-6 rounded-t-2xl overflow-hidden flex shadow-lg"
                      style={{ borderColor: currentCakeColor }}
                    >
                      <div className="w-1/2 h-full" style={{ backgroundColor: currentCakeColor }} />
                      <div className="w-1/2 h-full flex flex-col p-1 gap-1">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex-1 flex flex-col gap-1">
                            <div
                              className="flex-2 rounded-sm"
                              style={{ backgroundColor: currentSheetColor }}
                            />
                            <div
                              className="flex-1 rounded-sm"
                              style={{ backgroundColor: currentCreamColor }}
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
  )
}
