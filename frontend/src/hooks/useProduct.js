import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api/productApi";
import toast from "react-hot-toast";

export const useProduct = () => {
  const productMutation = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.message);
    },
  });
  return{
    isPending: productMutation.isPending,
    error: productMutation.error,   
    createProductMutation: productMutation.mutate,
    
  }
};
