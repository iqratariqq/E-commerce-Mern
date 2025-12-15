import { useQuery } from "@tanstack/react-query";
import { user } from "../api/authApi";
import { authStores } from "../Store/authStores";

const useAuthuser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: user,
    retry: false,
  });
console.log("in useauth")
  return { isLoading: authUser.isLoading, authUser: authUser.data ,error:authUser.error};
};

export default useAuthuser;
