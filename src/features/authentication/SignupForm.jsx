import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import toast from "react-hot-toast";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, reset, handleSubmit, formState, getValues } = useForm();
  const { signUp, isPending } = useSignup();
  function onSubmit(data) {
    signUp(data, { onSettled: () => reset() });
    // reset();
    // console.log(data);
  }
  function onError(e) {
    toast.error("Please complete the form accurately");
    console.log(e);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" error={formState?.errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={formState?.errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={formState?.errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Passwords needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={formState?.errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords needs to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
