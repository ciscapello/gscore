import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CodeContainer from "../components/codeContainer";
import ProductCard from "../components/productCard";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { getSubscribes } from "../store/products/productsSlice";
import { Title } from "../styles";

export default function Subscriptions() {
  const { token } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubscribes(token));
  }, [dispatch, token]);

  const { products: data } = useAppSelector((state) => state.products);

  const [currentCard, setCurrentCard] = useState<number | null>(null);

  const currentCodes = data.find((elem) => elem.id === currentCard)?.codes;

  // const [currentCodes, setCodes] = useState(codes);

  const [counter, setCounter] = useState(1);
  const [offset, setOffset] = useState(0);

  const turnLeft = () => {
    if (counter <= 1) return;
    setCounter((prevState) => prevState - 1);
    setOffset((prevState) => prevState + 640);
  };

  const turnRight = () => {
    if (counter >= data!.length) return;
    setCounter((prevState) => prevState + 1);
    setOffset((prevState) => prevState - 640);
  };

  return (
    <Wrapper>
      <Container>
        <Title>My subscriptions</Title>
        <Cards offset={offset}>
          {data?.map((elem) => (
            <ProductCard
              key={elem.id}
              status={elem.status}
              date={elem.currentPeriodEnd}
              name={elem.product.name}
              price={elem.product.prices[0].price}
              id={elem.id}
              setCurrentCard={setCurrentCard}
            />
          ))}
        </Cards>
        <Navigation>
          <ArrowLeft onClick={turnLeft}>
            <Image src="/icons/arrowRight.png" width={24} height={24} alt="" />
          </ArrowLeft>
          <Counter>
            <Span>{counter}</Span>/{data?.length}
          </Counter>
          <ArrowRight onClick={turnRight}>
            <Image src="/icons/arrowRight.png" width={24} height={24} alt="" />
          </ArrowRight>
        </Navigation>
        <Codes>
          {currentCodes?.map((code) => (
            <CodeContainer key={code.id} code={code} />
          ))}
        </Codes>
      </Container>
    </Wrapper>
  );
}

interface CardsProps {
  offset: number;
}

const Wrapper = styled.div`
  overflow: hidden;
`;

const Codes = styled.div`
  display: flex;
  flex-direction: column;
`;

const Cards = styled.div<CardsProps>`
  display: flex;
  position: relative;
  left: ${(props) => props.offset}px;
  transition: 0.4s;
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

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
