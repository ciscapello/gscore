import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Button } from "../../../components";
import {
  selectUserInfoError,
  selectUserInfoSuccess,
  updateUserInfo,
} from "../../../store";
import { Color } from "../../../styles";
import { EMAIL_VALID_REGEX } from "../../../utils";

interface InfoData {
  username: string;
  email: string;
}

export default function InfoForm() {
  const userInfoError = useAppSelector(selectUserInfoError);
  const userInfoSuccess = useAppSelector(selectUserInfoSuccess);
  const dispatch = useAppDispatch();

  const {
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
      <Input
        placeholder="Username"
        {...register("username", { required: true })}
      />
      {errors.email ? <Error>Please enter existing email</Error> : null}
      <Input
        placeholder="Email"
        {...register("email", {
          pattern: EMAIL_VALID_REGEX,
        })}
      />
      {userInfoSuccess && <Success>Data is successfully update</Success>}
      {userInfoError && <Error>{userInfoError}</Error>}
      <Button small>Save</Button>
    </Form>
  );
}

const Input = styled.input`
  box-sizing: border-box;
  margin-bottom: 24px;
  width: 40%;
  height: 68px;
  border: 1px solid #d7d7d7;
  border-radius: 6px;
  padding: 25px;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  @media (max-width: 768px) {
    width: auto;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Error = styled.small`
  color: ${Color.RED};
`;

const Success = styled.small`
  color: ${Color.GREEN};
`;

const Subtitle = styled.h3`
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
`;
