import axiosInstance from "../axios";

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
    const res = await axiosInstance.get(`/auth/profile`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post(`/auth/logout`);
  } catch (error) {
    throw error;
  }
};
