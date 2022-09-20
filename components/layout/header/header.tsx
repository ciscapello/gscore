import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { selectIsLogin, selectUsername, logout } from "../../../store";

export default function Header() {
  const isLogin = useAppSelector(selectIsLogin);
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [mobileMenuIsActive, setMobileMenuIsActive] = useState(false);
  const [mobileProfileMenuIsActive, setMobileProfileMenuIsActive] =
    useState(false);
  let [isShow, setIsShow] = useState<boolean>(false);

  const onClick = () => {
    setIsShow((prevState: boolean) => !prevState);
  };

  const handleLinkClick = () => {
    router.push("/settings/subscriptions");
    setMobileMenuIsActive(false);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setIsShow(false);
    setMobileMenuIsActive(false);
    router.push("/");
  };

  const settingsHandler = () => {
    router.push("/settings/profile");
    setIsShow(false);
    setMobileMenuIsActive(false);
  };

  return (
    <>
      <MobileMenu mobileMenuIsActive={mobileMenuIsActive}>
        <MobileMenuHeadContainer>
          <CloseButton onClick={() => setMobileMenuIsActive(false)} />
          <Image width={170} height={42} src="/Logo.png" alt="gscore" />
        </MobileMenuHeadContainer>
        <A onClick={handleLinkClick}>My subscriptions</A>
        <MobileUsername
          onClick={() => setMobileProfileMenuIsActive((prev) => !prev)}
        >
          <div>{username}</div>
          <Span isShow={mobileProfileMenuIsActive}>⌃</Span>
        </MobileUsername>
        <MobileProfileMenu isShow={mobileProfileMenuIsActive}>
          <Row onClick={settingsHandler}>
            <Image src="/icons/settings.png" width={24} height={24} alt="" />
            <ProfileLink>Settings</ProfileLink>
          </Row>
          <Row onClick={logoutHandler}>
            <Image src="/icons/logout.png" width={24} height={24} alt="" />
            <ProfileLink>Logout</ProfileLink>
          </Row>
        </MobileProfileMenu>
      </MobileMenu>
      <Wrapper>
        <Head>
          <title>Gscore</title>
        </Head>
        <Link href="/">
          <LinkedImage width={170} height={42} src="/Logo.png" alt="gscore" />
        </Link>
        <Container>
          {isLogin && (
            <>
              <BurgerButton
                onClick={() => setMobileMenuIsActive(true)}
              ></BurgerButton>
              <Menu>
                <Link href="/settings/subscriptions">
                  <A>My subscriptions</A>
                </Link>
                <Username onClick={onClick}>
                  <div>{username}</div>
                  <Span isShow={isShow}>⌃</Span>
                </Username>
              </Menu>
            </>
          )}
        </Container>
        <Profile isShow={isShow}>
          <Row onClick={settingsHandler}>
            <Image src="/icons/settings.png" width={24} height={24} alt="" />
            <ProfileLink>Settings</ProfileLink>
          </Row>
          <Row onClick={logoutHandler}>
            <Image src="/icons/logout.png" width={24} height={24} alt="" />
            <ProfileLink>Logout</ProfileLink>
          </Row>
        </Profile>
      </Wrapper>
    </>
  );
}

interface MobileMenuProps {
  mobileMenuIsActive: boolean;
}

const MobileMenuHeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const MobileUsername = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const MobileMenu = styled.div<MobileMenuProps>`
  overflow: hidden;
  height: 1000px;
  float: right;
  width: 70%;
  background-color: #272727;
  position: fixed;
  right: 0;
  z-index: 5;
  padding: 20px;
  display: ${(props) => (props.mobileMenuIsActive ? "block" : "none")};
  opacity: ${(props) => (props.mobileMenuIsActive ? "0.9" : "0")};
`;

const CloseButton = styled.button`
  border: 0;
  display: none !important;
  background: url("/icons/Close.png") center/cover no-repeat;
  width: 30px;
  height: 30px;
  &:active {
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    display: block !important;
  }
`;

const BurgerButton = styled.button`
  border: 0;
  display: none !important;
  background: url("/icons/burger.png") center/cover no-repeat;
  width: 30px;
  height: 30px;
  &:active {
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    display: block !important;
  }
`;

const LinkedImage = styled(Image)`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const Menu = styled.div`
  display: flex;
  @media (max-width: 786px) {
    display: none;
  }
`;

interface SpanProps {
  isShow: boolean;
}

const ProfileLink = styled.p`
  color: white;
  text-decoration: none;
  margin-left: 10px;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  cursor: pointer;
`;

const Profile = styled.div<SpanProps>`
  width: 190px;
  height: 120px;
  padding: 10px;
  position: absolute;
  background-color: #272727;
  display: ${(props) => (props.isShow ? "flex" : "none")};
  transition: 0.4s;
  top: 80px;
  right: 70px;
  border-radius: 12px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
`;

const MobileProfileMenu = styled(Profile)`
  position: static;
  padding: 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &:hover {
    opacity: 0.5;
  }
`;

const Span = styled.span<SpanProps>`
  transform: ${(props) => (props.isShow ? "rotate(0deg)" : "rotate(180deg)")};
  transition: 0.4s;
  align-self: flex-start;
`;

const Username = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;

const A = styled.a`
  text-decoration: none;
  margin-right: 30px;
  cursor: pointer;
  color: white;
  &:hover {
    color: gray;
  }
`;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 2% 5%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;
