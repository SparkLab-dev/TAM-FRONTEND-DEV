import { FC, useState } from "react";

import { Button, StyledForm } from "App/style/App.style";
import { Input } from "App/style/App.style";
import { LoginButtonHolder } from "Pages/Login/style/Login.style";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Paragraph = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 25px;
  color: white;
`;
const Label = styled.label`
  font-style: normal;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  color: white;
`;

const Alloggiati: FC<{}> = () => {
  const userSelector = (state: RootState) => state.auth.user;

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [wsKey, setWsKey] = useState<string>("");
  const user = useSelector(userSelector);
  const userId = user?.id;
  console.log(userId);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData = {
      username: username,
      password: password,
      wsKey: wsKey,
      user: {
        id: userId,
      },
    };
    console.log(postData);
    try {
      const response = await axios.post(
        "http://192.168.10.210:8080/TAM/allogatiWeb/saveHostAlloggiatiWebCredentials",
        postData
      );
      console.log("POST request successful:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("POST request error:", error);
    }
  };

  return (
    <div>
      <div>
        <StyledForm height="430px">
          <Paragraph>Alloggiati Web</Paragraph>
          <Label>Username</Label>
          <Input
            placeholder="Username"
            type="text"
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
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          ></Input>
          <Label>Password</Label>
          <Input
            placeholder="Password"
            type="password"
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
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          ></Input>
          <Label>Web Service key</Label>
          <Input
            placeholder="Web Service key"
            type="text"
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
            value={wsKey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWsKey(e.target.value)
            }
          ></Input>

          <LoginButtonHolder>
            <Button
              h="40px"
              w="100%"
              variant="primary"
              onClick={handleSubmit}
              borderradius="20px"
              fontSize="17px"
            >
              Submit
            </Button>
          </LoginButtonHolder>
        </StyledForm>
      </div>
    </div>
  );
};

export default Alloggiati;
