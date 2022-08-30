import Card from "../components/card";
import { Pricing } from "../types";
import styled from "styled-components";
import axios from "axios";

export const BASE_URL = "https://gscore-back.herokuapp.com/api";

export default function Home() {
  axios(`${BASE_URL}/products`).then((res) => console.log(res));
  return (
    <Wrapper>
      <Title>Get started with Gscore today!</Title>
      <Container>
        {pricing.map((elem, index) => (
          <Card key={index} pricing={elem} index={index} />
        ))}
      </Container>
      <Paragraph>Have more than 10 sites?</Paragraph>
      <A href="#">Contact us</A>
    </Wrapper>
  );
}

const Paragraph = styled.p`
  font-family: "THICCCBOI";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  color: white;
`;

const A = styled.a`
  font-family: "THICCCBOI";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #fc5842;
  &:hover {
    color: white;
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
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
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
    title: "10 Site license",
    text: "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
    features: [
      "All features for 10 sites",
      "Special introductory pricing",
      "Unlimited Pages and Keywords",
      "Billed annually",
    ],
  },
];
