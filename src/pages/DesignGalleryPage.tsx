import { useOutletContext } from 'react-router-dom'
import type { StoreInfoCard } from '@/components/store-detail/StoreCard'
import DesignGallery from '@/components/store-detail/designGallery/DesignGallery'
import CustomizeCtaBar from '@/components/store-detail/designGallery/CustomizeCtaBar'

type OutletCtx = { store: StoreInfoCard }

export default function DesignGalleryPage() {
  const { store } = useOutletContext<OutletCtx>()

  return (
    <>
      <DesignGallery shopName={store.shopName} />
      <CustomizeCtaBar onClick={() => {}} />
    </>
  )
}
