import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import useBooking from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import useCheckin from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isSettingsLoading } = useSettings();
  console.log(booking);
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);
  useEffect(() => setAddBreakfast(booking?.hasBreakfast ?? false), [booking]);
  const moveBack = useMoveBack();
  if (isLoading || isSettingsLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else checkin({ bookingId, breakfast: {} }); //cause we spread
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        {!hasBreakfast && (
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((c) => !c);
              setConfirmPaid(false);
            }}
            id="breakfast"
            disabled={hasBreakfast}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        )}
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((c) => !c)}
          id="confirm"
          disabled={confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount{" "}
          {hasBreakfast
            ? formatCurrency(totalPrice)
            : addBreakfast
            ? formatCurrency(totalPrice + optionalBreakfastPrice)
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
