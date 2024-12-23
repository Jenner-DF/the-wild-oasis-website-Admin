import { useSearchParams } from "react-router-dom";

function useSortCabin(cabins) {
  const [searchParams] = useSearchParams();
  //sort
  const sortValue = searchParams.get("sort") || "created_at-asc";
  // Define the sort functions for each sorting option
  const sortFunctions = {
    "name-asc": (a, b) => a.name.localeCompare(b.name),
    "name-desc": (a, b) => b.name.localeCompare(a.name),
    "regularPrice-asc": (a, b) => a.regularPrice - b.regularPrice,
    "regularPrice-desc": (a, b) => b.regularPrice - a.regularPrice,
    "maxCapacity-asc": (a, b) => a.maxCapacity - b.maxCapacity,
    "maxCapacity-desc": (a, b) => b.maxCapacity - a.maxCapacity,
    "created_at-asc": (a, b) => new Date(a.created_at) - new Date(b.created_at),
    "created_at-desc": (a, b) =>
      new Date(b.created_at) - new Date(a.created_at),
  };
  const sortedCabins = cabins?.sort(sortFunctions[sortValue]);
  return sortedCabins;
}

export default useSortCabin;
