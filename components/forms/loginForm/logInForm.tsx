import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Error, Form, Input } from "../../../styles";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { selectSignInError, logIn } from "../../../store";

export interface LogInFormValues {
  email: string;
  password: string;
}

export default function LogInForm() {
  const dispatch = useAppDispatch();
  const signInError = useAppSelector(selectSignInError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormValues>();

  const router = useRouter();

  const onSubmit: SubmitHandler<LogInFormValues> = (data) => {
    dispatch(logIn(data));
    router.push("/checkout");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {errors.email ? <Error>Email is required</Error> : null}
      {signInError && <Error>Invalid email or password</Error>}
      <Input
        type="text"
        placeholder="Email"
        {...register("email", { required: true })}
      />
      {errors.password ? <Error>Password is required</Error> : null}
      <Input
        type="text"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      <Button>Log in</Button>
    </Form>
  );
}
