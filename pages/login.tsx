import { LogInForm, StatusBar } from "../components";
import { Title, Container } from "../styles";

export default function Login() {
  return (
    <Container>
      <StatusBar count={2} />
      <Title>Log in</Title>
      <LogInForm />
    </Container>
  );
}
