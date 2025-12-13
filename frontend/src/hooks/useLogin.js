import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login } from "../lib/Api/authApi"
import toast from "react-hot-toast";

export const useLogin=()=>{
    const queryClient=useQueryClient();
    const loginUser=useMutation(
        {
            mutationKey:["userLogin"],
            mutationFn:login,
            onSuccess:()=>{queryClient.invalidateQueries({queryKey:["authenticateUser"]})
        toast.success("Login successfully")},
            onError:(err)=>{
      toast.error(err.response?.data?.message || err.message);
    }

        }
       
    )
    return ({isPending:loginUser.isPending,error:loginUser.error,loginMutation:loginUser.mutate})
}