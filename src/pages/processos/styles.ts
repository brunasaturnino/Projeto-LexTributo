import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  background-color: #f2f2f2;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: #e60000;
`;

export const SearchInput = styled.input`
  padding: 0.6rem 0.6rem 0.6rem 2.2rem;
  border: none;
  border-radius: 8px;
  background-color: #efefef;
  width: 100%;
  font-size: 1rem;
  outline: none;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0 0.8rem;
  background-color: white;
  border-radius: 12px;
  padding: 1rem;

  th {
    padding: 1rem;
    text-align: left;
    color: #333;
  }

  td {
    padding: 1rem;
    border-top: 1px solid #eee;
  }
`;

export const ActionIcon = styled.button<{ gray?: boolean }>`
  background: none;
  border: none;
  color: ${({ gray }) => (gray ? "#666" : "#e60000")};
  font-size: 1.2rem;
  margin-left: 0.8rem;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const AddButton = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: #e60000;
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;
