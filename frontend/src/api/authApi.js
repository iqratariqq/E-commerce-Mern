import axiosInstance from "../lib/axios";
import { refreshAxios } from "../lib/refreshAxios";

export const signUp = async ({userData,role}) => {
  try {
    console.log("role in api",role)
    console.log("userData in api",userData)
    const res = await axiosInstance.post(
      `/auth/signup/${role}`,
      userData
    );
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
    const res = await axiosInstance.get(`/auth/profile`);
    return res.data;
  } catch (error) {
    console.log("error in user api", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await refreshAxios.post(`/auth/logout`);
  } catch (error) {
    console.log("error in logout api", error);
    return null;
  }
};

export const refreshToken = async () => {
  console.log("in refresh token api");
  const res = await refreshAxios.post("/auth/refresh-token");
  return res.data;
};
