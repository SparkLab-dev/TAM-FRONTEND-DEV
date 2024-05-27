import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import CallIcon from "@mui/icons-material/Call";

import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

const StyledWrapper = styled(Box)`
  background: white;
  height: 700px;
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
const CallButton = styled.button`
  width: 200px;
  height: 45px;
  background: #4f734c;
  border: none;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
`;
const ErrorMessage = styled.div`
  color: red;
`;

const CheckinFormOnline: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [identifierDocumentId, setIdentifierDocumentId] = useState<string>("");
  const [identifierDocumentExpiry, setIdentifierDocumentExpiry] =
    useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [checkinSuccess, setCheckinSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };
  const handlePassportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifierDocumentId(event.target.value);
  };
  const handleExpirydateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIdentifierDocumentExpiry(event.target.value);
  };
  const handleBirthdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(event.target.value);
  };
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const apartmentId = localStorage.getItem("apartmentIdCheckin") || "";
  const reservationId = localStorage.getItem("reservationIdCheckin") || "";
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("surname", surname);
      formData.append("identifierDocumentId", identifierDocumentId);
      formData.append("identifierDocumentExpiry", identifierDocumentExpiry);
      formData.append("birthDate", birthday);
      formData.append("apartmentId", apartmentId);
      formData.append("reservation.smoobuId", reservationId);
      if (photo) {
        formData.append("documents", photo);
      }
      await axios.post(
        "http://192.168.10.153:8080/TAM/checkin/saveTotemCheckin",
        formData
      );
      console.log("POST request successful");
      setSuccessMessage("Form submitted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setName("");
      setSurname("");
      setIdentifierDocumentExpiry("");
      setIdentifierDocumentId("");
      setBirthday("");
      setPhoto(null);
      setCheckinSuccess(true);
      // window.location.reload();
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const call = async () => {
    if (!checkinSuccess) {
      setErrorMessage("Please complete the check-in process first.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    try {
      const requestBody = {
        apartmentId: 2112479 ,
        checkInId: 12,
      };
      const response = await axios.post(
        "http://192.168.10.153:8080/TAM/meeting/generateTotemJitsiMeetLink",
        requestBody
      );
      console.log("API Success");
      const checkinurl = response.data;
      window.location.href = checkinurl;
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <>
      <StyledWrapper>
        <Title>Check-in</Title>
        <InputBox>
          <Label>Name</Label>
          <StyledTextField
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <Label>Surname</Label>
          <StyledTextField
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={handleSurnameChange}
            required
          />
          <Label>Birthday</Label>
          <StyledTextField
            type="date"
            placeholder="Birthday"
            value={birthday}
            onChange={handleBirthdayChange}
            required
          />
          <Label>Passport Number</Label>
          <StyledTextField
            type="text"
            placeholder="ID/Passport Number"
            value={identifierDocumentId}
            onChange={handlePassportChange}
            required
          />
          <Label>Passport expiry date</Label>
          <StyledTextField
            type="date"
            placeholder="Expiry Date"
            value={identifierDocumentExpiry}
            onChange={handleExpirydateChange}
            required
          />
          <Label>Passport photo</Label>
          <StyledTextField type="file" onChange={handlePhotoChange} required />
        </InputBox>
        <div
          style={{
            display: "flex",
            width: "500px",
            justifyContent: "space-evenly",
          }}
        >
          <Button onClick={handleSubmit}>Check-in</Button>
          <CallButton onClick={call}>
            <CallIcon /> Call the host
          </CallButton>
        </div>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </StyledWrapper>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
};

export default CheckinFormOnline;
