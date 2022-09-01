import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import {
  Button,
  ChangedButton,
  Error,
  InfoInput,
  Input,
  Subtitle,
  Success,
} from "../../styles";
import axios from "axios";
import { BASE_URL } from "../../pages";
import { updateUserData } from "../../store/user/userSlice";
import { useState } from "react";

interface InfoData {
  username: string;
  email: string;
}

export default function InfoForm() {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InfoData>();

  const onInfoSubmit: SubmitHandler<InfoData> = (data) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .patch(`${BASE_URL}/users`, data, {
        headers: headers,
      })
      .then((res) => {
        const { email, username } = res.data;
        dispatch(updateUserData({ email, username }));
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
      })
      .catch(() => {
        setIsError(true);
        setTimeout(() => setIsError(false), 2000);
      });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onInfoSubmit)}>
      <Subtitle>Personal Info</Subtitle>
      {errors.username ? <Error>This field is required</Error> : null}
      <InfoInput
        placeholder="Username"
        {...register("username", { required: true })}
      />
      {errors.email ? <Error>Please enter existing email</Error> : null}
      <InfoInput
        placeholder="Email"
        {...register("email", {
          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        })}
      />
      {isSuccess && <Success>Data is successfully update</Success>}
      {isError && <Error>Something goes wrong</Error>}
      <ChangedButton>Save</ChangedButton>
    </Form>
  );
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
