import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  if (error) throw new Error(error.message);
  const user = data?.user || data; //because relogging adds session object to data
  // const user = data;
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}

export default useUser;
