type OreoTripletProps = {
  barW?: number
  barH?: number
  gap?: number
}

export default function OreoTriplet({ barW = 20, barH = 86, gap = 10 }: OreoTripletProps) {
  const radius = 9999

  return (
    <div className="relative" style={{ width: barW * 3 + gap * 2, height: barH }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          width: barW,
          height: barH,
          borderRadius: radius,
          background: '#4A4A4A',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: barW + gap,
          width: barW,
          height: barH,
          borderRadius: radius,
          background: '#fff',
          border: '1px solid #CFCFCF',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: (barW + gap) * 2,
          width: barW,
          height: barH,
          borderRadius: radius,
          background: '#4A4A4A',
        }}
      />
    </div>
  )
}
