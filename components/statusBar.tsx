import styled from "styled-components";

interface StatusBarProps {
  count: number;
}

export default function StatusBar({ count }: StatusBarProps) {
  const statusTitle = ["Create account", "Log in", "Checkout"];
  return (
    <Wrapper>
      {statusTitle.map((elem, index) => (
        <Status key={index}>
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

const Status = styled.div`
  width: 30%;
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
    props.index <= props.count ? "#fc5842" : "#393939"};
  border-radius: 4px;
`;
