import LogInForm from "../components/logInForm";
import StatusBar from "../components/statusBar";
import { Container } from "./createAccount";
import { Title } from "../styles";

export default function Login() {
  return (
    <Container>
      <StatusBar count={2} />
      <Title>Log in</Title>
      <LogInForm />
    </Container>
  );
}
