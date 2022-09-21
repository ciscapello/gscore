import styled from "styled-components";
import Image from "next/image";
import { Color } from "../../styles";

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
        <Image
          src="/icons/arrowRight.png"
          width={24}
          height={24}
          alt="arrowRight"
        />
      </ArrowLeft>
      <Counter>
        <Span>{counter}</Span>/{dataLength}
      </Counter>
      <ArrowRight onClick={() => turnRight(1)}>
        <Image
          src="/icons/arrowRight.png"
          width={24}
          height={24}
          alt="arrowRight"
        />
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
  color: ${Color.DARKGRAY};
  width: auto;
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const Span = styled.span`
  color: ${Color.WHITE};
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
    border-color: ${Color.GRAY};
  }
  @media (max-width: 768px) {
    display: none;
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
    border-color: ${Color.GRAY};
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
