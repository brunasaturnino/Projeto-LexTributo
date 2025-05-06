import React from "react";
import styled, { css } from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "filled" | "outlined" | "chips";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const StyledButton = styled.button<{ variant: string; disabled?: boolean }>`
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 0 16px;
  border: none;
  cursor: pointer;
  width: 100%;

  /* estilos para botão desabilitado */
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}

  /* variantes */
  ${({ variant }) =>
    variant === "filled" &&
    css`
      background-color: #f9a006;
      color: white;
    `}

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      background-color: transparent;
      color: #f9a006;
      border: 2px solid #f9a006;
    `}

  ${({ variant }) =>
    variant === "chips" &&
    css`
      background-color: rgba(249, 160, 6, 0.1);
      color: #f9a006;
    `}
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "filled",
  disabled = false,
  type = "button",
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </StyledButton>
  );
};