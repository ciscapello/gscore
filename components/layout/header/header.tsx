import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { logout } from "../../../store/user/userSlice";
import Head from "next/head";

export default function Header() {
  const { isLogin, username } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  let [isShow, setIsShow] = useState<boolean>(false);

  const onClick = () => {
    setIsShow((prevState: boolean) => !prevState);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setIsShow((prevState: boolean) => !prevState);
    router.push("/");
  };

  const settingsHandler = () => {
    router.push("/settings");
    setIsShow((prevState: boolean) => !prevState);
  };

  return (
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
            <Link href="/subscriptions">
              <A>My subscriptions</A>
            </Link>
            <Username onClick={onClick}>
              <div>{username}</div>
              <Span isShow={isShow}>⌃</Span>
            </Username>
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
  );
}

const LinkedImage = styled(Image)`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
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
