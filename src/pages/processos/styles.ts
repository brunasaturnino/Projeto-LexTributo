import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 1rem;
    border: 1px solid #ccc;
    text-align: left;
  }

  th {
    background-color: #f3f3f3;
  }
`;

// Tipos de variação para botão
type ButtonVariant = "primary" | "danger" | "success";

// Botão com prop segura (transient prop)
export const ActionButton = styled.button<{ $variant?: ButtonVariant }>`
  margin-right: 0.5rem;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  background-color: ${({ $variant }) => {
    switch ($variant) {
      case "danger":
        return "#e00";
      case "success":
        return "#2ecc71";
      default:
        return "#0070f3";
    }
  }};

  &:hover {
    background-color: ${({ $variant }) => {
      switch ($variant) {
        case "danger":
          return "#c00";
        case "success":
          return "#27ae60";
        default:
          return "#0059c1";
      }
    }};
  }
`;
