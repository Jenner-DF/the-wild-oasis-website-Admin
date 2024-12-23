import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const {
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoadingCabins } = useCabins();
  // console.log(stays);
  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;
  // console.log(bookings);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
        numDays={numDays}
      />
      <>
        <Today />
        <DurationChart confirmedStays={confirmedStays} />
      </>
      <SalesChart bookings={bookings} numDays={numDays} />
      {/* <div>Statistics2</div>
      <div>Statistics2</div> */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
