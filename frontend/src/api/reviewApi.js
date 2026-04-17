import axiosInstance from "../lib/axios"

export const getReviews=async(kitchenId)=>{
    console.log("fetching reviews for kitchen id in api", kitchenId);
    const res=await axiosInstance.get(`/reviews/${kitchenId}`)
    return res.data

}