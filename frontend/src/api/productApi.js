import axios from "axios"

export const addProduct=async(productData)=>{
    const product=await axios.post(`/api/menu/`,productData)
    return product
}

export const getProducts=async()=>{
    const products=await axios.get(`/api/menu/`)
    return products
}