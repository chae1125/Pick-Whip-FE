import { useState } from 'react'
import { Info } from 'lucide-react'
import BackHeader from '@/components/BackHeader'
import UserInfoField from '../components/UserInfoField'
import { formatPhoneForView } from '../utils/format'
import { validateNickname } from '../utils/validate'
import type { GetMyInfo } from '../types/auth'

//목업 데이터
const MOCK_ME: GetMyInfo = {
  userId: 1,
  email: 'test@kakao.com',
  name: '홍길동',
  nickname: '생크림123',
  phone: '01012345678',
  birthdate: '040510',
  profileImageUrl:
    'https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img.jpg',
  createdAt: '2026-01-23T14:42:00',
}

export default function EditMyInfoPage() {
  const [me, setMe] = useState(MOCK_ME)
  const [nickname, setNickname] = useState(me.nickname)
  const [isSaving, setIsSaving] = useState(false)

  const error = validateNickname(nickname).nickname
  const showError = nickname.length > 0 && error !== ''
  const isValid = nickname.length > 0 && error === ''
  const canSave = !isSaving && nickname !== me.nickname && isValid

  const handleSave = async () => {
    if (!canSave) return
    try {
      setIsSaving(true)
      await new Promise((r) => setTimeout(r, 350))
      setMe({ ...me, nickname })
      alert('저장되었습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="container bg-white min-h-screen flex flex-col relative">
      <BackHeader title="내 정보 수정" bgColor="bg-white" />

      <div className="mt-5 flex-1 overflow-y-auto pb-[110px]">
        {/* 프로필 사진 */}
        <div className="h-[158px] flex items-center justify-center">
          <div className="w-[90px] h-[90px] rounded-full border-[2px] border-[#FFCECE] overflow-hidden">
            <img src={me.profileImageUrl} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 이름 */}
        <UserInfoField label="이름" value={me.name} helperText="실명은 변경할 수 없습니다" />

        {/* 닉네임 */}
        <p className="!mt-5 !text-[12.25px] !text-[#364153]">닉네임</p>
        <input
          value={nickname}
          placeholder="2~10자 이내의 닉네임을 입력해주세요"
          onChange={(e) => setNickname(e.target.value)}
          onBlur={() => nickname.length === 0 && setNickname(me.nickname)}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          className={`!mt-3 w-full h-[43.33px] px-4 rounded-[8.75px] !text-[14px] !border-[0.67px] outline-none bg-white
            ${showError ? '!border-[#DC5658] text-[#DC5658]' : '!border-[#D1D5DC] text-[#0A0A0A]'}
            placeholder:!text-[#9CA3AF] focus:!border-[#BA8675] focus:!text-[#BA8675] focus:placeholder:!text-[#BA8675]`}
        />

        {showError && (
          <div className="!mt-2 !mb-5 flex items-center gap-2">
            <Info className="h-[14px] w-[14px] text-[#DC5658]" />
            <p className="!text-[13px] !text-[#DE000499]">{error}</p>
          </div>
        )}

        {/* 전화번호 이메일 생년월일 */}
        <UserInfoField
          label="전화번호"
          value={formatPhoneForView(me.phone)}
          helperText="전화번호는 변경할 수 없습니다"
        />
        <UserInfoField
          label="이메일"
          value={me.email}
          helperText="카카오 계정 이메일은 변경할 수 없습니다"
        />

        <div className="mb-40">
          <UserInfoField
            label="생년월일"
            value={me.birthdate}
            helperText="생년월일은 변경할 수 없습니다"
          />
        </div>
      </div>

      {/* 저장하기 버튼 */}
      <div className="container fixed bottom-0 left-0 right-0 bg-white">
        <div className="-mx-4 h-[0.67px] bg-[#E5E7EB]" />
        <div className="pt-4 pb-4">
          <button
            onClick={handleSave}
            disabled={!canSave}
            className={`w-full h-[45px] rounded-[8.75px] border-[1px] text-[14px]
              ${
                canSave
                  ? '!bg-[#57504F] !text-white !border-[#57504F]'
                  : '!bg-white !text-[#57504F] !border !border-[#57504F]'
              }
              ${isSaving ? 'cursor-not-allowed' : ''}`}
          >
            {isSaving ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </div>
    </main>
  )
}
