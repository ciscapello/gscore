import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CodeContainer,
  NoSubscriptions,
  ProductCard,
  ProductNavigation,
} from "../components";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { getSubscribes } from "../store/products/productsSlice";
import { Button, Title } from "../styles";

export default function Subscriptions() {
  const { token } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubscribes(token));
  }, [dispatch, token]);

  const { products: data } = useAppSelector((state) => state.products);

  const [currentCard, setCurrentCard] = useState<number | null>(null);

  const currentCodes = data.find((elem) => elem.id === currentCard)?.codes;

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
        <Header>
          <Title>My subscriptions</Title>
          {data[0] && <Upgrade>Upgrade</Upgrade>}
        </Header>
        {data[0] ? (
          <>
            <Cards offset={offset}>
              {data?.map((elem, index) => (
                <ProductCard
                  key={elem.id}
                  status={elem.status}
                  date={elem.currentPeriodEnd}
                  name={elem.product.name}
                  price={elem.product.prices[0].price}
                  id={elem.id}
                  setCurrentCard={setCurrentCard}
                  counter={counter}
                  index={index}
                />
              ))}
            </Cards>
            <ProductNavigation
              turnLeft={turnLeft}
              turnRight={turnRight}
              counter={counter}
              dataLength={data.length}
            />
            <Codes>
              {currentCodes?.map((code) => (
                <CodeContainer key={code.id} code={code} />
              ))}
            </Codes>
          </>
        ) : (
          <NoSubscriptions />
        )}
      </Container>
      {loading && <Loading>Loading...</Loading>}
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

const Upgrade = styled(Button)`
  max-width: 10%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Loading = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background-color: green;
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
