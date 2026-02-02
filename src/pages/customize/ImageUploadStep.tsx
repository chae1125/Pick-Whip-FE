import { useRef, useState } from 'react'
import Header from '@/components/customize/Header'
import { Upload } from 'lucide-react'

interface ImageUploadStepProps {
  onSkip: () => void
  onNext: (image: { file: File; previewUrl: string }) => void
}

export default function ImageUploadStep({ onSkip, onNext }: ImageUploadStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleNext = () => {
    if (!selectedFile || !previewUrl) return
    onNext({
      file: selectedFile,
      previewUrl,
    })
  }

  return (
    <div className="relative flex flex-col w-full h-screen bg-chat-bg">
      <Header title="직접 커스터마이징하기" />

      <div className="flex-1 flex items-center justify-center px-5 mb-30">
        <div className="flex flex-col items-center justify-center gap-5 rounded-[15px] bg-main-pink-30 w-full max-w-md py-5 px-5">
          <span className="text-white text-center">나만의 도안으로 케이크를 커스텀해보세요!</span>

          <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleSelectImage} />

          <button
            onClick={() => inputRef.current?.click()}
            className="w-full h-40 bg-white rounded-[10.5px] flex items-center justify-center overflow-hidden"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="업로드 미리보기" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1">
                <Upload className="text-[#b9b9b9] w-10 h-10" />
                <span className="text-sub-gray-100">도안 이미지 업로드</span>
                <span className="text-sub-gray-100 text-[10.5px]">PNG, JPG up to 10MB</span>
              </div>
            )}
          </button>

          <button
            disabled={!selectedFile}
            onClick={handleNext}
            className={`w-full py-3 rounded-full font-bold transition ${
              selectedFile ? 'bg-[#F4A792] text-white' : 'bg-gray-300 text-white cursor-not-allowed'
            }`}
          >
            도안 업로드하기
          </button>
        </div>
        <button
          onClick={onSkip}
          className="
          rounded-[50px] font-bold fixed bottom-6 left-1/2 -translate-x-1/2
          text-[14px] text-white bg-sub-gray-100 py-3 w-83 shadow-[0_0_12px_0_rgba(0,0,0,0.25)]
        "
        >
          건너뛰기
        </button>
      </div>
    </div>
  )
}
