import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import useFilterCabin from "./useFilterCabin";
import useSortCabin from "./useSortCabin";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
  // const [showForm, setShowForm] = useState(null); //sets form to display one at a time only
  const { isLoading, cabins } = useCabins(); //no error
  const filteredCabins = useFilterCabin(cabins);
  const sortedCabins = useSortCabin(filteredCabins || null);
  // filteredCabins?.sort(sortFunctions[sortValue] || sortFunctions["name"]);
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName={"Cabins"} />;
  return (
    <Menus>
      <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>
            <Checkbox />
          </div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
