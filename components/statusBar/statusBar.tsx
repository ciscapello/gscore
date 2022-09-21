import styled from "styled-components";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks";
import { selectIsLogin } from "../../store";
import { Color } from "../../styles";

interface StatusBarProps {
  count: number;
}

export default function StatusBar({ count }: StatusBarProps) {
  const router = useRouter();
  const statusTitle = ["Create account", "Log in", "Checkout"];
  const isLogin = useAppSelector(selectIsLogin);

  const handleClick = (index: number) => {
    if (isLogin) return;
    if (index === 0) {
      router.push("/createAccount");
    } else if (index === 1) {
      router.push("/login");
    }
  };

  return (
    <Wrapper>
      {statusTitle.map((elem, index) => (
        <Status
          key={index}
          index={index + 1}
          isLogin={isLogin}
          onClick={() => handleClick(index)}
        >
          <p>{elem}</p>
          <Bar index={index + 1} count={count} />
        </Status>
      ))}
    </Wrapper>
  );
}

interface BarProps {
  index: number;
  count: number;
}

interface StatusProps {
  index: number;
  isLogin: boolean;
}

const Status = styled.div<StatusProps>`
  width: 30%;
  cursor: ${(props) =>
    props.index < 3 && !props.isLogin ? "pointer" : "default"};
  @media (max-width: 400px) {
    &:first-child {
      line-height: 9px;
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
`;

const Bar = styled.div<BarProps>`
  height: 8px;
  width: 100%;
  background: #fc5842;
  background-color: ${(props) =>
    props.index <= props.count ? Color.ORANGE : Color.DARKGRAY};
  border-radius: 4px;
`;
