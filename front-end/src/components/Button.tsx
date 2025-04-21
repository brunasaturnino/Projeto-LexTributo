import styled, { css } from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "filled" | "outlined" | "chips";
}

const StyledButton = styled.button<{ variant: string }>`
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 0 16px;
  border: none;
  cursor: pointer;
  width: 100%; /* ocupa toda a largura do container */


  ${({ variant }) => variant === "filled" && css`
    background-color: #f9a006;
    color: white;
  `}

`;

export const Button = ({ children, onClick, variant = "filled" }: ButtonProps) => {
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
