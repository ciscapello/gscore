import styled from "styled-components";
import { LogInForm, StatusBar } from "../components";

export default function Login() {
  return (
    <Container>
      <StatusBar count={2} />
      <Title>Log in</Title>
      <LogInForm />
    </Container>
  );
}

const Container = styled.div`
  width: 45%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.h3`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 24px;
  line-height: 26px;
  color: white;
`;
