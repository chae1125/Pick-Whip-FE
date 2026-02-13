/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import myPickPinIcon from '../../assets/img/myPickPin.svg'

import { BottomSheet } from '../BottomSheet'
import ShopDetailPage from '@/pages/ShopDetailPage'

interface MapProps {
  onBoundsChange?: (bounds: {
    lowLat: number
    highLat: number
    lowLon: number
    highLon: number
  }) => void
  shops?: any[]
  isMyPick?: boolean
}

export default function KakaoMap({ onBoundsChange, shops = [], isMyPick = false }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)

  const shopMarkersRef = useRef<any[]>([])
  const myLocationMarkerRef = useRef<any>(null)

  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  })
  const [isLoading, setIsLoading] = useState(true)

  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null)

  const closeSheet = () => {
    setIsSheetOpen(false)
    setSelectedShopId(null)
  }

  const openDetail = (shopId: number) => {
    setSelectedShopId(shopId)
    setIsSheetOpen(true)
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
          setIsLoading(false)
        },
        (error) => {
          console.warn('위치 파악 실패(기본 위치 사용):', error)
          setIsLoading(false)
        },
        { enableHighAccuracy: false, timeout: 5000 },
      )
    } else {
      setTimeout(() => setIsLoading(false), 0)
    }
  }, [])

  useEffect(() => {
    if (isLoading) return

    const { kakao } = window as any
    if (!kakao || !kakao.maps || !mapRef.current) return

    kakao.maps.load(() => {
      const container = mapRef.current
      const options = {
        center: new kakao.maps.LatLng(myLocation.lat, myLocation.lng),
        level: 3,
      }
      const map = new kakao.maps.Map(container, options)
      setMapInstance(map)

      const myPosition = new kakao.maps.LatLng(myLocation.lat, myLocation.lng)
      const myLocationContent = `
        <div style="position: relative; display: flex; justify-content: center; align-items: center;">
          <div class="animate-pulse-ring" style="
            position: absolute; width: 40px; height: 40px; border-radius: 50%; background: rgba(59, 130, 246, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
          <div style="
            width: 14px; height: 14px; background: #3b82f6; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.3); z-index: 10;
          "></div>
        </div>
      `
      const myOverlay = new kakao.maps.CustomOverlay({
        position: myPosition,
        content: myLocationContent,
        zIndex: 1,
      })
      myOverlay.setMap(map)
      myLocationMarkerRef.current = myOverlay

      const triggerBoundsChange = () => {
        const bounds = map.getBounds()
        const sw = bounds.getSouthWest()
        const ne = bounds.getNorthEast()

        onBoundsChange?.({
          lowLat: sw.getLat(),
          highLat: ne.getLat(),
          lowLon: sw.getLng(),
          highLon: ne.getLng(),
        })
      }

      triggerBoundsChange()
      kakao.maps.event.addListener(map, 'idle', triggerBoundsChange)
    })
  }, [isLoading, myLocation, onBoundsChange])

  useEffect(() => {
    if (!mapInstance || !shops) return
    const { kakao } = window as any

    shopMarkersRef.current.forEach((overlay) => overlay.setMap(null))
    shopMarkersRef.current = []

    shops.forEach((shop) => {
      const idRaw = shop.shopId ?? shop.id
      const shopId = Number(idRaw)
      if (!Number.isFinite(shopId)) return

      const position = new kakao.maps.LatLng(shop.latitude, shop.longitude)
      const showHeart = isMyPick && shop.isPicked
      const overlayId = `shop-marker-${shopId}`

      const content = `
        <div id="${overlayId}" style="
          position: relative;
          display: flex; 
          flex-direction: column; 
          align-items: center;
          filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.2));
          cursor: pointer;
          pointer-events: auto;
        ">
          ${
            showHeart
              ? `
            <div style="
              position: absolute;
              top: -38px;
              z-index: 20;
              animation: bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              pointer-events: none;
            ">
              <img src="${myPickPinIcon}" width="45" height="55" alt="picked" style="pointer-events:none;" />
            </div>
            `
              : ''
          }

          <div style="
            width: 36px; 
            height: 36px; 
            background: white; 
            border-radius: 50%; 
            border: 2px solid ${showHeart ? '#FF4D77' : '#EA113B'}; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            margin-bottom: 5px;
            z-index: 10;
            pointer-events: none;
          ">
            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="pointer-events:none;">
              <path d="M8.925 0C9.35 0.2125 10.2 1.615 10.2 2.55C10.2 3.485 9.6305 3.825 8.925 3.825C8.2195 3.825 7.65 3.6975 7.65 2.7625C7.65 1.8275 8.5 1.275 8.925 0ZM14.875 7.225C17 7.225 18.7 8.925 18.7 11.05C18.7 12.376 18.0285 13.5405 17 14.229V19.125H1.7V14.229C0.6715 13.5405 0 12.376 0 11.05C0 8.925 1.7 7.225 3.825 7.225H7.65V4.675H10.2V7.225H14.875ZM9.35 13.175C9.91359 13.175 10.4541 12.9511 10.8526 12.5526C11.2511 12.1541 11.475 11.6136 11.475 11.05H12.75C12.75 11.6136 12.9739 12.1541 13.3724 12.5526C13.7709 12.9511 14.3114 13.175 14.875 13.175C15.4386 13.175 15.9791 12.9511 16.3776 12.5526C16.7761 12.1541 17 11.6136 17 11.05C17 10.4864 16.7761 9.94591 16.3776 9.5474C15.9791 9.14888 15.4386 8.925 14.875 8.925H3.825C3.26142 8.925 2.72091 9.14888 2.3224 9.5474C1.92388 9.94591 1.7 10.4864 1.7 11.05C1.7 11.6136 1.92388 12.1541 2.3224 12.5526C2.72091 12.9511 3.26142 13.175 3.825 13.175C4.38859 13.175 4.92909 12.9511 5.3276 12.5526C5.72612 12.1541 5.95 11.6136 5.95 11.05H7.225C7.225 11.6136 7.44888 12.1541 7.8474 12.5526C8.24591 12.9511 8.78642 13.175 9.35 13.175Z" fill="${showHeart ? '#FF4D77' : '#EA113B'}"/>
            </svg>
          </div>

          <div style="
            font-size: 13px; 
            font-weight: 700; 
            color: #111; 
            white-space: nowrap; 
            text-align: center; 
            text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
            pointer-events: none;
          ">
            ${shop.shopName}
          </div>
           
          <style>
            @keyframes bounce {
              0% { transform: translateY(10px) scale(0); opacity: 0; }
              80% { transform: translateY(-5px) scale(1.1); opacity: 1; }
              100% { transform: translateY(0) scale(1); opacity: 1; }
            }
          </style>
        </div>
      `

      const overlay = new kakao.maps.CustomOverlay({
        position,
        content,
        yAnchor: 0.9,
        zIndex: showHeart ? 10 : 3,
      })
      overlay.setMap(mapInstance)
      shopMarkersRef.current.push(overlay)

      setTimeout(() => {
        const el = document.getElementById(overlayId)
        if (!el) return
        el.onclick = () => openDetail(shopId)
      }, 0)
    })
  }, [shops, mapInstance, isMyPick])

  useEffect(() => {
    const handleResize = () => {
      if (mapInstance) {
        mapInstance.relayout()
        const { kakao } = window as any
        mapInstance.setCenter(new kakao.maps.LatLng(myLocation.lat, myLocation.lng))
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mapInstance, myLocation])

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-50">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-500 border-t-transparent" />
            <p className="mt-3 text-sm font-semibold text-gray-600">현재 위치를 확인 중...</p>
          </div>
        </div>
      )}

      <div
        ref={mapRef}
        className="h-full w-full touch-pan-x touch-pan-y"
        style={{ minHeight: '100%' }}
      />

      <BottomSheet isOpen={isSheetOpen} onClose={closeSheet} title="" sheetBg="#FCF4F3">
        {selectedShopId ? <ShopDetailPage shopId={selectedShopId} onBack={closeSheet} /> : null}
      </BottomSheet>
    </div>
  )
}
