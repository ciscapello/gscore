import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import {
  Button,
  ChangedButton,
  Error,
  InfoInput,
  Input,
  Subtitle,
  Success,
} from "../../../styles";
import { updateUserInfo } from "../../../store/user/userSlice";

interface InfoData {
  username: string;
  email: string;
}

export default function InfoForm() {
  const { userInfoError, userInfoSuccess } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InfoData>();

  const onInfoSubmit: SubmitHandler<InfoData> = (data) => {
    dispatch(updateUserInfo(data));
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
      {userInfoSuccess && <Success>Data is successfully update</Success>}
      {userInfoError && <Error>Something goes wrong</Error>}
      <ChangedButton>Save</ChangedButton>
    </Form>
  );
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
