import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({ queryKey: ["cabins"], queryFn: getCabins }); //add sort alphabetical and filter
  if (error) throw error;
  return { isLoading, cabins, error };
}

export default useCabins;
