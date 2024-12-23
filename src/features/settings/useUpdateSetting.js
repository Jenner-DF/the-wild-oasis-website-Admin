import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

function useUpdateSetting() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: updateSetting,
    error,
  } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Updated settings");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isPending, updateSetting, error };
}

export default useUpdateSetting;
