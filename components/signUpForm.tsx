import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

export default function SingUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  console.log("errors", errors);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    reset();
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

export const Form = styled.form`
  margin-top: 40px;
`;

export const Error = styled.small`
  color: red;
`;

export const Input = styled.input`
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
`;

export const Button = styled.button`
  margin-top: 50px;
  margin-bottom: 50px;
  width: 30%;
  height: 68px;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  border-radius: 4px;
  border: 0;
  color: white;
  background: #fc5842;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;
