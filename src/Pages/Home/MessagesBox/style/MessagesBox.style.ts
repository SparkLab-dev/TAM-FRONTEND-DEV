import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-basis: 40%;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  gap: 20px;
`;

export const GetNewMessagesText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OpenMessagesButton = styled.button`
  display: inline-flex;

  box-shadow: unset;
  background: #4f734c;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 10px 20px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: #e3edf0;
  }
`;
