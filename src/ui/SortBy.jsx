import { useSearchParams } from "react-router-dom";
import CabinRow from "../features/cabins/CabinRow";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort");
  function handleChange(e) {
    const newParams = new URLSearchParams(searchParams); // Create a copy of the current search params
    newParams.set("sort", e.target.value); // Update the 'sort' parameter
    newParams.set("page", 1); // Optionally, you can also set the 'page' parameter to 1
    setSearchParams(newParams); // Update the search params with the modified copy
    // searchParams.set("sort", e.target.value);
    // setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={currentSort}
    />
  );
}

export default SortBy;
