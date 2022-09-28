import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Product, Pricing } from "../../types";
import { useRouter } from "next/router";
import { selectIsLogin, selectProduct } from "../../store";
import { Color } from "../../styles";
import { Check } from "../icons";

interface CardProps {
  pricing: Pricing;
  index: number;
  product: Product;
}

export default function Card({ product, pricing, index }: CardProps) {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectIsLogin);
  const router = useRouter();

  const onClick = () => {
    dispatch(selectProduct(product.id));
    isLogin ? router.push("/checkout") : router.push("/createAccount");
  };

  const { text, features } = pricing;

  return (
    <Wrapper index={index}>
      <Price>{`$${product.prices[0].price}`}</Price>
      <Title>{product.name}</Title>
      <Text index={index}>{text}</Text>
      <List>
        {features.map((feature, ind) => (
          <Flex key={ind}>
            <Check />
            <Item>{feature}</Item>
          </Flex>
        ))}
      </List>
      <Button index={index} onClick={onClick}>
        Get Gscore
      </Button>
    </Wrapper>
  );
}

interface StyledProps {
  index: number;
}

const Wrapper = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 612px;
  box-sizing: border-box;
  background-color: ${(props) => (props.index === 1 ? Color.RED : Color.BLACK)};
  transform: ${(props) => (props.index === 1 ? "translateY(-40px)" : "0")};
  font-family: "thicccboi", sans-serif;
  border-radius: 12px;
  padding: 3%;
  margin-right: ${(props) => (props.index === 2 ? "0" : "30px")};
  @media (max-width: 1270px) {
    width: 30%;
    height: auto;
  }
  @media (max-width: 768px) {
    width: 80%;
    transform: none;
    margin-right: 0;
    margin-bottom: 30px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Price = styled.h2`
  margin: 0;
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  font-size: 54px;
  line-height: 66px;
  color: ${Color.WHITE};
`;

const Title = styled.h3`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 24px;
  line-height: 26px;
  color: ${Color.WHITE};
`;

const Text = styled.p<StyledProps>`
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  color: ${(props) => (props.index === 1 ? Color.WHITE : Color.LIGHTGRAY)};
  border-bottom: 1px solid white;
  padding-bottom: 30px;
  text-align: center;
`;

const List = styled.ul`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: ${Color.WHITE};
  align-self: flex-start;
  margin-bottom: 0;
`;

const Item = styled.li`
  list-style-type: none;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const Button = styled.button<StyledProps>`
  width: 100%;
  height: 72px;
  background: ${Color.WHITE};
  border-radius: 6px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: ${(props) => (props.index === 1 ? Color.ORANGE : Color.BLACK)};
  border: 0;
  cursor: pointer;
  &:hover {
    background-color: ${Color.GRAY};
  }
`;
