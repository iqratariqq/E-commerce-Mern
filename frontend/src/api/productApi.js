import axiosInstance from "../lib/axios"

export const addProduct=async(productData)=>{
    const product=await axiosInstance.post(`/menu`,productData)
    console.log("product in api", product)
    return product
}

export const getProducts=async()=>{
    console.log("fetching products in api")
    const products=await axiosInstance.get(`/menu`)
    return products.data
}

export const deleteProduct=async(productId)=>{
    console.log("deleting product with id in api", productId)
    const response=await axiosInstance.delete(`/menu/${productId}`)
    console.log("delete response", response)
    return response
} 