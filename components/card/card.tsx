import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { Product, Pricing } from "../types";
import { selectProduct } from "../store/user/userSlice";
import { useRouter } from "next/router";

interface CardProps {
  pricing: Pricing;
  index: number;
  product: Product;
}

export default function Card({ product, pricing, index }: CardProps) {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const router = useRouter();

  const onClick = () => {
    dispatch(selectProduct(product.id));
    token ? router.push("/checkout") : router.push("/createAccount");
  };

  const { text, features } = pricing;

  return (
    <Wrapper index={index}>
      <Price>{`$${product.prices[0].price}`}</Price>
      <Title>{product.name}</Title>
      <Text index={index}>{text}</Text>
      <List>
        {features.map((feature, ind) => (
          <Item key={ind}>{feature}</Item>
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
  background-color: ${(props) => (props.index === 1 ? "#FC5842" : "#272727")};
  transform: ${(props) => (props.index === 1 ? "translateY(-40px)" : "0")};
  font-family: "thicccboi", sans-serif;
  border-radius: 12px;
  padding: 3%;
  margin-right: ${(props) => (props.index === 2 ? "0" : "30px")};
`;

const Price = styled.h2`
  margin: 0;
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  font-size: 54px;
  line-height: 66px;
  color: white;
`;

const Title = styled.h3`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 24px;
  line-height: 26px;
  color: white;
`;

const Text = styled.p<StyledProps>`
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  color: #c7c7c7;
  color: ${(props) => (props.index === 1 ? "white" : "#c7c7c7")};
  border-bottom: 1px solid white;
  padding-bottom: 30px;
  text-align: center;
`;

const List = styled.ul`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: white;
  align-self: flex-start;
  margin-bottom: 0;
`;

const Item = styled.li`
  list-style-type: none;
  margin-bottom: 20px;
  &:before {
    content: "";
    width: 23px;
    height: 23px;
    position: absolute;
    transform: translateX(-33px);
    background: url("/icons/check.png") center/cover no-repeat;
  }
`;

const Button = styled.button<StyledProps>`
  width: 100%;
  height: 72px;
  background: #ffffff;
  border-radius: 6px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: ${(props) => (props.index === 1 ? "#FC5842" : "#181818")};
  border: 0;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;
