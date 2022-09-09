import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CodeContainer,
  NoSubscriptions,
  ProductCard,
  ProductNavigation,
} from "../components";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import {
  activateHoldedCodes,
  getSubscribes,
  setCurrentCardIndex,
  setSelectedSubcribeId,
} from "../store/products/productsSlice";
import { Button, Title } from "../styles";

export default function Subscriptions() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLogin } = useAppSelector((state) => state.user);

  const { currentCardIndex, subscribes } = useAppSelector(
    (state) => state.products
  );

  const [selectedCodes, setSelectedCodes] = useState<number[]>([]);
  const [selectSitesError, setSelectSitesError] = useState(false);

  const addCodeToSelect = (codeId: number) => {
    setSelectedCodes([...selectedCodes, codeId]);
    console.log(selectedCodes);
  };

  const removeCodeFromSelect = (codeId: number) => {
    setSelectedCodes(() => selectedCodes.filter((elem) => elem !== codeId));
    console.log(selectedCodes);
  };

  const currentProductSitesCount = subscribes.find(
    (_, index) => index === currentCardIndex
  )?.product.sitesCount;

  const activateCodes = () => {
    const subscribeId = subscribes[currentCardIndex!].id;
    if (selectedCodes.length !== currentProductSitesCount!) {
      setSelectSitesError(true);
      return;
    }
    dispatch(activateHoldedCodes({ selectedCodes, subscribeId }));
    setSelectSitesError(false);
  };

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
    setSelectedCodes([]);
  };

  const turnRight = (turnCount = 1) => {
    if (counter >= subscribes!.length) return;
    setCounter((prevState) => prevState + turnCount);
    setOffset((prevState) => prevState - 640 * turnCount);
    dispatch(setCurrentCardIndex(currentCardIndex! + turnCount));
    setSelectedCodes([]);
  };

  const handleClick = () => {
    const subscribeId = subscribes[currentCardIndex!].id;
    dispatch(setSelectedSubcribeId(subscribeId));
    dispatch(setCurrentCardIndex(null));
    router.push("/");
  };

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
                <CodeContainer
                  key={code.id}
                  addCodeToSelect={addCodeToSelect}
                  removeCodeFromSelect={removeCodeFromSelect}
                  currentProductSitesCount={currentProductSitesCount}
                  selectedCodes={selectedCodes}
                  code={code}
                />
              ))}
            </Codes>
            {selectSitesError && (
              <SelectError>
                You have to select {currentProductSitesCount} codes!
              </SelectError>
            )}
            <ActivateCodes>
              <p>Select the domains you want to keep</p>
              <SmallButton onClick={activateCodes}>Confirm</SmallButton>
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

const SelectError = styled.p`
  text-align: center;
  color: red;
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
