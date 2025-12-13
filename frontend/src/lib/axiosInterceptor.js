import { logout } from "../api/authApi";
import { refreshToken } from "../api/authApi";
import axiosInstance from "./axios"

let refreshPromise=null
axiosInstance.interceptors.response.use(
    (response)=>response,

    async(error)=>{
        const originalRequest=error.config;
        if(error.response?.status===401 && !originalRequest._retry)
        {
              originalRequest._retry = true;
            try {
                if(refreshPromise)
                {
                    await refreshPromise;
                    return axiosInstance(originalRequest)

                }
                refreshPromise=refreshToken()
                await refreshPromise
                refreshPromise=null
                return axiosInstance(originalRequest)

                
            } catch (refreshError) {
               logout();
                return Promise.reject(refreshError)

            }

        }
            return Promise.reject(error)

    }

)