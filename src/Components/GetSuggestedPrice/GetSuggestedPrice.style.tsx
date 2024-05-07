import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  border: solid 1px black;
  padding: 15px;
  border-radius: 15px;
  background-color: #4f734c;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 300px;
`;

export const ButtonHolder = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: white;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #88a8b3;
  }
`;
