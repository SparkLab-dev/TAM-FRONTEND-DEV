// import React, { FC, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import HomeIcon from '@mui/icons-material/Home';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import MessageIcon from '@mui/icons-material/Message';
// import BusinessIcon from '@mui/icons-material/Business';
// // import MenuIcon from '@mui/icons-material/Menu';
// import DashboardIcon from '@mui/icons-material/Dashboard';

// interface SidebarProps {
//   open: boolean;
//   toggleSidebar: () => void;
// }

// const SidebarContainer = styled.div<{ open?: boolean }>`
//   position: fixed;
//   // top: 50px;
//   left:0;
//   width:185px;
//   height: 100%;
//   background-color: #4F734C;
//   transition: left 0.3s ease-in-out;
//   z-index: 999;

//   @media (max-width: 768px) {
//     left: 0;
//     width: 50px;
//   }
// `;

// // const SidebarToggle = styled.div<{ open: boolean }>`
// //   padding: 10px;
// //   color: black;
// //   cursor: pointer;
// //   font-size: 20px;
// //   font-weight: 600;
// //   display: flex;
// //   justify-content: flex-start;
// //   gap:10px;
// //   &:hover {
// //     background-color: #73b9cf;
// //   }
// // `;

// const SidebarLinks = styled.ul`
//   list-style: none;
//   padding: 0;
  
//       display: flex;
//     flex-direction: column;
//     row-gap: 35px;
// `;

// const SidebarLink = styled.li`
//   padding: 10px;
//   color: white;
//   cursor: pointer;
//   font-size: 15px;
//   font-family:poppins;
//   font-weight: 400;
//   display: flex;
//     align-items: center;
//     gap:10px;
//     &:hover {
//       background-color: #50a164;
//      }
// `;
// const OuterDiv = styled.div`
//   width: 165px;
//   height: 50px;
  
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const InnerButton = styled.div`
//   width: 100px;
//   height: 30px;
//   background-color: white;
//   color: black;
//   text-align: center;
//   line-height: 30px;
//   border-radius: 5px;
  
// `;
// SidebarContainer.defaultProps = {
//   open: false,
// };


  

// const Sidebar: FC<SidebarProps> = ({ open, toggleSidebar }: SidebarProps) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     checkIsMobile();

//     window.addEventListener("resize", checkIsMobile);

//     return () => {
//       window.removeEventListener("resize", checkIsMobile);
//     };
//   }, []);

//   const navigate = useNavigate();

//   const goToHome = () => navigate('/home');
//   const goToCalendar = () => navigate('/calendar');
//   const goToMessages = () => navigate('/messagepage');
//   const goToApartments = () => navigate('/apartmentpage');
//   const goToWebsites = () => navigate('/websites');


//   return (
//     <SidebarContainer open={isMobile ? false : open}>
     
//       <OuterDiv>
//         <InnerButton>Logo</InnerButton>
//       </OuterDiv>
//       <SidebarLinks>
//         <SidebarLink onClick={goToHome}>
//           <HomeIcon /> Homepage
//         </SidebarLink>
//         <SidebarLink onClick={goToCalendar}>
//           <CalendarMonthIcon /> Calendar
//         </SidebarLink>
//         <SidebarLink onClick={goToMessages}>
//           <MessageIcon /> Messages 
//         </SidebarLink>
//         <SidebarLink onClick={goToApartments}>
//           <BusinessIcon /> Properties
//         </SidebarLink>
//         <SidebarLink onClick={goToWebsites} >
//           <DashboardIcon /> Website
//         </SidebarLink>
//       </SidebarLinks>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;



import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MessageIcon from '@mui/icons-material/Message';
import BusinessIcon from '@mui/icons-material/Business';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FactCheckIcon from '@mui/icons-material/FactCheck';

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  
  width: 185px;
  height: 100vh;
  background-color: #4F734C;
  z-index: 999;

  @media (max-width: 768px) {
    width: 50px;
    
  }
`;

const SidebarLinks = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
     flex-direction: column;
     row-gap: 25px;
`;

const SidebarLink = styled.li`
  padding: 10px;
  color: white;
  cursor: pointer;
  font-size: 15px;
  font-family: poppins;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: #50a164;
  }

  @media (max-width: 768px) {
    font-size: 0;
  }
`;

const SidebarIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap:10px;
`;

const OuterDiv = styled.div`
  width: 165px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width:50px;
  }
`;

const InnerButton = styled.div`
  width: 100px;
  height: 30px;
  background-color: white;
  color: black;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  @media (max-width: 768px) {
    width:40px;
  }
`;

const Sidebar: FC<SidebarProps> = ({ open, toggleSidebar }: SidebarProps) => {
  const navigate = useNavigate();

  const goToHome = () => navigate('/home');
  const goToCalendar = () => navigate('/calendar');
  const goToMessages = () => navigate('/messagepage');
  const goToApartments = () => navigate('/apartmentpage');
  const goToWebsites = () => navigate('/websites');
  const goToCheckins = () => navigate('/allcheckins');
  

  return (
    <SidebarContainer>
      <OuterDiv>
        <InnerButton>Logo</InnerButton>
      </OuterDiv>
      <SidebarLinks>
        <SidebarLink onClick={goToHome}>
          <SidebarIconWrapper>
            <HomeIcon />
            <span id="home">Homepage</span>
          </SidebarIconWrapper>
        </SidebarLink>
        <SidebarLink onClick={goToCalendar}>
          <SidebarIconWrapper>
            <CalendarMonthIcon />
            <span id="calendar">Calendar</span>
          </SidebarIconWrapper>
        </SidebarLink>
        <SidebarLink onClick={goToMessages}>
          <SidebarIconWrapper>
            <MessageIcon />
            <span id="message">Messages</span>
          </SidebarIconWrapper>
        </SidebarLink>
        <SidebarLink onClick={goToApartments}>
          <SidebarIconWrapper>
            <BusinessIcon />
            <span id="business">Properties</span>
          </SidebarIconWrapper>
        </SidebarLink>
        <SidebarLink onClick={goToWebsites}>
          <SidebarIconWrapper>
            <DashboardIcon />
            <span id="dashboard">Website</span>
          </SidebarIconWrapper>
        </SidebarLink>
        <SidebarLink onClick={goToCheckins}>
          <SidebarIconWrapper>
            <FactCheckIcon />
            <span id="checkin">Check-in</span>
          </SidebarIconWrapper>
        </SidebarLink>
      </SidebarLinks>
    </SidebarContainer>
  );
};

export default Sidebar;
