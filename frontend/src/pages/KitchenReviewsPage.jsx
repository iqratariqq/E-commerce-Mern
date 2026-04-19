import ReviewCard from "../Components/ReviewCard";
import { useReviews } from "../hooks/useReviews";
import { motion } from "framer-motion";

const KitchenReviewsPage = ({ kitchenId }) => {
  console.log("kitchenId in KitchenReviewsPage", kitchenId)
  const { reviewsData, isLoading, isError } = useReviews(kitchenId);
  console.log("reviews in KitchenReviewsPage", reviewsData)
  return (
    <div className="bg-gradient-to-b from-beige/20 to-beige/40 lg:p-12 p-6  ">
      <motion.h1 className="text-2xl font-serif lg:text-3xl font-bold mb-4 text-center text-clip bg-gradient-to-b from-taupeDark to-pumpkinDark bg-clip-text text-transparent"
      initial={{opacity:0,y:-20}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.7
      }}
      >
        Customer's Voice
      </motion.h1 >


      {isLoading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : reviewsData.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviewsData?.reviews?.map((review) => (
            <ReviewCard key={review.id} review={review} />

          ))}
        </div>
      )}

    </div>
  )
}

export default KitchenReviewsPage
