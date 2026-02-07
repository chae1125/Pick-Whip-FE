import type { OrderInfo } from '@/components/order-history/OrderListCard'

export const mockOrderComplete: OrderInfo[] = [
  {
    imageURL:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS435Vj59gQf7PeVuhLWlidqmAsFNRvdqpnPw&s',
    createdAt: '2025.12.05',
    storeName: '메종 드 가토',
    cakeName: '생일 축하 케이크',
    pickupDate: '2025.12.15 (일)',
    pickupTime: '02:00 PM',
    progressLabel: '픽업 완료',
    progress: '픽업 완료',
    previewText: '프리뷰 보기',
    detail: {
      design: '1호 원형',
      taste: '초코 시트 + 생크림',
      lettering: 'X',
      extraRequest: '크리스마스 토퍼',
      finalPriceText: '₩55,000',
      orderCode: '#ABC1234XY',
    },
  },
]
