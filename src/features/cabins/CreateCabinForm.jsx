import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";

function CreateCabinForm({ onCloseModal, cabinToEdit = {} }) {
  const { id: editId, ...editValue } = cabinToEdit;

  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });

  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useUpdateCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    isEditSession
      ? editCabin(
          { newCabinData: { ...data, image }, id: editId },
          {
            onSuccess: (updatedData) => {
              reset(updatedData);
            },
          }
        )
      : createCabin(
          { ...data, image: image },
          {
            onSuccess: () => {
              reset();
            },
          }
        );
    onCloseModal();
  }
  function onError(err) {
    console.log(err);
    toast.error("Error, Please try again");
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          min="0"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast 1" },
          })}
          onInput={(e) => (e.target.value === "" ? (e.target.value = 1) : null)}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          min="0"
          {...register("discount", {
            required: "This field is required",
            validate: (val) =>
              Number(val) < Number(getValues().regularPrice) ||
              "Discount should be less than the regular price",
          })}
          onInput={(e) => (e.target.value === "" ? (e.target.value = 0) : null)}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register(
            "image",
            isEditSession ? {} : { required: "This field is required" }
          )}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
