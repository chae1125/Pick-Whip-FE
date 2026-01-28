/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'

interface MapProps {
  placeName?: string
  initialZoom?: number
}

export default function KakaoMap({ placeName = '내 위치', initialZoom = 3 }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  })

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setIsLoading(false)
        },
        (error) => {
          console.error('위치 정보를 가져오는데 실패했습니다.', error)
          setIsLoading(false)
        },
        { enableHighAccuracy: true, timeout: 5000 },
      )
    }
  }, [])

  useEffect(() => {
    const { kakao } = window as any
    if (!kakao || !kakao.maps || !mapRef.current) return

    kakao.maps.load(() => {
      const container = mapRef.current
      const options = {
        center: new kakao.maps.LatLng(coords.lat, coords.lng),
        level: initialZoom,
      }

      const map = new kakao.maps.Map(container, options)
      setMapInstance(map)

      const markerPosition = new kakao.maps.LatLng(coords.lat, coords.lng)

      const markerContent = `
        <div style="position: relative; display: flex; justify-content: center; align-items: center;">
          <div class="animate-pulse-ring"></div>
          <div style="
            width: 14px; 
            height: 14px; 
            background: #3b82f6; 
            border: 2px solid white; 
            border-radius: 50%; 
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            z-index: 10;
          "></div>
        </div>
      `
      const markerOverlay = new kakao.maps.CustomOverlay({
        position: markerPosition,
        content: markerContent,
        zIndex: 3,
      })
      markerOverlay.setMap(map)

      const infoContent = `
        <div style="
          margin-bottom: 85px;
          padding: 8px 16px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          gap: 6px;
        ">
          <span style="font-size: 13px; font-weight: 700; color: #111827; white-space: nowrap;">${placeName}</span>
          <div style="
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%) rotate(45deg);
            width: 10px;
            height: 10px;
            background: white;
            border-right: 1px solid #f3f4f6;
            border-bottom: 1px solid #f3f4f6;
          "></div>
        </div>
      `
      const infoOverlay = new kakao.maps.CustomOverlay({
        position: markerPosition,
        content: infoContent,
        zIndex: 4,
      })
      infoOverlay.setMap(map)

      setTimeout(() => {
        map.relayout()
        map.setCenter(markerPosition)
      }, 300)
    })
  }, [coords, initialZoom, placeName])

  useEffect(() => {
    const handleResize = () => {
      if (mapInstance) {
        mapInstance.relayout()
        mapInstance.setCenter(new (window as any).kakao.maps.LatLng(coords.lat, coords.lng))
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mapInstance, coords])

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-sm font-semibold text-gray-600">현재 위치를 확인 중...</p>
          </div>
        </div>
      )}

      <div
        ref={mapRef}
        className="w-full h-full touch-pan-x touch-pan-y"
        style={{ minHeight: '100%' }}
      />
    </div>
  )
}
