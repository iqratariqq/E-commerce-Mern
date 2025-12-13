import { useQuery } from "@tanstack/react-query";
import { user } from "../api/authApi";
import { authStores } from "../Store/authStores";

const useAuthuser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: user,
    retry: false,
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data };
};

export default useAuthuser;
