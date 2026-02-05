export default function StrawberryTopper({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.82)}
      viewBox="0 0 120 98"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.18))' }}
    >
      <path
        d="M60 6
           C78 6 88 18 94 30
           L114 68
           C118 76 114 92 100 92
           H20
           C6 92 2 76 6 68
           L26 30
           C32 18 42 6 60 6 Z"
        fill="#D84A3C"
      />
      <circle cx="60" cy="38" r="9" fill="#F6D34B" />
      <circle cx="43" cy="64" r="9" fill="#F6D34B" />
      <circle cx="77" cy="64" r="9" fill="#F6D34B" />
    </svg>
  )
}
