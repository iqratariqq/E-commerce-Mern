import axiosInstance from "../lib/axios"

export const addtoCart=async(productId)=>{
    const res=await axiosInstance.post(`/cart/${productId}`)
    return res.data;

}

export const getCartItems=async()=>{
    console.log("getCartItems api called")
    const res=await axiosInstance.get("/cart")
    console.log("response from getCartItems api", res.data)
    return res.data;
}