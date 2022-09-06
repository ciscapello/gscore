import Link from "next/link";
import styled from "styled-components";
import { SingUpForm, StatusBar } from "../components";
import { Paragraph, Title, Container } from "../styles";

export default function Login() {
  return (
    <Container>
      <StatusBar count={1} />
      <Title>Create account</Title>
      <Paragraph>
        You need to enter your name and email. We will send you a temporary
        password by email
      </Paragraph>
      <SingUpForm />
      <Question>
        Have an account?
        <Link href="/login">
          <Span>Go to the next step</Span>
        </Link>
      </Question>
    </Container>
  );
}

const Question = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
`;

const Span = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #fc5842;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;
