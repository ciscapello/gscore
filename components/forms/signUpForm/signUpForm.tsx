import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/useStore";
import { useRouter } from "next/router";
import { Form, Error, Input, Button } from "../../../styles";
import { signUp } from "../../../store";

export interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
}

export default function SingUpForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    reset();
    dispatch(signUp(data));
    router.push("/login");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {errors.username ? <Error>This field is required</Error> : null}
        <Input
          placeholder="Username"
          type="text"
          {...register("username", {
            required: true,
          })}
        />
        {errors.email ? <Error>Please enter existing email</Error> : null}
        <Input
          placeholder="Email"
          type="text"
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
        />
        {errors.password ? (
          <Error>Minimum password length is 6 symbols</Error>
        ) : null}
        <Input
          placeholder="Password"
          type="password"
          {...register("password", { minLength: 6 })}
        />
        <Button>Send password</Button>
      </Form>
    </>
  );
}
