import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addtoCart } from "../api/cartApi";
import { toast } from "react-hot-toast";

export const useAddtoCart = () => {
  const queryClient = useQueryClient();
  const { mutate,isPending, isError } = useMutation({
    mutationFn: addtoCart,
    mutationKey: ["addtoCart"],
    onSuccess: () => {
      toast.success("Item added to cart");
      queryClient.invalidateQueries({ queryKey: ["getCartItems"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to add item to cart",
      );
    },
  });
  return { addtoCartMutation: mutate, isPending, isError };
};
