import styled from "styled-components";
export const Container = styled.div`
  height: 100%;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: flex-start;
  gap: 85px;
  @media (max-width: 1268px) {
    flex-direction: column;
    align-items: center;
    margin-top:450px;
    
  }
`;
export const ApartmentImg = styled.img`
  width: 300px;
  height: 245px;
`;
export const ApartmentNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const HeartIcon = styled.p`
  margin-right: 10px;
`;
export const ApartmentContentHolder = styled.div`
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.15);
  width: 300px; 
  height: 300px; /* Height matches the photo height */
  margin: 15px;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
  @media (max-width: 768px) {
    // width: calc(100% - 30px); 
    height: auto; 
    display: flex; 
    flex-direction: column;
  }
`;
export const Icon = styled.div`
font-size: larger; */
width: 325px;
height: 245px;
`;
export const ApartmentNameParagraph = styled.p`
  /* text-align: center; */
  flex: 1;
  font-size: 14.5px;
  margin-left: 10px;
  /* word-wrap: break-word; */
  color: #000000;
  font-weight: 400;
  font-family: "Roboto";
  line-height: 30px;
  letter-spacing: 0.15px;
`;
export const ErrorMessage = styled.p`
  color: #b42828;
  font-family: "Poppins";
  font-size: 17px;
  text-align: center;
`;
