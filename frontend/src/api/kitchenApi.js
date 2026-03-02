import axiosInstance from "../lib/axios";

export const registerKitchen=async(kitchenData)=>{

    const res=await axiosInstance.post('/kitchen/register-kitchen',kitchenData);
    return res.data;
}

export const getAllKitchens=async()=>{
    const res=await axiosInstance.get('/kitchen/')
    return res.data;
    
}