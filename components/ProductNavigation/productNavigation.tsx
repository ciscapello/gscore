import styled from "styled-components";
import Image from "next/image";

interface IProductNavigationProps {
  turnLeft: (count: number) => void;
  turnRight: (count: number) => void;
  counter: number;
  dataLength: number;
}

export default function ProductNavigation({
  turnLeft,
  turnRight,
  counter,
  dataLength,
}: IProductNavigationProps) {
  return (
    <Navigation>
      <ArrowLeft onClick={() => turnLeft(1)}>
        <Image src="/icons/arrowRight.png" width={24} height={24} alt="" />
      </ArrowLeft>
      <Counter>
        <Span>{counter}</Span>/{dataLength}
      </Counter>
      <ArrowRight onClick={() => turnRight(1)}>
        <Image src="/icons/arrowRight.png" width={24} height={24} alt="" />
      </ArrowRight>
    </Navigation>
  );
}

const Navigation = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Counter = styled.div`
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: #393939;
`;

const Span = styled.span`
  color: white;
`;

const ArrowLeft = styled.button`
  background-color: transparent;
  width: 44px;
  height: 44px;
  border: 1px solid white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  transform: rotate(180deg);
  &:hover {
    border-color: gray;
  }
`;
const ArrowRight = styled.button`
  background-color: transparent;
  width: 44px;
  height: 44px;
  border: 1px solid white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  &:hover {
    border-color: gray;
  }
`;
