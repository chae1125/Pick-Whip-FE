import { useState, useEffect } from 'react'
import { Info } from 'lucide-react'
import BackHeader from '@/components/BackHeader'
import UserInfoField from '../components/UserInfoField'
import { formatPhoneForView, formatBirthdateForView } from '../utils/format'
import { validateNickname } from '../utils/validate'
import { checkAuthWithCookie, updateMe } from '../apis/user'
import { getPresignedUpload } from '@/apis/s3'
import type { MeResult } from '../apis/user'

export default function EditMyInfoPage() {
  const [me, setMe] = useState<MeResult | null>(null)
  const [nickname, setNickname] = useState('')
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'NONE'>('NONE')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadedPublicUrl, setUploadedPublicUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const data = await checkAuthWithCookie()
        if (!data) {
          alert('로그인이 필요합니다.')
          return
        }
        setMe(data)
        setNickname(data.nickname)
        const bd = data.birthdate
        if (bd && bd.length > 0) {
          const last = bd.charAt(bd.length - 1)
          if (last === '1') setGender('MALE')
          else if (last === '2') setGender('FEMALE')
          else setGender('NONE')
        } else {
          setGender('NONE')
        }
      } catch (error) {
        console.error('내 정보 조회 실패:', error)
        alert('내 정보를 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchMyInfo()
  }, [])

  const error = validateNickname(nickname).nickname
  const showError = nickname.length > 0 && error !== ''
  const isValid = nickname.length > 0 && error === ''
  const imageChanged =
    !!me &&
    ((previewUrl !== null && previewUrl !== me.profileImageUrl) ||
      (uploadedPublicUrl !== null && uploadedPublicUrl !== me.profileImageUrl))
  const canSave =
    !isSaving && me !== null && ((nickname !== me.nickname && isValid) || imageChanged)

  const handleSave = async () => {
    if (!canSave || !me) return
    try {
      setIsSaving(true)
      if (previewUrl && !uploadedPublicUrl && selectedFile) {
        try {
          const presign = await getPresignedUpload(selectedFile.name)
          await fetch(presign.url, {
            method: 'PUT',
            headers: { 'Content-Type': selectedFile.type },
            body: selectedFile,
          })
          const publicUrl = presign.url.split('?')[0]
          setUploadedPublicUrl(publicUrl)
        } catch (err) {
          console.error('백그라운드 업로드 실패:', err)
          alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.')
          return
        }
      }

      const body: { nickname?: string; profileImageUrl?: string } = { nickname }
      if (uploadedPublicUrl) body.profileImageUrl = uploadedPublicUrl

      await updateMe(body, me.userId)
      setMe({ ...me, nickname, profileImageUrl: uploadedPublicUrl ?? me.profileImageUrl })
      alert('저장되었습니다.')
    } catch (error) {
      console.error('내 정보 수정 실패:', error)
      alert('저장에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <main className="container bg-white min-h-screen flex items-center justify-center">
        <p className="text-[14px] text-[#9CA3AF]">로딩 중...</p>
      </main>
    )
  }

  if (!me) {
    return (
      <main className="container bg-white min-h-screen flex items-center justify-center">
        <p className="text-[14px] text-[#DC5658]">정보를 불러올 수 없습니다.</p>
      </main>
    )
  }

  return (
    <main className="container bg-white min-h-screen flex flex-col relative">
      <BackHeader title="내 정보 수정" bgColor="bg-white" />

      <div className="mt-5 flex-1 overflow-y-auto pb-[110px]">
        {/* 프로필 사진 */}
        <div className="h-[158px] flex items-center justify-center">
          <div className="w-[90px] h-[90px] rounded-full border-[2px] border-[#FFCECE] overflow-hidden">
            <label className="w-full h-full block cursor-pointer">
              {previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-cover" />
              ) : me.profileImageUrl ? (
                <img src={me.profileImageUrl} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#F3F4F6] flex items-center justify-center">
                  <span className="text-[24px] text-[#9CA3AF]">👤</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file || !me) return
                  if (previewUrl) URL.revokeObjectURL(previewUrl)
                  const objUrl = URL.createObjectURL(file)
                  setPreviewUrl(objUrl)
                  setSelectedFile(file)

                  try {
                    const presign = await getPresignedUpload(file.name)
                    await fetch(presign.url, {
                      method: 'PUT',
                      headers: { 'Content-Type': file.type },
                      body: file,
                    })
                    const publicUrl = presign.url.split('?')[0]
                    setUploadedPublicUrl(publicUrl)
                  } catch (err) {
                    console.error('프로필 업로드 실패', err)
                    alert('프로필 업로드에 실패했습니다.')
                    setPreviewUrl(null)
                  }
                }}
              />
            </label>
          </div>
        </div>

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
            value={formatBirthdateForView(me.birthdate)}
            helperText="생년월일은 변경할 수 없습니다"
          />
          <p className={'!mt-5 !text-[12.25px] !text-[#364153]'}>성별</p>
          <div className="flex gap-2 mt-3">
            {[
              { label: '남성', value: 'MALE' },
              { label: '여성', value: 'FEMALE' },
              { label: '없음', value: 'NONE' },
            ].map((item) => {
              const isSelected = gender === item.value

              return (
                <button
                  key={item.value}
                  disabled
                  className={`flex-1 mt-3 h-[43.33px] px-4 rounded-[8.75px] !text-[14px] border outline-none transition-all
                  ${
                    isSelected
                      ? '!bg-[#57504F] !text-white !border-[#57504F]'
                      : '!bg-[#F9FAFB] !border-[#D1D5DC] !text-[#9CA3AF]'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
          <p className="!mt-2 !text-[10.5px] !text-[#6A7282]">성별은 변경할 수 없습니다</p>
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
