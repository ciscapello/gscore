import styled from "styled-components";

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

export const Success = styled.small`
  color: green;
`;

export const ChangedButton = styled(Button)`
  width: 16%;
`;

export const Subtitle = styled.h3`
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
`;

export const InfoInput = styled(Input)`
  width: 40%;
`;
