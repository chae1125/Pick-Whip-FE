type UserInfoFieldProps = {
  label: string
  value: string
  helperText: string
}

export default function UserInfoField({ label, value, helperText }: UserInfoFieldProps) {
  return (
    <>
      <p className={'!mt-5 !text-[12.25px] !text-[#364153]'}>{label}</p>
      <input
        value={value}
        readOnly
        disabled
        className="!mt-3 w-full h-[43.33px] px-4 rounded-[8.75px] !text-[14px]
        !border-[0.67px] !border-[#D1D5DC] outline-none bg-[#F9FAFB]
        disabled:opacity-100 disabled:text-[#0A0A0A] disabled:bg-[#F9FAFB]"
      />
      <p className="!mt-2 !text-[10.5px] !text-[#6A7282]">{helperText}</p>
    </>
  )
}
