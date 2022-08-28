import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Error, Form, Input } from "./signUpForm";
import { useRouter } from "next/router";

interface FormValues {
  email: string;
  password: string;
}

export default function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    router.push("/checkout");
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
