import Image from "next/image";
import styled from "styled-components";

export default function Header() {
  return (
    <Wrapper>
      <Image width={170} height={42} src="/Logo.png" alt="gscore" />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: flex-start;
  padding: 2% 5%;
`;
