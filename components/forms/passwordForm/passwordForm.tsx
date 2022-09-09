import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../infoForm/infoForm";
import { ChangedButton, InfoInput, Subtitle } from "../../../styles";
import { Error, Success } from "../../../styles";
import axios from "axios";
import { BASE_URL } from "../../../pages";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import styled from "styled-components";
import { useState } from "react";
import { setPassword } from "../../../store/user/userSlice";

export interface SetPasswordFieldValues {
  currentPassword: string;
  newPassword: string;
}

export default function PasswordForm() {
  const dispatch = useAppDispatch();
  const { passwordError, passwordSuccess } = useAppSelector(
    (state) => state.user
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SetPasswordFieldValues>();

  const onSubmit: SubmitHandler<SetPasswordFieldValues> = (data) => {
    dispatch(setPassword(data));
    reset();
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
        {...register("newPassword", { minLength: 6 })}
      />
      {errors.newPassword && (
        <Error>New password should have minimal 6 symbols</Error>
      )}
      {passwordSuccess && (
        <Success>Your password is successfully updated</Success>
      )}
      {passwordError && <Error>Something goes wrong</Error>}
      <ChangedButton>Save</ChangedButton>
    </Form>
  );
}
