import { Star } from "lucide-react";




const ReviewCard = ({ review }) => {

    const date = new Date(review.createdAt);
    const formattedDate = date.toISOString().split("T")[0];

    const stars = [];

    for (let i = 0; i < 5; i++) {
        stars.push(
            <Star
                className={`size-5 ${i < review.rating ? "fill-pumpkinDark text-pumpkinDark" : "text-pumpkinDark"}`}
            />
        )
    }

    return (
        <div className="mx-auto max-w-4xl  lg:p-4 p-2 shadow-md my-2">
            <div className="flex justify-between items-center mb-2">
                <div className="flex  flex-col justify-center  ">
                    <div className="flex items-start ">{stars}</div>
                    <div>
                        <p className="text-taupeDeep font-normal md:text-lg font-serif">
                            {review.comment}
                        </p>


                    </div>

                </div>
                <div className="   md:flex flex-col items-center justify-center">
                    <div >
                        <h3 className="text-offWhite font-medium md:text-lg font-serif">
                            {review.userId.userName}
                        </h3>


                    </div>
                    <div>
                        <p className="text-gray-200 sm:text-sm ">
                          {formattedDate}  
                        </p>
                        </div>


                </div>

            </div>

        </div>
    )
}

export default ReviewCard
