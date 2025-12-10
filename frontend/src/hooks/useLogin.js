import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login } from "../lib/Api/authApi"

export const useLogin=()=>{
    const queryClient=useQueryClient();
    const loginUser=useMutation(
        {
            mutationKey:["userLogin"],
            mutationFn:login,
            onSuccess:()=>queryClient.invalidateQueries({queryKey:["authUser"]})

        }
       
    )
    return ({isPending:loginUser.isPending,error:loginUser.error,loginMutation:loginUser.mutate})
}