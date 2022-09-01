import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../pages";
import { useAppDispatch } from "../hooks/useStore";
import router from "next/router";
import { Form, Error, Input, Button } from "../styles";

interface FormValues {
  email: string;
  username: string;
  password: string;
}

export default function SingUpForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    reset();
    axios.post(`${BASE_URL}/users/sign-up`, data).then((res) => {
      console.log(res);
      router.push("/login");
    });
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
          <Error>Minimum password length is 8 symbols</Error>
        ) : null}
        <Input
          placeholder="Password"
          type="password"
          {...register("password", { minLength: 8 })}
        />
        <Button>Send password</Button>
      </Form>
    </>
  );
}
