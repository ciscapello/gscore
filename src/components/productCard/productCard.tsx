import styled from "styled-components";
import { Subscribe } from "../../types";
import { setCurrentCardIndex } from "../../store";
import { useAppDispatch } from "../../hooks";
import { Color } from "../../styles";

interface ProductCardProps {
  subscribe: Subscribe;
  price: string;
  counter: number;
  index: number;
  turnRight: (count: number) => void;
  turnLeft: (count: number) => void;
}

export default function ProductCard({
  price,
  subscribe,
  counter,
  index,
  turnRight,
  turnLeft,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { status, currentPeriodEnd } = subscribe;
  const { name } = subscribe.product[0];
  const currentPeriodEndFormatted = new Date(
    currentPeriodEnd
  ).toLocaleDateString();
  let turnCount: number;

  if (counter < index + 1) {
    turnCount = index + 1 - counter;
  } else if (counter > index + 1) {
    turnCount = counter - (index + 1);
  } else if (counter === index + 1) {
    turnCount = 0;
  }

  const handleClick = () => {
    dispatch(setCurrentCardIndex(index));
    if (index + 1 > counter) {
      turnRight(turnCount);
    } else if (index + 1 < counter) {
      turnLeft(turnCount);
    }
  };

  return (
    <Card counter={counter} index={index}>
      <CardHeader>
        <span>Gscore</span>
        <Status>{status}</Status>
      </CardHeader>
      <CardBody>
        <Row>
          <ProductWrapper>
            <ProductName>{name}</ProductName>
            <Data>valid until {currentPeriodEndFormatted}</Data>
          </ProductWrapper>
          <Price>{price}</Price>
        </Row>
        <Button onClick={handleClick}>View</Button>
      </CardBody>
    </Card>
  );
}

interface CardProps {
  counter: number;
  index: number;
}

const Button = styled.button`
  border-radius: 4px;
  border: 0;
  padding: 20px 24px;
  color: ${Color.ORANGE};
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  width: 120px;
  height: 58px;
  margin-top: 35px;
  cursor: pointer;
  &:hover {
    background-color: ${Color.GRAY};
  }
`;

const Price = styled.span`
  font-weight: 500;
  font-size: 24px;
  line-height: 26px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Data = styled.small`
  margin-top: 10px;
  color: ${Color.GRAY};
`;

const ProductName = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 26px;
`;

const Card = styled.div<CardProps>`
  box-sizing: border-box;
  min-width: 620px;
  height: 330px;
  background: ${Color.BLACK};
  border-radius: 12px;
  margin-right: 20px;
  opacity: ${(props) => (props.counter === props.index + 1 ? "1" : "0.7")};
  transition: 0.4s;
  @media (max-width: 768px) {
    min-width: 315px;
    width: 315px;
    height: 270px;
  }
`;

const CardBody = styled.div`
  padding: 5%;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  border-bottom: 1px solid gray;
  padding: 8% 5% 5% 5%;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Status = styled.span`
  color: ${Color.GREEN};
`;
