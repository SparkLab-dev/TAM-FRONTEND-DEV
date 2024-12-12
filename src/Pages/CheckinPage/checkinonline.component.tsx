import React, { useEffect } from "react";
import ChatComponent2 from "Components/OpenAIAssistant/AdminAssistant.componet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";

const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${require("../../background.png")}); /* Adjust the path to your image */
  background-size: cover;
  background-position: center;
  gap: 80px;
`;

const ButtonHolder = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  border: none;
  border-radius: 6px;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 150px;
  width: 250px;
  &:hover {
    background-color: #e3edf0;
  }
  @media (max-width: 750px) {
    width: 120px;
    height: 65px;
    margin-right: 200px;
  }
`;

const Icon = styled(TaskAltIcon)`
  margin-top: 15px;
`;
const Icon2 = styled(QuizOutlinedIcon)`
  margin-top: 15px;
`;
const Icon3 = styled(ChecklistOutlinedIcon)`
  margin-top: 15px;
`;
const OnlineCheckin: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const checkin = url.pathname.split("/");
    const apartmentId = checkin[checkin.length - 2]; 
    const reservationId = checkin[checkin.length - 1]; 
  
    
    localStorage.setItem('apartmentIdCheckin', apartmentId);
    localStorage.setItem('reservationIdCheckin', reservationId);
  }, []);


  const goToAmenities = () => navigate("/apartmentAmenities");
  const goToRulesFAQ = () => navigate("/rulesFAQ");
  const goToCheckin = () => navigate("/onlinecheckinpage");

  return (
    <PageContainer>
      <ButtonHolder>
        <ChatComponent2 />
        <Button onClick={goToCheckin}>
          Check-in
          <Icon fontSize="large" />
        </Button>
        {/* </ButtonHolder>

      <ButtonHolder> */}
        <Button onClick={goToRulesFAQ}>
          Rules / FAQ <Icon2 fontSize="large" />
        </Button>
        <Button onClick={goToAmenities}>
          Amenities <Icon3 fontSize="large" />{" "}
        </Button>
      </ButtonHolder>
    </PageContainer>
  );
};

export default OnlineCheckin;
