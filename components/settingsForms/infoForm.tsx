import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/useStore";
import { Button, Error, Input } from "../signUpForm";
import axios from "axios";
import { BASE_URL } from "../../pages";

interface InfoData {
  username: string;
  email: string;
}

export default function InfoForm() {
  const { token } = useAppSelector((state) => state.user);
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InfoData>();

  const onInfoSubmit: SubmitHandler<InfoData> = (data) => {
    console.log(data);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .patch(`${BASE_URL}/users/update-password`, data, {
        headers: headers,
      })
      .then((res) => console.log(res));
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
      <ChangedButton>Save</ChangedButton>
    </Form>
  );
}

export const ChangedButton = styled(Button)`
  width: 16%;
`;

export const Subtitle = styled.h3`
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InfoInput = styled(Input)`
  width: 40%;
`;
