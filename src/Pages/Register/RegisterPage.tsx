import React, { useEffect, useState } from "react";
//style
import { createGlobalStyle } from "styled-components";
import photo from "../../login.jpg";
import { StyledSelect } from "App/style/App.style";
import {
  FormContainer,
  FormGroup,
  FormHeader,
  FormInput,
  Image,
  ImageContainer,
  Label,
  LoginLink,
  LoginPageContainer,
  RegisterDontHaveAccountHold,
  RegLabel,
  RegParagraph,
  SubmitButton,
} from "./style/Register.style";
//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { registerUser } from "redux/Auth/Register/RegisterSlice";
//axios
import axios from "axios";

const GlobalStyles = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden; /* Prevent scrolling */
  }
`;

interface DropdownItem {
  id: string;
  roleName?: string;
  roleDescription: string;
}
const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [roles, setRoles] = useState<DropdownItem[]>([]);

  //email validation
  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const dispatch: AppDispatch = useDispatch();

  const userCredentials = {
    firstName: name,
    lastName: surname,
    phone: phone,
    email: email,
    role: {
      id: 2,
    },
  };

  //user role api call
  useEffect(() => {
    axios
      .get<DropdownItem[]>("http://192.168.10.210:8081/TAM/role/getAllRoles")
      .then((res: any) => {
        setRoles(res.data);
        console.log(res.data);
      })
      .catch((err: any) => console.log("error is", err));
  }, []);

  const handleRegisterClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (
      selectedRole === null ||
      name === "" ||
      surname === "" ||
      phone === "" ||
      email === ""
    ) {
      console.log("Missing required information!");
    } else if (!validateEmail(email)) {
      console.log("Invalid email format!");
    } else {
      try {
        await dispatch(registerUser(userCredentials));
        console.log("Go to check the email!");
        setName("");
        setSurname("");
        setEmail("");
        setPhone("");
        setRoles([]);
        // window.location.href = "login";
      } catch (error) {
        console.error("Register failed!", error);
      }
    }
  };
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
            <FormGroup>
              <FormGroup>
                <Label>Name</Label>
                <FormInput
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Surname</Label>
                <FormInput
                  type="text"
                  placeholder="Surname"
                  value={surname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSurname(e.target.value)
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <FormInput
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </FormGroup>
              <FormGroup>
                <RegLabel>Phone number</RegLabel>
                <FormInput
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPhone(e.target.value)
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Role</Label>
                <StyledSelect
                  value={selectedRole !== null ? selectedRole.toString() : ""}
                  onChange={(e: any) => setSelectedRole(Number(e.target.value))}
                  required={true}
                >
                  <option defaultValue="none">Select an Option</option>
                  {roles.map((role) => (
                    <option
                      key={role.id}
                      value={role.id}
                      style={{ color: "black" }}
                    >
                      {role.roleName}
                    </option>
                  ))}
                </StyledSelect>
              </FormGroup>
              <SubmitButton
                onClick={handleRegisterClick}
                disabled={
                  !(
                    selectedRole !== null &&
                    name !== "" &&
                    surname !== "" &&
                    email !== "" &&
                    phone !== ""
                  )
                }
              >
                Register
              </SubmitButton>
            </FormGroup>
            <RegisterDontHaveAccountHold>
              <RegParagraph>Already have an account?</RegParagraph>
              <LoginLink to="/login">
                <RegParagraph>Sign In!</RegParagraph>
              </LoginLink>
            </RegisterDontHaveAccountHold>
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
