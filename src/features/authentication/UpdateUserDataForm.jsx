import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUser from "./useUser";
import useUpdateUser from "./useUpdateUser";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  // const [avatar, setAvatar] = useState(null);
  const { isPending, updateUser } = useUpdateUser();
  const { register, reset, formState, handleSubmit } = useForm({
    defaultValues: { fullName: currentFullName, avatar: null },
  });
  function onSubmit({ fullName, avatar }) {
    if (!fullName) return;
    console.log();
    updateUser({ fullName: fullName, avatar: avatar["0"] });
    // console.log(data.avatar["0"]);
    // updateUser({ ...data, avatar: data.avatar["0"] });
  }
  function onError(e) {
    toast.error(e);
  }
  function handleCancel() {
    setFullName(currentFullName);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          defaultValue={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          {...register("fullName")}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          // onChange={(e) => setAvatar(e.target.files[0])}
          {...register("avatar")}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Update account"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
