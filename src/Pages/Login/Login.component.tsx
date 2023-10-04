import { FC,useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "redux/authSlicer";
// style

import { Input } from "App/style/App.style";
import { Button } from "App/style/App.style";
import { StyledForm } from "App/style/App.style";
import { AppDispatch } from "redux/store"; 

const Login: FC<{}> = () => {


  const [email,setEmail] = useState<string>(""); 
  const [password,setPassword] = useState<string>(""); 
  
  const dispatch: AppDispatch = useDispatch();
  


  const handleLoginClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const userCredentials = {
      email: email || "",
      password: password || "",
    };

    try {
      await dispatch(loginUser(userCredentials));
      console.log("Sukses");
    } catch (error) {
      console.log("Not sukses")
      console.error("Login failed:", error);
    }
  };


  return (
    <>
      <StyledForm  height="280px">
        <h1>Login Here!</h1>
        <Input
          placeholder="Username"
          type="text"
          fontFamily="sanf-serif"
          fontSize="12px"
          fontWeight="700"
          borderbottomrightradius="20px"
          bordertoprightradius="20px"
          border="1px solid black"
          width="100%"
          height="40px"
          backgroundcolor="#FFFFFF"
          borderradius="10px"
          paddingleft="5px"
          padding="0 10px"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
    
        ></Input>
        <Input
          placeholder="Password"
          type="password"
          fontFamily="sanf-serif"
          fontSize="12px"
          fontWeight="700"
          borderbottomrightradius="20px"
          bordertoprightradius="20px"
          border="1px solid black"
          width="100%"
          height="40px"
          backgroundcolor="#FFFFFF"
          borderradius="10px"
          paddingleft="5px"
          padding="0 10px"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)}
        ></Input>
        <Button
          h="40px"
          w="100%"
          variant="primary"
          onClick={handleLoginClick}
          borderRadius="5px"
          fontFamily="Poppins"
          fontSize="17px"
         
        >
          Submit
        </Button>
      </StyledForm>
    </>
  );
};

export default Login;
