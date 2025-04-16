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
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: #e60000;
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
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

export const SortButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
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
  background: none;
  border: none;
  color: #e60000;
  font-size: 1.8rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
`;

export const InfoRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const Label = styled.span`
  font-weight: 600;
  width: 120px;
  color: #444;
`;

export const Value = styled.span`
  color: #222;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
`;

export const Input = styled.input`
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

export const CardWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
`;

export const TableHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
