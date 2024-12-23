import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBookingId, isPending: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Successfully deleted the Booking ");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteBookingId, isDeleting };
}

export default useDeleteBooking;
