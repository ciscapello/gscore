import styled from "styled-components";
import { useAppDispatch } from "../hooks/useStore";
import { activateCode } from "../store/products/productsSlice";
import { Code } from "../types";

interface CodeContainerProps {
  code: Code;
}

export default function CodeContainer({ code }: CodeContainerProps) {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(activateCode(code));
  };

  return (
    <Wrapper status={code.status}>
      <Checkbox type="checkbox" />
      <Code>
        <Small>License code</Small>
        <CodeBox disabled defaultValue={code.code} />
      </Code>
      <Domain>
        <Small>Domain</Small>
        <DomainBox
          status={code.status}
          disabled
          defaultValue="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus,
          molestiae."
        />
      </Domain>
      {code.status === "INACTIVE" && (
        <Button onClick={onClick}>Activate</Button>
      )}
      <Status>
        <Small>Status</Small>
        <StatusBox status={code.status}>{code.status}</StatusBox>
      </Status>
    </Wrapper>
  );
}

const Button = styled.button`
  border-radius: 4px;
  border: 0;
  padding: 20px 24px;
  color: #fc5842;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  width: 120px;
  height: 58px;
  margin-top: 35px;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

interface StatusProps {
  status: string;
}

const StatusBox = styled.div<StatusProps>`
  height: 68px;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: ${(props) => {
    if (props.status === "ACTIVE") return "#05C168";
    if (props.status === "HOLD") return "#ff9e2c";
    if (props.status === "INACTIVE") return "#FF5A65";
  }};
  justify-self: center;
  line-height: 77px;
`;

const Small = styled.small`
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #969696;
`;

const DomainBox = styled.input<StatusProps>`
  margin-top: 10px;
  padding: 0 5%;
  background-color: #393939;
  border-radius: 6px;
  height: 68px;
  color: #969696;
  border: 0;
`;

const CodeBox = styled.input`
  margin-top: 10px;
  background-color: #393939;
  border-radius: 6px;
  height: 68px;
  width: 300px;
  color: #969696;
  border: 0;
  text-align: center;
`;

const Code = styled.div`
  display: flex;
  flex-direction: column;
`;

const Domain = styled.div`
  display: flex;
  flex-direction: column;
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8%;
`;

const Wrapper = styled.div<StatusProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.status === "INACTIVE" ? "1fr 4fr 10fr 2fr 3fr" : "1fr 4fr 12fr 3fr"};
  column-gap: 20px;
  align-items: center;
  margin-top: 30px;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  background-color: #272727;
  height: 153px;
  border-radius: 12px;
  padding: 2% 1% 5% 2%;
`;

const Checkbox = styled.input`
  border-radius: 50%;
  background-color: #c7c7c7;
  width: 28px;
  height: 28px;
  &:checked {
    background-color: red;
  }
`;
