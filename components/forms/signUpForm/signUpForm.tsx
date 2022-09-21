import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks";
// import { Form, Error, Input, Button } from "../../../styles";
import { Button } from "../../button";
import { selectSignUpError, setSignUpError, signUp } from "../../../store";
import router from "next/router";
import { unwrapResult } from "@reduxjs/toolkit";
import styled from "styled-components";
import { Color } from "../../../styles";

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
        <Button small={false}>Send password</Button>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Error = styled.small`
  color: ${Color.RED};
`;

const Input = styled.input`
  box-sizing: border-box;
  margin-bottom: 24px;
  width: 100%;
  height: 68px;
  border: 1px solid ${Color.LIGHTGRAY};
  border-radius: 6px;
  padding: 25px;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
