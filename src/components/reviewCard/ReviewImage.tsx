export function ReviewImages({ imageUrls = [], max = 3 }: { imageUrls?: string[]; max?: number }) {
  if (!imageUrls.length) return null

  if (imageUrls.length === 3 && max >= 3) {
    return (
      <div className="mt-5 flex w-full gap-1">
        {imageUrls.map((url, idx) => (
          <div
            key={`${url}-${idx}`}
            className={`relative h-28 flex-1 overflow-hidden bg-zinc-100 ${
              idx === 0 ? 'rounded-l-xl' : idx === 2 ? 'rounded-r-xl' : ''
            }`}
          >
            <img src={url} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    )
  }

  const shown = imageUrls.slice(0, max)
  const rest = imageUrls.length - shown.length

  return (
    <div className="mt-5 flex gap-3">
      {shown.map((url, idx) => (
        <div key={`${url}-${idx}`} className="relative h-28 w-28 overflow-hidden rounded-xl">
          <img src={url} alt="" className="h-full w-full object-cover" />

          {idx === shown.length - 1 && rest > 0 ? (
            <div className="absolute inset-0 grid place-items-center bg-black/35">
              <span className="rounded-full bg-white/85 px-3 py-1 text-sm font-semibold text-zinc-900">
                +{rest}
              </span>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
