import { ReviewCard } from '../components/reviewCard/ReviewCard'
import { mockReviews } from '../types/review.mock'

export default function ShopDetailPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-245 space-y-6">
        {mockReviews.map((review) => (
          <ReviewCard key={review.id} data={review} />
        ))}
      </div>
    </main>
  )
}
