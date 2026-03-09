import { useQuery } from "@tanstack/react-query"
import { getCartItems } from "../api/cartApi"

export const useCart = () => {
    const { data, isLoading, isError } = useQuery(
      {
        queryKey:["getCartItems"],
          queryFn:getCartItems()
    
      }
    )
    console.log("cart items in useCart hook", data?.userProducts)
    return { cart: data, isLoading, isError }
}