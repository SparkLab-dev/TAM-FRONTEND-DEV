import { FC, useEffect, useState } from "react";

//style
import {
  ButtonContainer,
  Label,
  LabelSpan,
  LoginLink,
  RegisterParagraph,
  RegisterDontHaveAccountHold,
  RegParagraph,
} from "./style/Register.style";
import { Button, Input, StyledForm, StyledSelect } from "App/style/App.style";

//axios
import axios from "axios";

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { registerUser } from "redux/Auth/Register/RegisterSlice";

interface DropdownItem {
  id: string;
  name?: string;
}

const Register: FC<{}> = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [roles, setRoles] = useState<DropdownItem[]>([]);

  //email validation
  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const dispatch: AppDispatch = useDispatch();

  const userCredentials = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    role: {
      id: selectedRole || 0,
    },
  };

  //user role api call
  useEffect(() => {
    axios
      .get<DropdownItem[]>("http://192.168.10.141:8080/TAM/role")
      .then((res) => {
        setRoles(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log("error is", err));
  }, []);

  const handleRegisterClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (selectedRole === null || firstName === "" || lastName === "") {
      console.log("Missing required information!");
    } else if (!validateEmail(email)) {
      console.log("Invalid email format!");
    } else {
      try {
        await dispatch(registerUser(userCredentials));
        console.log("Go to check the email!");
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setRoles([]);
        // window.location.href = "login";
      } catch (error) {
        console.error("Register failed!", error);
      }
    }
  };

  return (
    <>
      <StyledForm height="fit-content">
        <RegisterParagraph>REGISTER</RegisterParagraph>
        <Label>
          FIRSTNAME<LabelSpan> * </LabelSpan>
        </Label>
        <Input
          placeholder="Firstname"
          type="text"
          fontSize="12px"
          borderbottomrightradius="20px"
          bordertoprightradius="20px"
          border="none"
          width="100%"
          height="45px"
          backgroundcolor="#FFFFFF"
          borderradius="10px"
          paddingleft="5px"
          padding="0 10px"
          margin=" 5px 0 15px 0px"
          required={true}
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
        />

        <Label>
          LASTNAME<LabelSpan> * </LabelSpan>
        </Label>
        <Input
          placeholder="Lastname"
          type="text"
          fontSize="12px"
          borderbottomrightradius="20px"
          bordertoprightradius="20px"
          border="none"
          width="100%"
          height="45px"
          backgroundcolor="#FFFFFF"
          borderradius="10px"
          paddingleft="5px"
          padding="0 10px"
          margin=" 5px 0 15px 0px"
          required={true}
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
        />
        <Label>
          EMAIL<LabelSpan> * </LabelSpan>
        </Label>
        <Input
          placeholder="Email"
          type="email"
          fontSize="12px"
          borderbottomrightradius="20px"
          bordertoprightradius="20px"
          border="none"
          width="100%"
          height="45px"
          backgroundcolor="#FFFFFF"
          borderradius="10px"
          paddingleft="5px"
          padding="0 10px"
          margin=" 5px 0 15px 0px"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />

        <Label>
          ROLE<LabelSpan> * </LabelSpan>
        </Label>
        <StyledSelect
          fontSize="12px"
          borderbottomrightradius="20px"
          bordertoprightradius="20px"
          border="none"
          width="100%"
          height="45px"
          backgroundcolor="#FFFFFF"
          borderradius="10px"
          paddingleft="5px"
          padding="0 10px"
          margin=" 5px 0 15px 0px"
          value={selectedRole !== null ? selectedRole.toString() : ""}
          onChange={(e: any) => setSelectedRole(Number(e.target.value))}
          required={true}
        >
          <option defaultValue="none">Select an Option</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </StyledSelect>
        <Label>USERNAME</Label>
        <Input
          placeholder="Username"
          type="text"
          fontSize="12px"
          borderbottomrightradius="20px"
          bordertoprightradius="20px"
          border="none"
          width="100%"
          height="45px"
          backgroundcolor="#FFFFFF"
          borderradius="10px"
          paddingleft="5px"
          padding="0 10px"
          margin=" 5px 0 15px 0px"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
        />
        <ButtonContainer>
          <Button
            h="40px"
            w="100%"
            variant="primary"
            borderradius="20px"
            fontSize="15px"
            margin="36px 0 20px 0"
            onClick={handleRegisterClick}
            disabled={
              !(
                selectedRole !== null &&
                firstName !== "" &&
                lastName !== "" &&
                email !== ""
              )
            }
          >
            SUBMIT
          </Button>
        </ButtonContainer>
        <RegisterDontHaveAccountHold>
          <RegParagraph>Already have an account?</RegParagraph>
          <LoginLink to="/login">
            <RegParagraph>Login!</RegParagraph>
          </LoginLink>
        </RegisterDontHaveAccountHold>
      </StyledForm>
    </>
  );
};
export default Register;
