import IconTagCake from '../assets/reviewCard/icon-tag-cake.svg?react'
import IconTagMessage from '../assets/reviewCard/icon-tag-chat.svg?react'
import type { ReviewCardData } from './review'

const picsum = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/600/600`

export const mockReviews: ReviewCardData[] = [
  {
    id: 'r1',
    menuName: '이지',
    optionLabel: '크리스마스 파티 케이크',
    createdAt: '2025.12.09',
    rating: 5,
    content:
      '정말 맛있었어요! 디자인도 예쁘고 맛도 최고였습니다. 다음에도 꼭 주문하고 싶어요. 사장님도 친절하시고 포장도 꼼꼼하게 해주셨습니다.',
    imageUrls: [picsum('cake-1'), picsum('cake-2'), picsum('cake-3')],
    tags: [
      { label: '원했던 맛이에요', icon: <IconTagCake /> },
      { label: '요청사항을 잘 들어주셨어요', icon: <IconTagMessage /> },
    ],
    extraTagCount: 2,
    helpfulCount: 4,
  },
  {
    id: 'r2',
    menuName: '언베링',
    optionLabel: '생일 축하 케이크',
    createdAt: '2025.12.09',
    rating: 4,
    content: '생각보다 크기가 딱 좋았고 디자인도 마음에 들었어요. 다음에도 주문할게요!',
  },
  {
    id: 'r3',
    menuName: '메종 드 가토',
    optionLabel: '생일 축하 케이크',
    createdAt: '2025.12.09',
    rating: 4,
    content: '맛있었어요. 다만 픽업 시간이 조금 늦어져서 아쉬웠습니다.',
    imageUrls: [picsum('party-1'), picsum('party-2')],
    tags: [
      { label: '원했던 맛이에요', icon: <IconTagCake /> },
      { label: '요청사항을 잘 들어주셨어요', icon: <IconTagMessage /> },
    ],
    extraTagCount: 3,
    helpfulCount: 5,
    ownerReply: {
      content: '소중한 리뷰 감사합니다! 다음에도 더 맛있는 케이크로 찾아뵙겠습니다',
    },
  },
]
