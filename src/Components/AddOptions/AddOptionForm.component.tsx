import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledWrapper = styled(Box)`
  background: white;
  width: 30%;
  max-width: 450px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: skyblue;
  border-radius: 23px;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.text`
  font-size: 30px;
  color: black;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  margin: 30px 0;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

export const Button = styled.button`
  width: 250px;
  height: 45px;
  background: #4f734c;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  color: black;
  font-weight: 700;
`;

const AddOptionForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const requestBody = {
        description: description,
        apartmentOptionCategory: {
          id: 14,
        },
      };
      await axios.post(
        "http://192.168.10.153:8080/TAM/apartmentOption/saveOrUpdateApartmentOption",
        requestBody
      );
      console.log("POST request successful");
      setDescription("");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add an option</Button>
      <StyledModal open={open} onClose={() => setOpen(false)}>
        <StyledWrapper>
          <Title>Add an option</Title>
          <InputBox>
            <StyledTextField
              type="text"
              placeholder="Type here"
              value={description}
              onChange={handleChange}
              required
            />
          </InputBox>
          <Button onClick={handleSubmit}>Add</Button>
        </StyledWrapper>
      </StyledModal>
    </>
  );
};

export default AddOptionForm;
