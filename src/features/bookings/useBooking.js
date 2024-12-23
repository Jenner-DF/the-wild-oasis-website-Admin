import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
  const { id } = useParams();
  console.log(id);
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false, //by default react query will fetch data 3 times
  }); //add sort alphabetical and filter
  // if (error) throw new Error(`Error:${error}`);
  return { isLoading, booking, error };
}

export default useBooking;
