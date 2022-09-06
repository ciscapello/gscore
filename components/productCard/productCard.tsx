import styled from "styled-components";

interface ProductCardProps {
  status: string;
  date: string;
  name: string;
  price: string;
  id: number;
  setCurrentCard: (arg: number) => void;
  counter: number;
  index: number;
}

export default function ProductCard({
  status,
  date,
  name,
  price,
  id,
  setCurrentCard,
  counter,
  index,
}: ProductCardProps) {
  let newDate = new Date(Number(date)).toLocaleDateString();

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
            <Data>valid until {newDate}</Data>
          </ProductWrapper>
          <Price>${price}</Price>
        </Row>
        <Button onClick={() => setCurrentCard(id)}>View</Button>
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
