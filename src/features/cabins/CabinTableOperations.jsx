import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "With discount", value: "with-discount" },
          { label: "No discount", value: "no-discount" },
        ]}
        active={true}
      ></Filter>
      <SortBy
        sortField="sort"
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (⬆)" },
          { value: "regularPrice-desc", label: "Sort by Price (⬇)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (⬆)" },
          { value: "maxCapacity-desc", label: "Sort by Capactiy (⬇)" },
        ]}
      ></SortBy>
    </TableOperations>
  );
}

export default CabinTableOperations;
