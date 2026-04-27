import axiosInstance from "../lib/axios"


export const getAnalyticsandDailySalesData=async()=>{
    console.log("fetching analytics and sales data")
    const res=await axiosInstance.get("/analytics/")
    console.log("analytics and sales data",res.data)
    return res.data
}