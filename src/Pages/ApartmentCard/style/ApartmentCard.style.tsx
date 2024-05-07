import styled from "styled-components";
import { Link } from "react-router-dom";

export const Page = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 25px;
  padding-top: 200px;
  max-width: 1400px;
  width: calc(100% - 400px);
  margin-top: -120px;
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: calc(100% - 50px);
  }
`;

export const Holder = styled.div`
  display: flex;
  flex-direction: column;
`;
export const CardContainer = styled.div`
  height: "fit-content";
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  margin-top: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  @media (max-width: 768px) {
    width: 70%;
    max-width: 450px;
    margin-left: 55px;
  }
`;
export const DivsContentHolder = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Div = styled.div`
  flex: 1;
  display:flex;
  flex-direction:column;
  border-right:1px solid black;
  margin-top:10px;
  margin-bottom:10px;
  
`;
export const Div2 = styled.div`
  flex: 1;
  display:flex;
  flex-direction:column;
  padding-left:5px;
  margin-top:10px;
  margin-bottom:10px;
  
`;
export const ApartmentName = styled.h2`
  font-family: "Poppins";
  font-size: 30px;
  font-weight: 500px;
  text-align: center;
  margin: 0;
`;
export const Paragraphs = styled.p`
  font-family: "Poppins";
  font-size: 14px;
 
  padding-left: 2px;
`;
export const UnorderedList = styled.ul``;
export const ListItem = styled.li``;
export const Label = styled.span`
  font-weight: bold;
`;
export const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  color: #49518f;
`;

// export const IconHold = styled.div`
//   padding: 10px;
// `;

export const IconHold = styled.div`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4f734c;
  color: black;

  &:hover {
    background-color: #50a164;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const RentLink = styled(Link)`
  color: white;

  font-family: roboto;
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
 
  
`;
