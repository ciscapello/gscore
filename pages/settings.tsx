import { useState } from "react";
import styled from "styled-components";
import { InfoForm, PasswordForm } from "../components";

export default function Settings() {
  const [personalInfo, setPersonalInfo] = useState("info");

  const handleBarPassword = () => {
    setPersonalInfo("password");
  };

  const handleBarInfo = () => {
    setPersonalInfo("info");
  };

  return (
    <Container>
      <Title>Settings</Title>
      <Bar>
        <Info personalInfo={personalInfo} onClick={handleBarInfo}>
          Personal Info
        </Info>
        <Password personalInfo={personalInfo} onClick={handleBarPassword}>
          Change Password
        </Password>
      </Bar>
      {personalInfo === "info" ? <InfoForm /> : <PasswordForm />}
    </Container>
  );
}

interface BarProps {
  personalInfo: string;
}

const Password = styled.span<BarProps>`
  color: ${(props) => (props.personalInfo === "password" ? "red" : "gray")};
  border-bottom: ${(props) =>
    props.personalInfo === "password" ? "1px solid red" : "none"};
  width: 15%;
  padding-bottom: 10px;
  text-align: center;
  cursor: pointer;
  transform: translateY(1px);
`;

const Info = styled.span<BarProps>`
  color: ${(props) => (props.personalInfo === "info" ? "red" : "gray")};
  border-bottom: ${(props) =>
    props.personalInfo === "info" ? "1px solid red" : "none"};
  width: 15%;
  padding-bottom: 10px;
  text-align: center;
  cursor: pointer;
  transform: translateY(1px);
`;

const Bar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid gray;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 54px;
  line-height: 64px;
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;
