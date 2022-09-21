import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../infoForm/infoForm";
import { Button } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  selectPasswordError,
  selectPasswordSuccess,
  setPassword,
} from "../../../store";
import styled from "styled-components";

export interface SetPasswordFieldValues {
  currentPassword: string;
  newPassword: string;
}

export default function PasswordForm() {
  const dispatch = useAppDispatch();
  const passwordError = useAppSelector(selectPasswordError);
  const passwordSuccess = useAppSelector(selectPasswordSuccess);

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
      <Input placeholder="Current Password" {...register("currentPassword")} />
      <Input
        placeholder="New Password"
        {...register("newPassword", { minLength: 6 })}
      />
      {errors.newPassword && (
        <Error>New password should have minimal 6 symbols</Error>
      )}
      {passwordSuccess && (
        <Success>Your password is successfully updated</Success>
      )}
      {passwordError && <Error>{passwordError}</Error>}
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

const Subtitle = styled.h3`
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
`;

const Error = styled.small`
  color: red;
`;

const Success = styled.small`
  color: green;
`;
