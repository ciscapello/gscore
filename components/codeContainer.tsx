import styled from "styled-components";

export default function CodeContainer() {
  return (
    <div>
      <Checkbox type="checkbox" />
    </div>
  );
}

const Checkbox = styled.input`
  border-radius: 50%;
  background-color: #c7c7c7;
  width: 28px;
  height: 28px;
`;
