import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCartItem } from "../api/cartApi"


export const useUpdateCartItem = () => {
    const queryClient = useQueryClient()
    const { mutate: updateCartItemMutation, isPending } = useMutation({
        mutationFn: updateCartItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCartItems"] })
        },
        onError: (err) => {
            console.log("error in updateCartItem mutation", err.message)
        }
    })
    return { updateCartItemMutation, isPending }

}