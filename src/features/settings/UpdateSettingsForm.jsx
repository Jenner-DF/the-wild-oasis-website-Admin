import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isPending: isUpdating, updateSetting } = useUpdateSetting();

  const { register, handleSubmit, formState, reset } = useForm();
  // defaultValues: { minBookingLength: minBookingLength }, //cannot use as it is async, needs useeffect
  const { errors } = formState;
  function onSub(data) {
    console.log(data);
    updateSetting(data, {
      onSuccess: (updatedSettings) => {
        reset(updatedSettings);
      },
    });
  }
  function onErr(err) {
    console.log(err);
    toast.error("There is an error updating your settings");
  }
  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }
  if (isLoading) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSub, onErr)}>
      <FormRow label="Minimum nights/booking" error={errors?.name?.message}>
        <Input
          type="number"
          id="minBookingLength"
          {...register("minBookingLength", {
            required: "This field is required",
          })}
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking" error={errors?.name?.message}>
        <Input
          type="number"
          id="max-nights"
          {...register("maxBookingLength", {
            required: "This field is required",
          })}
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking" error={errors?.name?.message}>
        <Input
          type="number"
          id="max-guests"
          {...register("maxGuestsPerBooking", {
            required: "This field is required",
          })}
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price" error={errors?.name?.message}>
        <Input
          type="number"
          id="BreakfastPrice"
          {...register("breakfastPrice", {
            required: "This field is required",
          })}
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
