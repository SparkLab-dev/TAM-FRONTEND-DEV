import styled from "styled-components";

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 440px;
  margin: auto;
  height: 560px;
  @media (max-width: 768px) {
    width: calc(100% - 150px); /* Reduce width by 80px on mobile */
    margin-left: 70px;
  }
`;

export const Label = styled.p`
  font-weight: bold;
`;

export const UserInfo = styled.div`
  margin-bottom: 10px;
`;

export const Button = styled.div`
  display: flex;
  color: white;
  width: 150px;
  justify-content: center;
  box-shadow: unset;
  background: #4f734c;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 5px 10px;
  text-transform: uppercase;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  &:hover {
    background-color: #50a164;
  }
`;

export const Input = styled.input`
  font-family: "Poppins";
  border: none;
  width: 90%;
  height: 40px;
  background: #ffffff;
  font-style: normal;
  font-size: 14px;
  padding: 0 10px;
  margin-top: 12px;
  display: block;
  border-radius: 10px;
  outline: none;
  box-shadow: rgb(210 213 225) 0px 0px 2em;
`;
