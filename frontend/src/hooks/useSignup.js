import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../api/authApi";
import toast from "react-hot-toast";

export const useSignup = () => {
  const queryClient = useQueryClient();
  const signupUser = useMutation({
    mutationKey: ["userSignup"],
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("signup successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.message);
    },
  });

  return {
    isPending: signupUser.isPending,
    error: signupUser.error,
    signupMutation: signupUser.mutate,
  };
};
