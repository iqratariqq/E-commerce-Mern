import axios from "axios";
import { logout, refreshToken } from "../api/authApi";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api",
  withCredentials: true,
});

let refreshPromise = null;
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
        } else {
          refreshPromise = refreshToken();
          await refreshPromise;
          refreshPromise = null;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
