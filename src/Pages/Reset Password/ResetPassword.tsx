import { FC, useState } from "react";
// style

import { Input } from "App/style/App.style";
import { Button } from "App/style/App.style";
import { StyledForm } from "App/style/App.style";
import axios from "axios";
import { useNavigate } from "react-router";
import { InputGroup } from "App/style/App.style";
import { ToggleButton } from "App/style/App.style";
import { ResetPassButtonHolder, ResetPassLabel, Warning } from "./style/ResetPassword.style";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginParagraph } from "Pages/Login/style/Login.style";

const ResetPassword: FC<{}> = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);

    const currentUrl = window.location.href;

    try {
      const url = new URL(currentUrl);

      const pathnameParts = url.pathname.split("/");
      const token = pathnameParts[pathnameParts.length - 1];

      console.log("Token:", token);
      console.log(``);
      const requestData = {
        password: newPassword,
      };
      console.log(requestData);

      axios
        .put(`http://192.168.10.210:8080/TAM/resetPassword/${token}`, requestData)
        .then((response) => {
          console.log("PUT request successful:", response.data);
          navigate("/login");
        })
        .catch((error) => {
          console.log("PUT request error:", error);
        });
    } catch (error) {
      console.error("Error extracting token:", error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state when the button is clicked
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle the state when the button is clicked
  };
  return (
    <>
      <StyledForm height="fit-content" onSubmit={handleSubmit}>
        <LoginParagraph>Reset Password!</LoginParagraph>
        <ResetPassLabel>NEW PASSWORD</ResetPassLabel>

        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
            placeholder="Password"
            fontSize="12px"
            borderbottomrightradius="20px"
            bordertoprightradius="20px"
            border="none"
            width="100%"
            height="40px"
            backgroundcolor="#FFFFFF"
            borderradius="10px"
            paddingleft="5px"
            padding="0 10px"
            margin=" 5px 0 15px 0px"
          />
          <ToggleButton type="button" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </ToggleButton>
        </InputGroup>
        <ResetPassLabel>CONFIRM PASSWORD</ResetPassLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            placeholder="Password"
            fontSize="12px"
            borderbottomrightradius="20px"
            bordertoprightradius="20px"
            border="none"
            width="100%"
            height="40px"
            backgroundcolor="#FFFFFF"
            borderradius="10px"
            paddingleft="5px"
            padding="0 10px"
            margin=" 5px 0 15px 0px"
          />
          <ToggleButton type="button" onClick={toggleConfirmPasswordVisibility}>
            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
          </ToggleButton>
        </InputGroup>
        {!passwordsMatch && <Warning>Passwords do not match. Please try again!</Warning>}
        <ResetPassButtonHolder>
          <Button h="40px" w="100%" variant="primary" borderradius="20px" fontSize="18px">
            Submit
          </Button>
        </ResetPassButtonHolder>
      </StyledForm>
    </>
  );
};

export default ResetPassword;
