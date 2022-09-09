import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  CodeContainer,
  NoSubscriptions,
  ProductCard,
  ProductNavigation,
} from "../components";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import {
  getSubscribes,
  setCurrentCardIndex,
  setSelectedSubcribeId,
} from "../store/products/productsSlice";
import { Button, Title } from "../styles";

export default function Subscriptions() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLogin } = useAppSelector((state) => state.user);
  // const { holded, setHolded } = useState<boolean>(false);
  const { currentCardIndex, subscribes } = useAppSelector(
    (state) => state.products
  );

  !isLogin ? router.push("/") : null;

  if (subscribes && currentCardIndex === null) {
    dispatch(setCurrentCardIndex(0));
  }

  useEffect(() => {
    dispatch(getSubscribes());
  }, [dispatch]);

  const currentCodes = subscribes.find(
    (_, index) => index === currentCardIndex
  )?.codes;

  const [counter, setCounter] = useState(1);
  const [offset, setOffset] = useState(0);

  const turnLeft = (turnCount = 1) => {
    if (counter <= 1) return;
    setCounter((prevState) => prevState - turnCount);
    setOffset((prevState) => prevState + 640 * turnCount);
    dispatch(setCurrentCardIndex(currentCardIndex! - turnCount));
  };

  const turnRight = (turnCount = 1) => {
    if (counter >= subscribes!.length) return;
    setCounter((prevState) => prevState + turnCount);
    setOffset((prevState) => prevState - 640 * turnCount);
    dispatch(setCurrentCardIndex(currentCardIndex! + turnCount));
  };

  const handleClick = () => {
    const subscribeId = subscribes[currentCardIndex!].id;
    dispatch(setSelectedSubcribeId(subscribeId));
    dispatch(setCurrentCardIndex(null));
    router.push("/");
  };

  // const { register, watch } = useForm<CheckedInputs>();
  // console.log(watch);

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>My subscriptions</Title>
          {subscribes[0] && (
            <SmallButton onClick={handleClick}>Upgrade</SmallButton>
          )}
        </Header>
        {subscribes[0] ? (
          <>
            <Cards offset={offset}>
              {subscribes?.map((elem, index) => (
                <ProductCard
                  turnRight={turnRight}
                  subscribe={elem}
                  key={elem.id}
                  price={elem.product.prices[0].price}
                  counter={counter}
                  index={index}
                />
              ))}
            </Cards>
            <ProductNavigation
              turnLeft={turnLeft}
              turnRight={turnRight}
              counter={counter}
              dataLength={subscribes.length}
            />
            <Codes>
              {currentCodes?.map((code) => (
                <CodeContainer key={code.id} code={code} />
              ))}
            </Codes>
            <ActivateCodes>
              <p>Select the domains you want to keep</p>
              <SmallButton>Confirm</SmallButton>
            </ActivateCodes>
          </>
        ) : (
          <NoSubscriptions />
        )}
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

const ActivateCodes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Codes = styled.div`
  display: flex;
  flex-direction: column;
`;

const SmallButton = styled(Button)`
  max-width: 10%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
