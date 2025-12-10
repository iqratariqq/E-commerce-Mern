import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../lib/Api/authApi";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const signupUser = useMutation({
    mutationKey: ["userSignup"],
    mutationFn: signUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return {
    isPending: signupUser.isPending,
    error: signupUser.error,
    signupMutation: signupUser.mutate,
  };
};
