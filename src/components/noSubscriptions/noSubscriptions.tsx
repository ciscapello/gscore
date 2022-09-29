import styled from "styled-components";
import { useRouter } from "next/router";
import { Button } from "../../components";
import { Color } from "../../styles";
import { Close } from "../../shared/assets/svgs";

export default function NoSubscriptions() {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };
  return (
    <Wrapper>
      <Round>
        <Close />
      </Round>
      <Subtitle>No active subscriptions</Subtitle>
      <Text>You can subscribe right now by clicking on the button below</Text>
      <Button small onClick={onClick}>
        Get Gscore
      </Button>
    </Wrapper>
  );
}

const Text = styled.p`
  max-width: 300px;
  text-align: center;
  line-height: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Round = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 96px;
  height: 96px;
  background-color: ${Color.DARKGRAY};
`;

const Subtitle = styled.h3`
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
`;
