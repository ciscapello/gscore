import styled from "styled-components";

export default function Card() {
  return (
    <Wrapper>
      <Price></Price>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 400px;
  height: 612px;
  background-color: #272727;
`;

const Price = styled.h2`
  font-family: "DM Sans", sans-serif;
`;
