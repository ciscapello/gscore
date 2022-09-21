import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CodeContainer,
  NoSubscriptions,
  ProductCard,
  ProductNavigation,
} from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import {
  setCurrentCardIndex,
  setSelectedSubcribeId,
  selectIsLogin,
  selectCurrentCardIndex,
  selectAllSubscribes,
  activateHoldedCodes,
  getSubscribes,
} from "../../store";
import { Button } from "../../components";
import { Code } from "../../types";

export default function Subscriptions() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLogin = useAppSelector(selectIsLogin);
  const currentCardIndex = useAppSelector(selectCurrentCardIndex);
  const subscribes = useAppSelector(selectAllSubscribes);

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
    if (currentCardIndex) {
      const subscribeId = subscribes[currentCardIndex].id ?? false;
      if (selectedCodes.length !== currentProductSitesCount) {
        setSelectSitesError(true);
        return;
      }
      dispatch(activateHoldedCodes({ selectedCodes, subscribeId }));
      setSelectSitesError(false);
    }
  };

  !isLogin ? router.push("/") : null;

  if (subscribes && currentCardIndex === null) {
    dispatch(setCurrentCardIndex(0));
  }

  useEffect(() => {
    dispatch(getSubscribes());
  }, [dispatch]);

  const currentCodes: Code[] | undefined = subscribes.find(
    (_, index) => index === currentCardIndex
  )?.codes;

  const haveHoldStatus = () => {
    if (currentCodes && currentCodes[0].status === "HOLD") {
      return true;
    } else {
      return false;
    }
  };

  const [counter, setCounter] = useState(1);
  const [offset, setOffset] = useState(0);

  const turnLeft = (turnCount = 1) => {
    if (counter <= 1) return;
    setCounter((prevState) => prevState - turnCount);
    if (document.body.clientWidth > 768) {
      setOffset((prevState) => prevState + 640 * turnCount);
    }
    if (currentCardIndex) {
      dispatch(setCurrentCardIndex(currentCardIndex - turnCount));
      setSelectedCodes([]);
    }
  };

  const turnRight = (turnCount = 1) => {
    if (counter >= subscribes?.length) return;
    setCounter((prevState) => prevState + turnCount);
    if (document.body.clientWidth > 768) {
      setOffset((prevState) => prevState - 640 * turnCount);
    }
    dispatch(
      setCurrentCardIndex(
        currentCardIndex ? currentCardIndex + turnCount : turnCount
      )
    );
    setSelectedCodes([]);
  };

  const handleClick = () => {
    if (currentCardIndex) {
      const subscribeId = subscribes[currentCardIndex].id;
      dispatch(setSelectedSubcribeId(subscribeId));
      dispatch(setCurrentCardIndex(null));
      router.push("/");
    }
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>My subscriptions</Title>
          {subscribes[0] && (
            <Button small tranparent onClick={handleClick}>
              Upgrade
            </Button>
          )}
        </Header>
        {subscribes[0] ? (
          <>
            <Cards offset={offset}>
              {subscribes?.map((elem, index) => (
                <ProductCard
                  turnRight={turnRight}
                  turnLeft={turnLeft}
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
            <MobileSelectDomains haveHoldStatus={haveHoldStatus}>
              Select the domains you want to keep
            </MobileSelectDomains>
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
            <ActivateCodes haveHoldStatus={haveHoldStatus}>
              <SelectDomains>Select the domains you want to keep</SelectDomains>
              <Button small activate onClick={activateCodes}>
                Confirm
              </Button>
            </ActivateCodes>
          </>
        ) : (
          <NoSubscriptions />
        )}
      </Container>
    </Wrapper>
  );
}

interface HaveHoldStatus {
  haveHoldStatus: () => boolean;
}

interface CardsProps {
  offset: number;
}

const Wrapper = styled.div`
  overflow: hidden;
`;

const SelectDomains = styled.p`
  @media (max-width: 768px) {
    display: none;
  }
`;

const SelectError = styled.p`
  text-align: center;
  color: red;
`;

const MobileSelectDomains = styled.p<HaveHoldStatus>`
  max-width: 50%;
  display: none;
  @media (max-width: 768px) {
    ${(props) => (props.haveHoldStatus() ? "block" : "none")};
  }
`;

const ActivateCodes = styled.div<HaveHoldStatus>`
  justify-content: space-between;
  align-items: center;
  display: ${(props) => (props.haveHoldStatus() ? "flex" : "none")};
`;

const Codes = styled.div`
  display: flex;
  flex-direction: column;
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
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 44px;
  line-height: 54px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;
