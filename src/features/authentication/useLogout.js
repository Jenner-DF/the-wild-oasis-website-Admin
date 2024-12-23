import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: (e) => {
      toast.error(e);
    },
  });
  return { logout, isPending };
}

export default useLogout;
