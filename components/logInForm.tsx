import Link from "next/link";
import { Button, Form, Input } from "./signUpForm";

export default function LogInForm() {
  return (
    <Form>
      <Input type="text" placeholder="Email" />
      <Input type="text" placeholder="Password" />
      <Link href="/checkout">
        <Button>Log in</Button>
      </Link>
    </Form>
  );
}
