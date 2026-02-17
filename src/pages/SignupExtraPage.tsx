import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import BackHeader from '@/components/BackHeader'
import { getUserIdWithCookie } from '@/utils/auth'
import { saveExtraInfo } from '@/apis/user'

export default function SignupExtraPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [gender, setGender] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = params.get('accessToken')
      if (token) {
        navigate('/signup/extra', { replace: true })
        return
      }

      const userId = await getUserIdWithCookie()
      setIsCheckingAuth(false)

      if (!userId) {
        navigate('/auth/login', { replace: true })
      }
    }

    checkAuth()
  }, [params, navigate])

  const isPhoneValid = /^010\d{8}$/.test(phone)
  const isBirthdateValid = /^\d{6}$/.test(birthdate)

  const canSave =
    !isSaving && name.trim().length > 0 && isPhoneValid && isBirthdateValid && gender !== ''

  const handleSave = async () => {
    if (!canSave) return

    const userId = await getUserIdWithCookie()
    if (!userId) return alert('로그인이 필요합니다.')

    const genderCode = gender === 'MALE' ? '1' : gender === 'FEMALE' ? '2' : '0'
    const formattedBirthdate =
      (birthdate.length >= 6 ? birthdate.substring(0, 6) : birthdate) + genderCode

    try {
      setIsSaving(true)
      await saveExtraInfo({ name, phone, birthdate: formattedBirthdate }, userId)
      navigate('/')
    } catch (e: unknown) {
      console.error('save extra info failed', e)
      let message: string | undefined
      if (typeof e === 'object' && e !== null && 'message' in e) {
        const m = (e as { message?: unknown }).message
        if (typeof m === 'string') message = m
      }
      alert(message ?? '추가 정보 저장에 실패했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isCheckingAuth) {
    return null
  }

  return (
    <main className="container bg-white min-h-screen flex flex-col relative">
      <BackHeader title="추가 정보 입력" bgColor="bg-white" />

      <div className="mt-5 flex-1 overflow-y-auto pb-[110px]">
        <p className="!mt-5 !text-[12.25px] !text-[#364153]">이름</p>
        <input
          value={name}
          placeholder="이름을 입력해주세요"
          onChange={(e) => setName(e.target.value)}
          className="!mt-3 w-full h-[43.33px] px-4 rounded-[8.75px] !text-[14px] !border-[0.67px] outline-none bg-white !border-[#D1D5DC] text-[#0A0A0A] placeholder:!text-[#9CA3AF] focus:!border-[#BA8675]"
        />

        <p className="!mt-5 !text-[12.25px] !text-[#364153]">휴대폰 번호</p>
        <input
          value={phone}
          placeholder="01012345678"
          onChange={(e) => setPhone(e.target.value)}
          className="!mt-3 w-full h-[43.33px] px-4 rounded-[8.75px] !text-[14px] !border-[0.67px] outline-none bg-white !border-[#D1D5DC] text-[#0A0A0A] placeholder:!text-[#9CA3AF] focus:!border-[#BA8675]"
        />

        <p className="!mt-5 !text-[12.25px] !text-[#364153]">생년월일</p>
        <input
          value={birthdate}
          placeholder="YYMMDD"
          onChange={(e) => setBirthdate(e.target.value)}
          className="!mt-3 w-full h-[43.33px] px-4 rounded-[8.75px] !text-[14px] !border-[0.67px] outline-none bg-white !border-[#D1D5DC] text-[#0A0A0A] placeholder:!text-[#9CA3AF] focus:!border-[#BA8675]"
        />

        <p className="!mt-5 !text-[12.25px] !text-[#364153]">성별</p>
        <div className="flex gap-2 mt-3">
          {[
            { label: '남성', value: 'MALE' },
            { label: '여성', value: 'FEMALE' },
            { label: '없음', value: 'NONE' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setGender(item.value)}
              className={`flex-1 h-[43.33px] rounded-[8.75px] !text-[14px] border-[0.67px] transition-all
                ${
                  gender === item.value
                    ? 'bg-[#57504F] text-white border-[#57504F]'
                    : 'bg-white text-[#9CA3AF] border-[#D1D5DC]'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container fixed bottom-0 left-0 right-0 bg-white">
        <div className="-mx-4 h-[0.67px] bg-[#E5E7EB]" />
        <div className="pt-4 pb-4">
          <button
            onClick={handleSave}
            disabled={!canSave}
            className={`w-full h-[45px] rounded-[8.75px] border-[1px] text-[14px]
              ${canSave ? '!bg-[#57504F] !text-white !border-[#57504F]' : '!bg-white !text-[#57504F] !border !border-[#57504F]'}
              ${isSaving ? 'cursor-not-allowed' : ''}`}
          >
            {isSaving ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </div>
    </main>
  )
}
