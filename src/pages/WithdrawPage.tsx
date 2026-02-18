import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackHeader from '@/components/BackHeader'
import { withdrawUser } from '@/apis/user'

const WITHDRAW_REASONS: { code: string; label: string }[] = [
  { code: 'NOT_USED_OFTEN', label: '자주 사용하지 않아요' },
  { code: 'EXPENSIVE_PRICE', label: '요금이 비싸요' },
  { code: 'LACK_OF_DESIGN', label: '원하는 디자인/기능이 없어요' },
  { code: 'INCONVENIENT_SERVICE', label: '앱 사용이 불편해요' },
  { code: 'APP_ERROR', label: '앱 오류/버그가 있어요' },
  { code: 'OTHER', label: '기타' },
]

export default function WithdrawPage() {
  const navigate = useNavigate()
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])
  const [feedback, setFeedback] = useState('')
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  const handleReasonToggle = (code: string) => {
    setSelectedReasons((prev) =>
      prev.includes(code) ? prev.filter((r) => r !== code) : [...prev, code],
    )
  }

  const handleWithdraw = async () => {
    if (isWithdrawing) return

    const confirmed = window.confirm(
      '정말로 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.',
    )
    if (!confirmed) return

    try {
      setIsWithdrawing(true)
      await withdrawUser({
        reasons: selectedReasons,
        feedback,
      })

      alert('회원 탈퇴가 완료되었습니다.')
      navigate('/auth/login', { replace: true })
    } catch (error) {
      console.error('회원 탈퇴 실패:', error)
      alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsWithdrawing(false)
    }
  }

  return (
    <main className="container bg-white min-h-screen flex flex-col">
      <BackHeader title="회원 탈퇴" bgColor="bg-white" />

      <div className="mt-6 flex-1 overflow-y-auto pb-[110px] px-4">
        <div className="mb-6">
          <h2 className="!text-[18px] !font-semibold !text-[#0A0A0A] !mb-2">정말 떠나시나요? 😢</h2>
          <p className="!text-[14px] !text-[#6A7282] leading-relaxed">
            탈퇴하시면 모든 데이터가 삭제되며 복구할 수 없습니다.
            <br />
            떠나시기 전에 불편한 점을 알려주시면 더 나은 서비스를 만들겠습니다.
          </p>
        </div>

        <div className="mb-6">
          <p className="!text-[14px] !font-medium !text-[#364153] !mb-3">탈퇴 사유 (선택)</p>
          <div className="space-y-2">
            {WITHDRAW_REASONS.map(({ code, label }) => (
              <label
                key={code}
                className="flex items-center gap-3 py-3 px-4 rounded-lg border border-[#E5E7EB] cursor-pointer hover:bg-[#F9FAFB] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedReasons.includes(code)}
                  onChange={() => handleReasonToggle(code)}
                  className="w-4 h-4 rounded border-[#D1D5DC] text-[#BA8675] focus:ring-[#BA8675]"
                />
                <span className="!text-[14px] !text-[#364153]">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="!text-[14px] !font-medium !text-[#364153] !mb-3">추가 의견 (선택)</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="서비스 개선을 위한 의견을 자유롭게 남겨주세요."
            className="w-full h-[120px] px-4 py-3 rounded-lg border border-[#D1D5DC] !text-[14px] !text-[#0A0A0A] placeholder:!text-[#9CA3AF] outline-none focus:border-[#BA8675] resize-none"
            maxLength={500}
          />
          <p className="!text-[12px] !text-[#9CA3AF] mt-1 text-right">{feedback.length}/500</p>
        </div>
      </div>

      {/* 탈퇴하기 버튼 */}
      <div className="container fixed bottom-0 left-0 right-0 bg-white">
        <div className="-mx-4 h-[0.67px] bg-[#E5E7EB]" />
        <div className="pt-4 pb-4 px-4">
          <button
            onClick={handleWithdraw}
            disabled={isWithdrawing}
            className={`w-full h-[45px] rounded-[8.75px] !text-[14px] font-medium
              ${
                isWithdrawing
                  ? '!bg-[#FFFFFF] !text-[#57504F] cursor-not-allowed border-1px !border-[#57504F]'
                  : '!bg-[#57504F] !text-white hover:!bg-[#3E3B3A]'
              } transition-colors`}
          >
            {isWithdrawing ? '탈퇴 처리 중...' : '탈퇴하기'}
          </button>
        </div>
      </div>
    </main>
  )
}
