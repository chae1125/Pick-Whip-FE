import { useNavigate } from 'react-router-dom'
import { ChevronRight, FileText, CircleAlert, User, UserX } from 'lucide-react'
import BackHeader from '@/components/BackHeader'
import SettingCard from '../components/SettingCard'
import SettingButton from '../components/SettingButton'

export default function SettingsPage() {
  const navigate = useNavigate()

  return (
    <main className="container w-full bg-white">
      <BackHeader title="설정" bgColor="bg-white" />

      <div className="w-full mt-6 flex flex-col">
        <SettingCard title="약관 및 정책">
          <SettingButton
            icon={<FileText size={17} className="text-[#4A5565]" />}
            title="이용약관"
          />
          <div className="h-[0.67px] bg-[#F3F4F6]" />
          <SettingButton
            icon={<FileText size={17} className="text-[#4A5565]" />}
            title="개인정보 처리방침"
          />
        </SettingCard>

        <div className="mt-4" />

        <SettingCard title="고객 지원">
          <SettingButton
            icon={<CircleAlert size={17} className="text-[#4A5565]" />}
            title="신고하기"
          />
        </SettingCard>

        <div className="mt-4" />

        <SettingCard title="고객 정보 수정">
          <SettingButton
            icon={<User size={17} className="text-[#364153]" />}
            title="내 정보 수정"
            onClick={() => navigate('edit-my-info')}
          />
        </SettingCard>

        <div className="mt-4 rounded-[9px] border border-[#FFC9C9] bg-white shadow-sm overflow-hidden">
          <button
            type="button"
            className="w-full px-4 py-3 min-h-[49px] flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <UserX size={17} className="text-[#E7000B]" />
              <p className="!text-[14px] !text-[#E7000B]">탈퇴하기</p>
            </div>
            <ChevronRight size={17} className="text-[#FF6467]" />
          </button>
        </div>

        <p className="!mt-[10px] !text-[10px] !text-[#6A7282] flex justify-center">버전 1.0.0</p>
      </div>
    </main>
  )
}
