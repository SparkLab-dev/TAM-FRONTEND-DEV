import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import photo from "../../login.jpg";
import { useNavigate } from "react-router-dom";



// Resetting margin and padding for the body and html elements
const GlobalStyles = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden; /* Prevent scrolling */
  }
`;

const LoginPageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const FormContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormHeader = styled.h2`
  margin-bottom: 20px;
  height: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 404px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  padding: 10px;
  width: 95%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #4f734c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
  width: 404px;
`;
const GoogleButton = styled.button`
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
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 23px;
  margin-top: 50px;
  width: 100%;
`;
const ImageContainer = styled.div`
  width: 50%;
`;

const Image = styled.img`
  width: 100%;
  max-height: 100vh;
  object-fit: cover;
  border-radius: 50px 0 0 50px;
`;

const RememberLine = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const RememberCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 5px;
`;

const RememberText = styled.span`
  margin-right: 10px;
`;
const RegisterPage: React.FC = () => {

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    

    // const dispatch: AppDispatch = useDispatch();
    // const handleLoginClick = async (
    //     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    //   ) => {
    //     e.preventDefault();
    
    //     const userCredentials = {
    //       email: email || "",
    //       password: password || "",
    //     };
    
    //     console.log(typeof userCredentials);
    //     await dispatch(loginUser(userCredentials));
    //   }

  return (
    <>
      <GlobalStyles />
      <LoginPageContainer>
        <FormContainer>
          <div>
            <FormHeader>Welcome!</FormHeader>
            <h4 style={{ marginBottom: "60px" }}>
              Complete the registration form!
            </h4>
            <Form>
              <FormGroup>
                <Label>Name</Label>
                <FormInput type="text" placeholder="Name" value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          } />
              </FormGroup>
              <FormGroup>
                <Label>Surname</Label>
                <FormInput type="text" placeholder="Surname" value={surname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSurname(e.target.value)
          } />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <FormInput type="text" placeholder="Email" value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          } />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <FormInput type="password" placeholder="Password"  value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }/>
              </FormGroup>
              <FormGroup>
                <Label>Phone number</Label>
                <FormInput type="tel" placeholder="Phone number"  value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value)
            }/>
              </FormGroup>
              
             
              <RememberLine>
                <RememberCheckbox />
                <RememberText>Remember me</RememberText>
              </RememberLine>
              <SubmitButton >Register</SubmitButton>
            </Form>

            {/* <Buttons>
              <GoogleButton>
                <GoogleIcon /> Sign in with Google
              </GoogleButton>
              <GoogleButton>
                <AppleIcon /> Sign in with Apple
              </GoogleButton>
            </Buttons> */}
            <h4 style={{ display: "flex", justifyContent: "center" }}>
              Already have an account?    <a href="/login">Sign in</a>
            </h4>
          </div>
        </FormContainer>
        <ImageContainer>
          <Image src={photo} alt="Login Image" />
        </ImageContainer>
      </LoginPageContainer>
    </>
  );
};

export default RegisterPage;
