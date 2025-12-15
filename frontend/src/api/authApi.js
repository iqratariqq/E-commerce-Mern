import axiosInstance from "../lib/axios";
import { refreshAxios } from "../lib/refreshAxios";

export const signUp = async (userData) => {
  try {
    console.log("in signup  ");
    const res = await axiosInstance.post(
      `/auth/signup/${"customer"}`,
      userData
    );
    console.log(res.data, "data");
    return res.data;
  } catch (error) {
    console.log("in signup  ");
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const res = await axiosInstance.post(`/auth/login`, userData);
    return res.data;
  } catch (error) {
    console.log("error in signup", error.message);
    throw error;
  }
};

export const user = async () => {
  try {
    console.log("in user api");
    const res = await axiosInstance.get(`/auth/profile`);
    return res.data;
  } catch (error) {
    console.log("error in user api", error);
    return null;
  }
};

export const logout = async () => {
  try {
    console.log("in logout api");
    await axiosInstance.post(`/auth/logout`);
  } catch (error) {
    console.log("error in logout api", error);
  }
};

export const refreshToken = async () => {
  try {
    console.log("in refresh token api");  
    await refreshAxios.post("/auth/refresh-token");
  } catch (error) {
    console.log("error in refresh token api", error);
  }
};
