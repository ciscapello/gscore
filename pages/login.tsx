import styled from "styled-components";

export default function Login() {
  return (
    <Container>
      <Title>Create account</Title>
      <Paragraph>
        You need to enter your name and email. We will send you a temporary
        password by email
      </Paragraph>
    </Container>
  );
}

const Container = styled.div`
  width: 45%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 44px;
  line-height: 54px;
`;

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;
