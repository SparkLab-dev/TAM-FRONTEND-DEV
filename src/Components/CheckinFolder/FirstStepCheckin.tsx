import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import CallIcon from "@mui/icons-material/Call";

import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const FirstStepStyledWrapper = styled(Box)`
  background: white;
  height: 300px;
  width: 450px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: skyblue;
  border-radius: 23px;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Title = styled.text`
  font-size: 30px;
  color: black;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  margin: 30px 15px;
  row-gap: 15px;
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 15px;
`;

const Button = styled.button`
  width: 200px;
  height: 45px;
  background: #4f734c;
  border: 1px;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  color: white;
  font-weight: 700;
  padding: 6px, 6px, 6px, 8px;
`;
const Label = styled.text`
  font-weight: 500;
  color: black;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
`;
const ErrorMessage = styled.div`
  color: red;
`;

const FirstCheckinForm: React.FC = () => {
  const [number, setNumber] = useState<string>(""); // For number of guests
  const [apartmentId, setApartmentId] = useState<string>("2335578"); // Apartment ID (hardcoded for now)
  const [smoobuId, setSmoobuId] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [checkinSuccess, setCheckinSuccess] = useState<boolean>(false); // To track if check-in was successful
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Make API call using Axios to submit number of guests
      const response = await axios.post(`http://192.168.10.210:8080/TAM/checkin/numberOfGuestsCheck/2379138/${number}`);

      if (response.status === 200) {
        setCheckinSuccess(true); // Set success state
        setSuccessMessage(`Check-in initiated successfully for ${number} guests.`);
        setErrorMessage(""); // Clear any error messages
        setSmoobuId(response.data[0]);
        localStorage.setItem("numberOfGuests", number);
        localStorage.setItem("checkinSmoobuId", smoobuId);
        console.log(response.data[0]);
        navigate("/steptwo");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      // Check if error is an AxiosError and contains a response
      if (axios.isAxiosError(error) && error.response) {
        const serverErrorMessage = error.response.data.errorMessage || "An unexpected error occurred.";
        setErrorMessage(serverErrorMessage);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000); // Display the error message from the server
      } else {
        setErrorMessage("Failed to submit the check-in. Please try again."); // Default fallback error message
      }
      setCheckinSuccess(false);
    }
  };

  return (
    <>
      <FirstStepStyledWrapper>
        <Title>First Step Check-in</Title>
        <InputBox>
          <Label>How many guests are joining this apartment?</Label>
          <StyledTextField
            type="number"
            placeholder="Number of guests"
            value={number}
            onChange={handleNumberChange}
            required
          />
        </InputBox>
        <div
          style={{
            display: "flex",
            width: "500px",
            justifyContent: "space-evenly",
          }}
        >
          <Button onClick={handleSubmit}>Next</Button>
        </div>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </FirstStepStyledWrapper>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
};

export default FirstCheckinForm;
