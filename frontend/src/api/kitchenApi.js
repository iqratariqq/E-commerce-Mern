import axiosInstance from "../lib/axios";

export const registerKitchen=async(kitchenData)=>{

    const res=await axiosInstance.post('/kitchen/register-kitchen',kitchenData);
    return res.data;
}
