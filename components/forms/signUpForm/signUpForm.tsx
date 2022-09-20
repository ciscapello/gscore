import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Form, Error, Input, Button } from "../../../styles";
import { selectSignUpError, setSignUpError, signUp } from "../../../store";
import router from "next/router";
import { unwrapResult } from "@reduxjs/toolkit";

export interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
}

export default function SingUpForm() {
  const dispatch = useAppDispatch();
  const signUpError = useAppSelector(selectSignUpError);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    console.log(signUpError);
    dispatch(signUp(data))
      .then(unwrapResult)
      .then(() => {
        reset();
        router.push("/login");
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(setSignUpError(""));
        }, 3000);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {signUpError && <Error>{signUpError}</Error>}
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
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
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
