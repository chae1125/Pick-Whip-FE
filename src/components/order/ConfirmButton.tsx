type ConfirmButtonProps = {
  disabled: boolean
  onClick: () => void
}

export default function ConfirmButton({ disabled, onClick }: ConfirmButtonProps) {
  return (
    <section className="max-w-lg mx-auto pb-6">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full rounded-full py-3 text-white !text-[15px] !font-bold transition-colors ${
          disabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-[var(--color-sub-gray-100)] cursor-pointer'
        }`}
      >
        확인
      </button>
    </section>
  )
}
