import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import { Subtitle, Button as OldButton } from "../../styles";

export default function NoSubscriptions() {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };
  return (
    <Wrapper>
      <Round>
        <Image
          src={"/icons/Close.png"}
          height={"24"}
          width={"24"}
          alt={"cross"}
        />
      </Round>
      <Subtitle>No active subscriptions</Subtitle>
      <Text>You can subscribe right now by clicking on the button below</Text>
      <Button onClick={onClick}>Get Gscore</Button>
    </Wrapper>
  );
}

const Button = styled(OldButton)`
  max-width: 10%;
`;

const Text = styled.p`
  max-width: 300px;
  text-align: center;
  line-height: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  jusify-content: space-between;
  align-items: center;
`;

const Round = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 96px;
  height: 96px;
  background-color: #393939;
`;
