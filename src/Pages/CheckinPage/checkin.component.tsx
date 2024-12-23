// import ChatComponent2 from "Components/OpenAIAssistant/AdminAssistant.componet";
// import axios from "axios";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import TaskAltIcon from '@mui/icons-material/TaskAlt';

// const PageContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background-image: url(${require('../../background.png')}); /* Adjust the path to your image */
//   background-size: cover;
//   background-position: center;
//   gap: 150px;
// `;
// const ButtonHolder = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 150px;
// `;

// const Button = styled.button`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 12px 24px;
//   font-size: 16px;
//   border: none;
//   border-radius: 6px;
//   background-color: white;
//   color: #333;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   height: 150px;
//   width: 250px;
//   &:hover {
//     background-color: #e3edf0;
//   }
//   @media (max-width: 750px) {
//     width: 120px;
//     height: 65px;
//     margin-right: 200px;
//   }
// `;
// const Icon = styled(TaskAltIcon)`
//   margin-top: 20px;
//   color:#979797;
// `;

// const GradientPage: React.FC = () => {
//   const currentURL = window.location.href;
//   const urlParts = currentURL.split("/");

//   const apartmentId = urlParts[4];
//   localStorage.setItem("bookingApartmentId", apartmentId);
//   console.log("Apartment id:", apartmentId);

//   const reservationId = urlParts[5];
//   const guestName = urlParts[6];

//   const checkIn = async () => {
//     try {
//       const requestBody = {
//         reservationId: reservationId,
//         guestName: guestName,
//       };
//       const response = await axios.post(
//         "https://109f-95-107-162-162.ngrok-free.app/TAM/meeting/generateJitsiMeetLink",
//         requestBody
//       );
//       console.log("API call successful");
//       const checkinurl = response.data;
//       window.location.href = checkinurl;
//       console.log("Response:", response.data);
//     } catch (error) {
//       console.error("Error calling API:", error);
//     }
//   };

//   const navigate = useNavigate();

//   const goToAmenities = () => navigate("/apartmentAmenities");
//   const goToRulesFAQ = () => navigate("/rulesFAQ");
//   const goToCheckin = () => navigate("/checkinpage");

//   return (
//     <PageContainer>
//       <ButtonHolder>
//         <ChatComponent2 />
//         <Button onClick={goToCheckin}>
//           <div>Check-in</div>
//           <Icon fontSize="large" />
//         </Button>
//       </ButtonHolder>

//       <ButtonHolder>
//         <Button onClick={goToRulesFAQ}>Rules / FAQ</Button>
//         <Button onClick={goToAmenities}>Amenities</Button>
//       </ButtonHolder>
//     </PageContainer>
//   );
// };

// export default GradientPage;

import React from "react";
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
const GradientPage: React.FC = () => {
  const navigate = useNavigate();

  const goToAmenities = () => navigate("/apartmentAmenities");
  const goToRulesFAQ = () => navigate("/rulesFAQ");
  const goToCheckin = () => navigate("/checkinpage");

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

export default GradientPage;
