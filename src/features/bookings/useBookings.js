import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  //FILTER
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
          method: "",
        };
  //SORT
  const sortByRaw = searchParams.get("sort") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  console.log(filter, sortBy, page);
  //GETTING DATA FROM API
  const {
    isLoading,
    data: { data: bookings, count } = {}, //since this is async so it will not error
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], //acts like a dependency array, when one change, it refetches
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  if (error) throw new Error("There is an error retrieving bookings data.");

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], //acts like a dependency array, when one change, it refetches
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], //acts like a dependency array, when one change, it refetches
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, filterValue, count };
}

export default useBookings;
