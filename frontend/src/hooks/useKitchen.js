import { useQuery } from "@tanstack/react-query"
import { getKitchenById } from "../api/kitchenApi"

export const useKitchen=(kitchenId)=>{
    const {data, isLoading, isError}=useQuery(
        {
            queryKey:["getKitchenById"],
            queryFn:()=>getKitchenById(kitchenId)
        }
    )
  return {kitchenData:data, isLoading, isError}
}