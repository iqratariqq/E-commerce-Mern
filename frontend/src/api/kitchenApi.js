import axiosInstance from "../lib/axios";

export const registerKitchen=async(kitchenData)=>{

    const res=await axiosInstance.post('/kitchen/register-kitchen',kitchenData);
    return res.data;
}

export const getAllKitchens=async()=>{
    const res=await axiosInstance.get('/kitchen/')
    return res.data;   
}

export const getKitchenById=async(kitchenId)=>{
    console.log("fetching kitchen by id in api", kitchenId);
    const res=await axiosInstance.get(`/kitchen/${kitchenId}`);
    console.log("kitchen data fetched by id in api", res.data);
    return res.data;
}