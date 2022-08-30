import styled from "styled-components";
import StatusBar from "../components/statusBar";
import { Container, Title } from "./createAccount";
import { Button } from "../components/signUpForm";
import axios from "axios";
import { BASE_URL } from ".";
import { GetStaticPropsContext } from "next";
import { IProduct } from "../types";
import { useAppSelector } from "../hooks/useStore";

interface CheckoutProps {
  data: IProduct[];
}

export default function Checkout({ data }: CheckoutProps) {
  const { selectedProductId } = useAppSelector((state) => state.user);
  const selectedProduct = data.find(
    (product) => product.id === selectedProductId
  );
  return (
    <Container>
      <StatusBar count={3} />
      <Title>Checkout</Title>
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>Package name</TableHeader>
            <TableHeader>Price</TableHeader>
          </TableRow>
          <TableRow>
            <TableData>{selectedProduct?.name}</TableData>
            <TableData>
              {`$${selectedProduct?.prices[0].price}`}
              <Delete />
            </TableData>
          </TableRow>
        </tbody>
      </Table>
      <Wrapper>
        <Total>Total:</Total>
        <Total>{`$${selectedProduct?.prices[0].price}`}</Total>
      </Wrapper>
      <Button>Purchase</Button>
    </Container>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await axios(`${BASE_URL}/products`);
  const data = await res.data;

  if (!data) {
    return {};
  }

  return { props: { data } };
}

const Total = styled.p`
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 15px;
  background-color: #272727;
  box-sizing: border-box;
  border-radius: 12px;
`;

const TableRow = styled.tr`
  height: 110px;
  border
`;

const TableData = styled.td`
  font-weight: 400;
  font-size: 24px;
  line-height: 38px;
  padding: 4%;
`;

const TableHeader = styled(TableData)`
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
  border-bottom: 1px solid gray;
`;

const Delete = styled.button`
  margin-left: 20px;
  width: 25px;
  height: 25px;
  background: url("/icons/Vector.png") center/cover no-repeat;
  border: 0;
  cursor: pointer;
`;
