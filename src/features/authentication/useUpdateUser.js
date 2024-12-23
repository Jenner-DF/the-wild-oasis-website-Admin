import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return { updateUser, isPending };
}

export default useUpdateUser;
