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
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Paragraph = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
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
  @media (max-width: 768px) {
    width: 50%;
  }
`;

export const Success = styled.small`
  color: green;
`;

export const ChangedButton = styled(Button)`
  width: 16%;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

export const Subtitle = styled.h3`
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
`;

export const InfoInput = styled(Input)`
  width: 40%;
  @media (max-width: 768px) {
    width: auto;
  }
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 44px;
  line-height: 54px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const Container = styled.div`
  width: 45%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
  }
`;
