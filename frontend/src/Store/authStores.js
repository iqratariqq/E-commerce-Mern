import { create } from "zustand";

export const authStores = create((set) => ({
  user: null,
  
  setUser: (authUser) => {
    set({ user: authUser });

  },
}));
