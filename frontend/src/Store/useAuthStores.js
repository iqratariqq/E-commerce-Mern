import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,

  setAuthUser:(user,isAuthenticated)=>{
    set({user:user,isAuthenticated:isAuthenticated})
  }
}));
