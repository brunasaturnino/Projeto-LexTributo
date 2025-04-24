import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fefefe;
`;

export const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const Title = styled.h1`
  color: red;
  margin-bottom: 1.5rem;
`;

export const Input = styled.input`
  width: 80%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 1px solid #aaa;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-bottom: 1px solid #f9a006;
  }
`;

export const Register = styled.p`
  font-size: 0.9rem;
  margin-top: 1.5rem;
  color: black;
  font-weight: bold;

    span {
    color: red;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const TogglePassword = styled.button`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: black;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color:  red;
  font-weight: bold;
  font-size: 0.8rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  text-align: left;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;


