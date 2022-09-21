import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../button";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { selectSignInError, logIn } from "../../../store";
import { unwrapResult } from "@reduxjs/toolkit";
import styled from "styled-components";

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
    dispatch(logIn(data))
      .then(unwrapResult)
      .then(() => {
        router.push("/checkout");
      })
      .catch(() => {
        console.log("catch");
      });
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
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      <Button small={false}>Log in</Button>
    </Form>
  );
}

const Error = styled.small`
  color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  box-sizing: border-box;
  margin-bottom: 24px;
  width: 100%;
  height: 68px;
  border: 1px solid #d7d7d7;
  border-radius: 6px;
  padding: 25px;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
