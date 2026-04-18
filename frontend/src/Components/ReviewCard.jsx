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
        <div className="mx-auto max-w-4xl  lg:p-4 p-2 shadow-md">
            <div className="grid grid-cols-2">
                <div className="flex items-center flex-col justify-center  ">
                    <div className="flex ">{stars}</div>
                    <div> {review.comment}</div>

                </div>
                <div className="flex flex-col items-center">
                    <div>{review.userId.userName}</div>
                    <div>{formattedDate}</div>


                </div>

            </div>

        </div>
    )
}

export default ReviewCard
