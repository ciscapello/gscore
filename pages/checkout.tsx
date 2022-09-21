import styled from "styled-components";
import { StatusBar, Button } from "../components";
import { Product } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  selectSubscribeId,
  selectIsLogin,
  selectProductForBuy,
  setSelectedSubcribeId,
  buyProduct,
  changeProduct,
  getSubscribes,
} from "../store";
import { unwrapResult } from "@reduxjs/toolkit";
import { Color } from "../styles";
import Basket from "../public/icons/basket.svg";
import { axiosAPI } from "../api";

interface CheckoutProps {
  data: Product[];
}

export default function Checkout({ data }: CheckoutProps) {
  const selectedProductForBuy = useAppSelector(selectProductForBuy);
  const isLogin = useAppSelector(selectIsLogin);
  const selectedSubcribeId = useAppSelector(selectSubscribeId);

  const dispatch = useAppDispatch();
  const [isPurchased, setIsPurchased] = useState(false);

  const router = useRouter();
  !isLogin ? router.push("/login") : null;
  !selectedProductForBuy ? router.push("/") : null;

  const selectedProduct = data.find(
    (product) => product.id === selectedProductForBuy
  );

  const onClick = () => {
    if (!selectedSubcribeId) {
      dispatch(buyProduct());
      setIsPurchased(true);
    } else {
      dispatch(changeProduct())
        .then(unwrapResult)
        .then(() => {
          dispatch(getSubscribes());
          setIsPurchased(true);
          dispatch(setSelectedSubcribeId(null));
        });
    }
  };

  const handleClick = () => {
    router.push("/settings/subscriptions");
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
          <Paragraph text>
            We have sent you a payment receipt by e-mail and a link to download
            the plugin with a license key.
          </Paragraph>
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
              {!isPurchased && <StyledBasket />}
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
      {!isPurchased && (
        <Button small={false} onClick={onClick}>
          Purchase
        </Button>
      )}
      {isPurchased && (
        <LongButton small={false} onClick={handleClick}>
          Go to my subscriptions
        </LongButton>
      )}
    </Container>
  );
}

export async function getStaticProps() {
  const res = await axiosAPI.get("/products");
  const data = await res.data;

  if (!data) {
    return null;
  }
  return { props: { data } };
}

const LongButton = styled(Button)`
  width: 100%;
`;

interface ParagraphProps {
  text: boolean;
}

export const Paragraph = styled.p<ParagraphProps>`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin-bottom: ${(props) => props.text && "40px"};
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
  background-color: ${Color.BLACK};
  box-sizing: border-box;
  border-radius: 12px;
`;

const TableRow = styled.tr`
  height: 110px;
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

const StyledBasket = styled(Basket)`
  margin-left: 20px;
  width: 25px;
  height: 25px;
  border: 0;
  cursor: pointer;
`;

const Container = styled.div`
  width: 45%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 44px;
  line-height: 54px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;
