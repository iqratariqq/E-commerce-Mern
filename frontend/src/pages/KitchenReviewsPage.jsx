import { useReviews } from "../hooks/useReviews";

const KitchenReviewsPage = ({ kitchenId }) => {
    console.log("kitchenId in KitchenReviewsPage", kitchenId)
    const { reviews, isLoading, isError } = useReviews(kitchenId);
    console.log("reviews in KitchenReviewsPage", reviews)
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Reviews</h1>
        {isLoading && <p>Loading reviews...</p>}
        {isError && <p>Error loading reviews.</p>}
    </div>
  )
}

export default KitchenReviewsPage
