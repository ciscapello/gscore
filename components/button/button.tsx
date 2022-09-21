import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  small: boolean;
  activate?: boolean;
  tranparent?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  small,
  activate,
  tranparent,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      small={small}
      activate={activate}
      tranparent={tranparent}
    >
      {children}
    </StyledButton>
  );
}

interface ButtonStyledProps {
  small: boolean;
  activate?: boolean;
  tranparent?: boolean;
}

export const StyledButton = styled.button<ButtonStyledProps>`
  margin-top: 50px;
  margin-bottom: 50px;
  width: ${(props) => (props.small ? "16%" : "30%")};
  max-width: ${(props) => props.tranparent && "10%"};
  height: 68px;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  border-radius: 4px;
  border: 0;
  color: white;
  background: #fc5842;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
  @media (max-width: 768px) {
    width: 50%;
    min-width: ${(props) => props.activate && "100%"};
    background: ${(props) => props.activate && "red"};
    color: ${(props) => props.activate && "white"};
    background: ${(props) => props.tranparent && "transparent"};
    color: ${(props) => props.tranparent && "red"};
    max-width: ${(props) => props.tranparent && "30%"};
  }
`;
