import { useQuery } from "@tanstack/react-query";

import { getisKitchenRegistered } from "../api/kitchenApi";
import toast from "react-hot-toast";

export const useRegisteredKitchen = () => {
    const { data, isLoading, isError } = useQuery(
        {
            queryKey: ["isKitchenRegistered"],
            queryFn: getisKitchenRegistered,
            isError:(error)=>{
                toast.error("Error checking kitchen registration status. Please try again later.");
                console.log("error in useRegisteredKitchen", error.message);
                return true; // Mark as error to trigger error state
            },
            retry: false, // Disable automatic retries
        }
    )
    return { data, isLoading, isError };
}