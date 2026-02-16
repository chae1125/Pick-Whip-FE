import { useParams, useNavigate } from 'react-router-dom'
import ShopDetailPage from './ShopDetailPage'

export default function ShopDetailRoute() {
  const params = useParams()
  const navigate = useNavigate()
  const id = Number(params.shopId)

  if (!id || Number.isNaN(id)) {
    navigate(-1)
    return null
  }

  return <ShopDetailPage shopId={id} onBack={() => navigate(-1)} />
}
