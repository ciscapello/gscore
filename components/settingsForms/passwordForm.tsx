import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "./infoForm";
import { ChangedButton, InfoInput, Subtitle } from "./infoForm";
import { Error } from "../signUpForm";
import axios from "axios";
import { BASE_URL } from "../../pages";
import { useAppSelector } from "../../hooks/useStore";
import styled from "styled-components";
import { useState } from "react";

interface FieldValues {
  currentPassword: string;
  newPassword: string;
}

export default function PasswordForm() {
  const { token } = useAppSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .patch(`${BASE_URL}/users/update-password`, data, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
        reset();
      })
      .catch(() => {
        setIsError(true);
        setTimeout(() => setIsError(false), 2000);
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Subtitle>Change Password</Subtitle>
      <InfoInput
        placeholder="Current Password"
        {...register("currentPassword")}
      />
      <InfoInput
        placeholder="New Password"
        {...register("newPassword", { minLength: 8 })}
      />
      {errors.newPassword && (
        <Error>New password should have minimal 8 symbols</Error>
      )}
      {isSuccess && <Success>Your password is successfully updated</Success>}
      {isError && <Error>Something goes wrong</Error>}
      <ChangedButton>Save</ChangedButton>
    </Form>
  );
}

const Success = styled.small`
  color: green;
`;
