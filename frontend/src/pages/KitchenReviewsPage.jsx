import ReviewCard from "../Components/ReviewCard";
import { useReviews } from "../hooks/useReviews";

const KitchenReviewsPage = ({ kitchenId }) => {
    console.log("kitchenId in KitchenReviewsPage", kitchenId)
    const { reviewsData, isLoading, isError } = useReviews(kitchenId);
    console.log("reviews in KitchenReviewsPage", reviewsData)
  return (
    <div className="bg-gradient-to-b from-beige/20 to-beige lg:p-12 p-6 ">
        <h1 className="text-2xl font-bold mb-4 text-center text-clip bg-gradient-to-r from-taupeDark to-pumpkinDark bg-clip-text text-transparent">Customer's Voice</h1>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading reviews...</p>
        ) : reviewsData.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
{reviewsData?.reviews?.map((review)=>(
  <ReviewCard key={review.id} review={review} />

))}
          </div>
        )}

    </div>
  )
}

export default KitchenReviewsPage
