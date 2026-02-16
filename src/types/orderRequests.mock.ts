import type { OrderInfo } from '@/components/order-history/OrderListCard'

export const mockOrderRequests: OrderInfo[] = [
  {
    orderId: 201,
    imageURL:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS435Vj59gQf7PeVuhLWlidqmAsFNRvdqpnPw&s',
    createdAt: '2025.12.05',
    storeName: '메종 드 가토',
    cakeName: '생일 축하 케이크',
    pickupDate: '2025.12.15 (일)',
    pickupTime: '02:00 PM',
    progressLabel: '주문서 확인 중',
    progress: '주문서 완료',
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
  {
    orderId: 202,
    imageURL:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS435Vj59gQf7PeVuhLWlidqmAsFNRvdqpnPw&s',
    createdAt: '2025.12.05',
    storeName: '스윗 라운지',
    cakeName: '심플 케이크',
    pickupDate: '2025.12.15 (일)',
    pickupTime: '02:00 PM',
    progressLabel: '사장님 메세지를 확인해주세요',
    progress: '제작 불가',
    previewText: '프리뷰 보기',
    detail: {
      design: '미니(10cm)',
      taste: '바닐라 시트 + 크림치즈',
      lettering: 'HBD',
      extraRequest: '촛불 1개',
      finalPriceText: '₩30,000',
      orderCode: '#DEF5678ZZ',
    },
  },
]
