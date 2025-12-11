import { useQuery } from "@tanstack/react-query";
import { user } from "../lib/Api/authApi";


export const useAuth = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: user,
    
  });
  return({isLoading:authUser.isLoading,user:authUser?.data?.user})
};
