import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/Api/authApi";
import toast from "react-hot-toast";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("logout successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.message);
    },
  });
  return { logoutMutation: mutate };
};
