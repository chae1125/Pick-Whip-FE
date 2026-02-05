export default function BlueberryTopper({ size = 22 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: '#3E4CB8',
        boxShadow: '0px 2px 2px rgba(0,0,0,0.18)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 4,
          top: 4,
          width: 6,
          height: 6,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.65)',
        }}
      />
    </div>
  )
}
