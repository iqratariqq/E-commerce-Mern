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

export const removeAllItem=async(productId)=>{
    console.log("removeAllItem api called with productId:", productId)
    const res=await axiosInstance.patch("/cart", {productId})
    return res.data;
}

export const updateCartItem=async({productId, quantity})=>{
    console.log("updateCartItem api called with productId:", productId, " and quantity:", quantity)
    const res=await axiosInstance.put(`/cart/${productId}`, { quantity })
    return res.data;
}