import { MessageCircle, NotebookPenIcon } from "lucide-react";
import EmptyComponent from "../Components/EmptyComponent";
import ReviewCard from "../Components/ReviewCard";
import { useReviews } from "../hooks/useReviews";
import { motion } from "framer-motion";

const KitchenReviewsPage = ({ kitchenId }) => {
  console.log("kitchenId in KitchenReviewsPage", kitchenId)
  const { reviewsData, isLoading, isError } = useReviews(kitchenId);
  console.log("reviews data length", reviewsData?.reviews?.length)
  console.log("reviews in KitchenReviewsPage", reviewsData)
  return (
    <div className="bg-gradient-to-b from-taupeDeep/35 to-taupeDeep/40 lg:p-12 p-6  ">
      <motion.h1 className="text-2xl font-serif lg:text-3xl font-bold mb-4 text-center text-clip bg-gradient-to-r from-taupeDeep to-taupeDark bg-clip-text text-transparent"
      initial={{opacity:0,y:-20}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.7
      }}
      >
        Customer's Voice
      </motion.h1 >


      {isLoading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : reviewsData?.reviews?.length === 0 ? (
        <EmptyComponent icon={MessageCircle } text="No Reviews found" color="text-taupeDark" />
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
