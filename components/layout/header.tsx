import Image from "next/image";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/useStore";

export default function Header() {
  const { isLogin, username } = useAppSelector((state) => state.user);
  return (
    <Wrapper>
      <Image width={170} height={42} src="/Logo.png" alt="gscore" />
      <Container>{isLogin ? `${username}` : null}</Container>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 2% 5%;
`;

const Container = styled.div``;
