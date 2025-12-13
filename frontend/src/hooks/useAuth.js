import { useQuery } from "@tanstack/react-query";
import { user } from "../lib/Api/authApi";
import { authStores } from "../Store/authStores";



export const useAuth = () => {
  const {setUser}=authStores();
  const authUser = useQuery({
    queryKey: ["authenticateUser"],
    queryFn: user,
    retry:false,
    
  });
console.log("in useAuth")

  if(authUser?.data)
  {
    setUser(authUser?.data)
  }

  return({isLoading:authUser.isLoading,user:authUser?.data})
};
