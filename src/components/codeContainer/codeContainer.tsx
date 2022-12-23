import styled from "styled-components";
import { useAppDispatch, useCopyToClipboard } from "../../hooks";
import { activateCode } from "../../store";
import { Code } from "../../types";
import { useState } from "react";
import { Color } from "../../styles";
import { Clipboard } from "../../shared/assets/svgs";

interface CodeContainerProps {
  code: Code;
  addCodeToSelect: (arg: number) => void;
  removeCodeFromSelect: (arg: number) => void;
  currentProductSitesCount: number | undefined;
  selectedCodes: number[];
}

export default function CodeContainer({
  code,
  addCodeToSelect,
  removeCodeFromSelect,
  currentProductSitesCount,
  selectedCodes,
}: CodeContainerProps) {
  const dispatch = useAppDispatch();
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState(false);
  console.log(value);

  const onChange = () => {
    if (
      currentProductSitesCount &&
      currentProductSitesCount <= selectedCodes.length &&
      !checked
    )
      return;
    setChecked((prev) => !prev);
    !checked ? addCodeToSelect(code._id) : removeCodeFromSelect(code._id);
  };

  const onClick = () => {
    dispatch(activateCode(code));
  };

  const handleClipboard = () => {
    copy(code.code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <Wrapper status={code.status}>
      <Checkbox type="checkbox" checked={checked} onChange={onChange} />
      <Code>
        <Small>License code</Small>
        <CodeBox>
          <p>{`${code.code.slice(0, 24)}...`}</p>
          <StyledClipboard width={36} height={36} onClick={handleClipboard} />
        </CodeBox>
        {copied && <Copied>This code copied in clipboard</Copied>}
      </Code>
      <Domain>
        <Small>Domain</Small>
        <DomainBox
          status={code.status}
          disabled
          defaultValue={
            code.status === "INACTIVE"
              ? ""
              : "https://gscore-back.herokuapp.com/api/#/Subscribe/SubscribeController_getSelfSubscribe"
          }
        />
      </Domain>
      {code.status === "INACTIVE" && (
        <ActivateButton onClick={onClick}>Activate</ActivateButton>
      )}
      <Status>
        <StatusSmall>Status</StatusSmall>
        <StatusBox status={code.status}>{code.status}</StatusBox>
      </Status>
    </Wrapper>
  );
}

const Button = styled.button`
  border-radius: 4px;
  border: 0;
  padding: 20px 24px;
  color: ${Color.ORANGE};
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  width: 120px;
  height: 58px;
  margin-top: 35px;
  cursor: pointer;
  &:hover {
    background-color: ${Color.GRAY};
  }
`;

interface StatusProps {
  status: string;
}

const ActivateButton = styled(Button)`
  @media (max-width: 768px) {
    grid-area: c;
  }
`;

const StatusBox = styled.div<StatusProps>`
  height: 68px;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: ${(props) => {
    if (props.status === "ACTIVE") return Color.GREEN;
    if (props.status === "HOLD") return Color.LIGHTORANGE;
    if (props.status === "INACTIVE") return Color.GREEN;
  }};
  justify-self: center;
  line-height: 77px;
`;

const Copied = styled.div`
  background-color: gray;
  border: 1px solid black;
  font-size: 14px;
  position: absolute;
  left: 350px;
  @media (max-width: 400px) {
    left: 163px;
  }
`;

const Small = styled.small`
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: ${Color.GRAY};
`;

const DomainBox = styled.input<StatusProps>`
  margin-top: 10px;
  padding: 0 5%;
  background-color: ${Color.DARKGRAY};
  border-radius: 6px;
  height: 68px;
  color: ${Color.GRAY};
  border: 0;
  @media (max-width: 1178px) {
    width: auto;
  }
`;

const CodeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border-radius: 6px;
  height: 68px;
  width: 300px;
  color: ${Color.GRAY};
  background-color: ${Color.DARKGRAY};
  border: 0;
  padding: 0 20px;
  @media (max-width: 914px) {
    width: auto;
  }
`;

const StyledClipboard = styled(Clipboard)`
  cursor: pointer;
  border: 0;
  &:hover {
    opacity: 0.5;
  }
`;

const Code = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    grid-area: d;
  }
`;

const Domain = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    grid-area: e;
  }
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8%;
  @media (max-width: 768px) {
    grid-area: b;
  }
`;

const StatusSmall = styled(Status)`
  @media (max-width: 768px) {
    display: none;
  }
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
  background-color: ${Color.BLACK};
  height: 153px;
  border-radius: 12px;
  padding: 2% 1% 5% 2%;
  @media (max-width: 768px) {
    height: auto;
    grid-template-areas:
      "a b f c"
      "d d d d"
      "e e e e";
    padding: 20px;
    row-gap: 20px;
  }
`;

const Checkbox = styled.input`
  border-radius: 50%;
  background-color: #c7c7c7;
  width: 28px;
  height: 28px;
  &:checked {
    background-color: ${Color.RED};
  }
  @media (max-width: 768px) {
    grid-area: a;
  }
`;
