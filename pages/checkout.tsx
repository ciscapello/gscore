import styled from "styled-components";
import { StatusBar } from "../components";
import { Button, Error, Paragraph, Title, Container } from "../styles";
import axios from "axios";
import { BASE_URL } from ".";
import { GetStaticPropsContext } from "next";
import { Product } from "../types";
import { useAppSelector } from "../hooks/useStore";
import { useRouter } from "next/router";
import { useState } from "react";

interface CheckoutProps {
  data: Product[];
}

export default function Checkout({ data }: CheckoutProps) {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isError, setIsError] = useState(false);

  const { selectedProductId, isLogin, token } = useAppSelector(
    (state) => state.user
  );

  const router = useRouter();
  !isLogin ? router.push("/login") : null;
  !selectedProductId ? router.push("/") : null;

  const selectedProduct = data.find(
    (product) => product.id === selectedProductId
  );

  const onClick = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(
        `${BASE_URL}/payments/buy`,
        {
          priceId: selectedProduct?.id,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        setIsPurchased(true);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
        console.error(error);
      });
  };

  const handleClick = () => {
    router.push("/subscriptions");
  };

  return (
    <Container>
      {!isPurchased && (
        <>
          <StatusBar count={3} />
          <Title>Checkout</Title>
        </>
      )}
      {isPurchased && (
        <>
          <Title>Start your subscription</Title>
          <Text>
            We have sent you a payment receipt by e-mail and a link to download
            the plugin with a license key.
          </Text>
        </>
      )}
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
              {!isPurchased && <Delete />}
            </TableData>
          </TableRow>
        </tbody>
      </Table>
      {!isPurchased && (
        <Wrapper>
          <Total>Total:</Total>
          <Total>{`$${selectedProduct?.prices[0].price}`}</Total>
        </Wrapper>
      )}
      {isError && <Error>Something goes wrong</Error>}
      {!isPurchased && <Button onClick={onClick}>Purchase</Button>}
      {isPurchased && (
        <LongButton onClick={handleClick}>Go to my subscriptions</LongButton>
      )}
    </Container>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await axios(`${BASE_URL}/products`);
  const data = await res.data;

  if (!data) {
    return null;
  }

  return { props: { data } };
}

const LongButton = styled(Button)`
  width: 100%;
`;

const Text = styled(Paragraph)`
  margin-bottom: 40px;
`;

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
