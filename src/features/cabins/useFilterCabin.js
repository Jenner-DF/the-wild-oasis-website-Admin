import { useSearchParams } from "react-router-dom";

function useFilterCabin(cabins) {
  const [searchParams] = useSearchParams();
  //filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  switch (filterValue) {
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => Number(cabin.discount) > 0);
      break;
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => Number(cabin.discount) === 0);
      break;
    default:
      filteredCabins = cabins;
  }
  return filteredCabins;
}

export default useFilterCabin;
