import { Card } from "../components";
import { Product, Pricing } from "../types";
import styled from "styled-components";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import { Color } from "../styles";

export const BASE_URL = "https://gscore-back.herokuapp.com/api";

interface HomeProps {
  data: Product[];
}

export default function Home({ data }: HomeProps) {
  console.log(data);
  return (
    <Wrapper>
      <Title>Get started with Gscore today!</Title>
      <Container>
        {pricing.map((elem, index) => (
          <Card
            product={data[index]}
            key={index}
            pricing={elem}
            index={index}
          />
        ))}
      </Container>
      <Paragraph>Have more than 7 sites?</Paragraph>
      <A href="#">Contact us</A>
    </Wrapper>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  console.log("ctx", context);
  const res = await axios(`${BASE_URL}/products`);
  const data = await res.data;

  if (!data) {
    return {};
  }

  return { props: { data } };
}

const Paragraph = styled.p`
  font-family: "THICCCBOI";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  color: ${Color.WHITE};
`;

const A = styled.a`
  font-family: "THICCCBOI";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: ${Color.ORANGE};
  &:hover {
    color: ${Color.WHITE};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "THICCCBOI";
  font-style: normal;
  font-weight: 700;
  font-size: 44px;
  line-height: 54px;
  color: white;
  margin-bottom: 6%;
  @media (max-width: 768px) {
    text-align: center;
    font-size: 34px;
  }
  @media (max-width: 400px) {
    font-size: 28px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const pricing: Pricing[] = [
  {
    price: "$77",
    title: "Single site license",
    text: "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
    features: [
      "Single site license",
      "Special introductory pricing",
      "Unlimited Pages and Keywords",
      "Billed annually",
    ],
  },
  {
    price: "$117",
    title: "3 Site license",
    text: "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
    features: [
      "All features for 3 sites",
      "Special introductory pricing",
      "Unlimited Pages and Keywords",
      "Billed annually",
    ],
  },
  {
    price: "$167",
    title: "7 Site license",
    text: "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
    features: [
      "All features for 7 sites",
      "Special introductory pricing",
      "Unlimited Pages and Keywords",
      "Billed annually",
    ],
  },
];
