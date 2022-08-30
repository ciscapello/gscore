import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Error, Form, Input } from "./signUpForm";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "../pages";
import { useAppDispatch } from "../hooks/useStore";
import { signIn } from "../store/user/userSlice";

interface FormValues {
  email: string;
  password: string;
}

export default function LogInForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    axios.post(`${BASE_URL}/users/sign-in`, data).then((res) => {
      console.log(res);
      const {
        token,
        user: { username, email },
      } = res.data;
      dispatch(signIn({ email, username, token }));
      router.push("/checkout");
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {errors.email ? <Error>Email is required</Error> : null}
      <Input
        type="text"
        placeholder="Email"
        {...register("email", { required: true })}
      />
      {errors.password ? <Error>Password is required</Error> : null}
      <Input
        type="text"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      <Button>Log in</Button>
    </Form>
  );
}
