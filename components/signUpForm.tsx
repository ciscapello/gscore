import styled from "styled-components";

export default function SingUpForm() {
  return (
    <>
      <Form>
        <Input placeholder="Username" type="text" />
        <Input placeholder="Email" type="text" />
        <Input placeholder="Password" type="text" />
        <Button>Send password</Button>
      </Form>
    </>
  );
}

export const Form = styled.form`
  margin-top: 40px;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 68px;
  border: 1px solid #d7d7d7;
  border-radius: 6px;
  margin-bottom: 24px;
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
