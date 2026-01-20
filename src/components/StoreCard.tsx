import example from '../assets/img/store.png'
import { Star, MapPin } from 'lucide-react'

interface StoreCardProps {
  image: string
  tags: string[]
  name: string
  star: number
  distance: number
  minprice: number
  maxprice: number
}

export default function StoreCard({
  tags,
  name,
  star,
  distance,
  minprice,
  maxprice,
}: StoreCardProps) {
  return (
    <div className="flex px-3 pt-3 flex-col rounded-[10px] bg-[#FFFFFF] w-full h-62 items-center shadow-lg gap-3">
      <img src={example} alt="" className="items-center object-cover w-full h-25 rounded-[10px]" />
      <div className="flex flex-col w-full mt-2">
        <div className="flex flex-row gap-1 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-[12px] text-black bg-[#F5E0DA] rounded-[10px] px-3 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[14px] text-[#364153] font-semibold">{name}</span>
          <div className="text-[14px] text-[#4A5565] flex flex-row items-center">
            <Star size={20} className="fill-[#FDC700] stroke-none" />
            {star.toFixed(1)}
            <MapPin size={16} className="ml-4 mr-1 fill-[#A0AEC0]" />
            {distance}km
          </div>
          <span className="text-[12px] text-[#666666]">
            ₩{minprice.toLocaleString()}-₩{maxprice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
