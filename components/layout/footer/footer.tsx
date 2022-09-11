import Image from "next/image";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <FooterTop>
        <Image width={170} height={42} src="/Logo.png" alt="gscore logotype" />
        <p>Ut enim ad minim veniam quis nostrud exercitation ea commodo</p>
      </FooterTop>
      <FooterBottom>
        <Copyright>
          Copyright © 2022 GScore | All Rights Reserved |{" "}
          <A href="#">Cookies</A> | <A href="#">Privacy Policy</A>
        </Copyright>
        <ImageWrapper>
          <A href="#">
            <Image
              width={18}
              height={25}
              src="/icons/Facebook.png"
              alt="facebook"
            />
          </A>
          <A href="#">
            <Image
              width={25}
              height={23}
              src="/icons/Twitter.png"
              alt="twitter"
            />
          </A>
          <A href="#">
            <Image
              width={25}
              height={25}
              src="/icons/LinkedIn.png"
              alt="linkedIn"
            />
          </A>
        </ImageWrapper>
      </FooterBottom>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  margin-top: 40px;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  color: #c7c7c7;
  border-top: 1px solid gray;
  @media (max-width: 768px) {
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
  }
`;

const FooterTop = styled.div`
  display: flex;
  padding: 5% 5%;
  flex-direction: column;
  align-items: flex-start;
  max-width: 20%;
  &:after {
    content: "";
    position: relative;
    top: 30px;
    left: 0;
    width: 450%;
    border-top: 1px solid gray;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0% 3%;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Copyright = styled.p`
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const A = styled.a`
  color: white;
`;

const ImageWrapper = styled.div`
  width: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    width: 40%;
    margin-bottom: 40px;
  }
`;

export default Footer;
