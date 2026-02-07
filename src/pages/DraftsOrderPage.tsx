import BackHeader from '@/components/BackHeader'
import DraftsCard, { type Drafts } from '@/components/drafts/DraftsCard'
import DraftsNoticeBanner from '@/components/drafts/DraftsNoticeBanner'

const MOCK_DRAFTS: Drafts[] = [
  {
    imageURL:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS435Vj59gQf7PeVuhLWlidqmAsFNRvdqpnPw&s',
    title: '메종 드 베이커리',
    size: '1호 (15cm)',
    pickupDate: '2025-01-16',
    design: '깜짝 생일 케이크',
    lastSave: '2025-01-02 10:30',
    progressLabel: '픽업 시간 선택 중',
    progress: '픽업',
  },
  {
    imageURL:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS435Vj59gQf7PeVuhLWlidqmAsFNRvdqpnPw&s',
    title: '스윗 라운지',
    size: '미니 (10cm)',
    pickupDate: '2025-02-03',
    design: '심플 케이크',
    lastSave: '2025-01-28 21:10',
    progressLabel: '주문자 정보 입력 중',
    progress: '주문자 정보',
  },
]

export default function DraftsOrderPage() {
  const count = MOCK_DRAFTS.length

  return (
    <main className="relative pt-10 container w-full bg-[#FBF3F2]">
      <BackHeader
        title="임시저장 주문"
        bgColor="#FBF3F2"
        titleClassName="!font-semibold !text-[20px]"
      />

      <div className="absolute top-10 right-5 h-[56px] flex items-center gap-2">
        <span className="text-[13px] font-medium text-[#4A5565]">임시 저장</span>
        <span className="text-[13px] font-semibold text-[#D65151]">{count}</span>
      </div>

      <DraftsNoticeBanner />

      <div className="w-full mt-6 flex flex-col">
        {MOCK_DRAFTS.map((draft, idx) => (
          <DraftsCard
            key={`${draft.title}-${idx}`}
            draft={draft}
            onContinue={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
    </main>
  )
}
