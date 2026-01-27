import axios from "axios"

export const addProduct=async(productData,kitchenId)=>{
    const product=await axios.post(`/api/menu/${kitchenId}`,productData)
    return product
}