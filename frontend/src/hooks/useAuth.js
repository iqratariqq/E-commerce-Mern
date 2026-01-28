import { useQuery } from "@tanstack/react-query";
import { user } from "../api/authApi";


const useAuthuser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: user,
    retry: false,
  });
  return { isLoading: authUser.isLoading, authUser: authUser.data ,error:authUser.error};
};

export default useAuthuser;
