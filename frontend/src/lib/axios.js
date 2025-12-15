import axios from "axios"
import { logout, refreshToken } from "../api/authApi";

const axiosInstance=axios.create(
    {
        baseURL:import.meta.env.MODE==="development"?"http://localhost:5000/api":"/api",
        withCredentials:true
    }
)

let refreshPromise=null
axiosInstance.interceptors.response.use(
    (response)=>response,

    async(error)=>{
        const originalRequest=error.config;
        console.log("originalrequest  interceptor",originalRequest)
        if(error.response?.status===401 && !originalRequest._retry)
        {
              originalRequest._retry = true;
              console.log("in if block before try after originalrequest")
            try {
                if(refreshPromise)
                {
                    console.log("refreshPromise in if",refreshPromise)
                    await refreshPromise;
                    return axiosInstance(originalRequest)
                }

                refreshPromise=refreshToken()
                console.log("refreshPromise in try",refreshPromise)
                await refreshPromise
                refreshPromise=null
                return axiosInstance(originalRequest)

                
            } catch (refreshError) {
                console.log("refreshError",refreshError)
                refreshPromise=null
               logout();
                return Promise.reject(refreshError)

            }

            
        }
        console.log("in error state",error)

            return Promise.reject(error)


    }

)

export default axiosInstance;