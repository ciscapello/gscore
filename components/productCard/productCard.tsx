import styled from "styled-components";
import { Subscribe } from "../../types";
import { setCurrentCardIndex } from "../../store/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";

interface ProductCardProps {
  subscribe: Subscribe;
  price: string;
  counter: number;
  index: number;
  turnRight: (count: number) => void;
}

export default function ProductCard({
  price,
  subscribe,
  counter,
  index,
  turnRight,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { currentCardIndex } = useAppSelector((state) => state.products);
  const {
    status,
    currentPeriodEnd,
    product: { name },
    id,
  } = subscribe;
  let currentPeriodEndFormatted = new Date(
    Number(currentPeriodEnd)
  ).toLocaleDateString();

  let count: number;

  if (counter < index) {
    count = index + 1 - counter;
  } else if (counter > index) {
    count = counter - index + 1;
  } else {
    count = 1;
  }

  const handleClick = () => {
    dispatch(setCurrentCardIndex(index));
    turnRight(count);
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
            <ProductName>{name} license</ProductName>
            <Data>valid until {currentPeriodEndFormatted}</Data>
          </ProductWrapper>
          <Price>${price}</Price>
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
  color: #fc5842;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  width: 120px;
  height: 58px;
  margin-top: 35px;
  cursor: pointer;
  &:hover {
    background-color: gray;
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
  color: #969696;
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
  background: #393939;
  border-radius: 12px;
  margin-right: 20px;
  opacity: ${(props) => (props.counter === props.index + 1 ? "1" : "0.7")};
  transition: 0.4s;
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
  color: #05c168;
`;
