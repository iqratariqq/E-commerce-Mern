import { useQuery } from "@tanstack/react-query"
import { getReviews } from "../api/reviewApi"
import toast from "react-hot-toast"

export const useReviews=(kitchenId )=>{
    console.log("kitchenId in useReviews hook", kitchenId)
    const reviewsData=useQuery(
        {
            queryKey:["getReviews"],
            queryFn:()=>getReviews(kitchenId),
            onError:(err)=>{
            toast.error(err.response?.data?.message || err.message),
            console.log("error in getReviews api", err)
            }
        }
    )
    return {
        reviews:reviewsData.data,
        isLoading:reviewsData.isLoading,
        error:reviewsData.error
    }
}