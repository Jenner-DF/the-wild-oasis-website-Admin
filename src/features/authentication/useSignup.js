import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Account has been created`);
    },
    onError: (e) => {
      console.log(e);
      toast.error(`${e.message}`);
    },
  });
  return { signUp, isPending };
}

export default useSignup;
