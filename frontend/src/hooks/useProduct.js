import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productApi";
import toast from "react-hot-toast";

export const useProduct = () => {
  const productData = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
    retry: false,
    onError: (err) => {
      toast.error(err.response?.data?.message || err.message);
    },
  });

  return {
    isLoading: productData.isLoading,
    products: productData.data?.Menus,
  };
};
