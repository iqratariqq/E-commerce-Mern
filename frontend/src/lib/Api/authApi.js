import axiosInstance from "../axios";

export const signUp = async (userData) => {
  try {
    const res = await axiosInstance.post(`/auth/signup/${customer}`, userData);
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

export const login = async (userData) => {
  try {
    const res = await axiosInstance.post(`/auth/login`, userData);
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

export const user = async () => {
  try {
    const res = await axiosInstance.get(`/auth/profile`);
    return res.data;
  } catch (error) {
    throw new Error();
  }
};
