import { Link } from "react-router-dom";
import styled from "styled-components";
export const RegisterParagraph = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 25px;
  color: #525b99;
`;
export const Label = styled.label`
  font-style: normal;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  color: #171616;
`;

export const ButtonContainer = styled.div`
  margin: auto;
  width: 100%;
  max-width: 180px;
`;

export const LabelSpan = styled.span`
  color: red;
  font-family: "Poppins";
  font-size: 17px;
`;
export const RegisterDontHaveAccountHold = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;
export const RegParagraph = styled.p`
  /* padding: 0px 5px; */
  font-size: 15px;
  margin: 0;
`;

export const LoginLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 15px;
`;
export const LoginPageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const FormContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormHeader = styled.h2`
  margin-bottom: 20px;
  height: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 404px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const RegLabel = styled.label`
  margin-bottom: 5px;
`;

export const FormInput = styled.input`
  padding: 10px;
  width: 95%;
  border: 1px solid #ccc;
  border-radius: 5px;
  :focus {
    outline: none;
    border-color: #4a90e2;
    background-color: #f0f8ff;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px;
  background-color: #4f734c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
  width: 404px;
`;
export const GoogleButton = styled.button`
  padding: 10px;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 35px;
`;
export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 23px;
  margin-top: 50px;
  width: 100%;
`;
export const ImageContainer = styled.div`
  width: 50%;
`;

export const Image = styled.img`
  width: 100%;
  max-height: 100vh;
  object-fit: cover;
  border-radius: 50px 0 0 50px;
`;

export const RememberLine = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const RememberCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 5px;
`;

export const RememberText = styled.span`
  margin-right: 10px;
`;