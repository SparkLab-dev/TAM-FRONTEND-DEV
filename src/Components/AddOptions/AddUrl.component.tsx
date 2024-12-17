import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useTranslation } from "react-i18next";

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

const Button = styled.button`
  width: 250px;
  height: 45px;
  background: #4f734c;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 18px;
  color: white;
  font-family: roboto;
  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const AddUrl: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const { t } = useTranslation();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const requestBody = {
        optionName: name,
        link: url,
        apartmentId: 2028236,
      };
      await axios.post(
        "http://192.168.10.210:8080/TAM/specificApartmentOption/saveOrUpdateSpecificApartmentOption",
        requestBody,
      );
      console.log("POST request successful");
      setName("");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => setOpen(true)}>
          {t("addavideo")} <AddCircleOutlinedIcon />{" "}
        </Button>
      </div>
      <StyledModal open={open} onClose={() => setOpen(false)}>
        <StyledWrapper>
          <Title>{t("addavideourl")}</Title>
          <InputBox>
            <StyledTextField
              type="text"
              placeholder={t("videotitle")}
              value={name}
              onChange={handleNameChange}
              required
            />
          </InputBox>
          <InputBox>
            <StyledTextField type="url" placeholder={t("videourl")} value={url} onChange={handleUrlChange} required />
          </InputBox>
          <Button onClick={handleSubmit}>{t("add")}</Button>
        </StyledWrapper>
      </StyledModal>
    </>
  );
};

export default AddUrl;
