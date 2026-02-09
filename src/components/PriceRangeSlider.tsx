import { useCallback, useEffect, useState, useRef } from 'react'

interface PriceRangeSliderProps {
  min: number
  max: number
  onChange: (min: number, max: number) => void
}

export default function PriceRangeSlider({ min, max, onChange }: PriceRangeSliderProps) {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const minValRef = useRef(min)
  const maxValRef = useRef(max)
  const range = useRef<HTMLDivElement>(null)

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  )

  useEffect(() => {
    const minPercent = getPercent(minVal)
    const maxPercent = getPercent(maxValRef.current)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent])

  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxVal)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxVal, getPercent])

  useEffect(() => {
    onChange(minVal, maxVal)
  }, [minVal, maxVal, onChange])

  return (
    <div className="w-full px-2">
      <h3 className="text-[18px] font-regular text-[#0A0A0A] mb-6">가격대 설정</h3>

      <div className="relative w-full h-6 flex items-center justify-center mb-8">
        <div className="absolute w-full h-4 bg-[#F5E0DA] rounded-full z-0" />

        <div ref={range} className="absolute h-4 bg-[#8E0B0A] rounded-full z-10" />

        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1000)
            setMinVal(value)
            minValRef.current = value
          }}
          className="thumb thumb--left z-20 absolute w-full h-0 outline-none pointer-events-none appearance-none"
          step={1000}
          style={{ zIndex: minVal > max - 100 ? 50 : 20 }}
        />

        <input
          type="range"
          step={1000}
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1000)
            setMaxVal(value)
            maxValRef.current = value
          }}
          className="thumb thumb--right z-30 absolute w-full h-0 outline-none pointer-events-none appearance-none"
        />
      </div>

      <div className="flex justify-between items-center text-center">
        <div className="flex flex-col items-center w-24">
          <span className="text-[14px] text-gray-400 mb-1">최소</span>
          <span className="text-[18px] font-medium text-[#0A0A0A]">
            {minVal.toLocaleString()} 원
          </span>
        </div>
        <div className="text-gray-300 pb-4">-</div>
        <div className="flex flex-col items-center w-24">
          <span className="text-[14px] text-gray-400 mb-1">최대</span>
          <span className="text-[18px] font-medium text-[#0A0A0A]">
            {maxVal.toLocaleString()} 원
          </span>
        </div>
      </div>

      <style>{`
        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: all;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background-color: white;
          border: 1.5px solid #8E0B0A;
          cursor: pointer;
          margin-top: 1px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .thumb::-moz-range-thumb {
          pointer-events: all;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background-color: white;
          border: 2px solid #8E0B0A;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  )
}
