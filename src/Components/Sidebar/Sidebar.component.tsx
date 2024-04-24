import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MessageIcon from '@mui/icons-material/Message';
import BusinessIcon from '@mui/icons-material/Business';
import MenuIcon from '@mui/icons-material/Menu';

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const SidebarContainer = styled.div<{ open?: boolean }>`
  position: fixed;
  // top: 50px;
  left:0;
  width:165px;
  height: 100%;
  background-color: #4F734C;
  transition: left 0.3s ease-in-out;
  z-index: 999;

  @media (max-width: 768px) {
    left: 0;
    width: 50px;
  }
`;

// const SidebarToggle = styled.div<{ open: boolean }>`
//   padding: 10px;
//   color: black;
//   cursor: pointer;
//   font-size: 20px;
//   font-weight: 600;
//   display: flex;
//   justify-content: flex-start;
//   gap:10px;
//   &:hover {
//     background-color: #73b9cf;
//   }
// `;

const SidebarLinks = styled.ul`
  list-style: none;
  padding: 0;
      display: flex;
    flex-direction: column;
    row-gap: 35px;
`;

const SidebarLink = styled.li`
  padding: 10px;
  color: white;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  display: flex;
    align-items: center;
    gap:10px;
    &:hover {
      background-color: #50a164;
     }
`;

SidebarContainer.defaultProps = {
  open: false,
};


  

const Sidebar: FC<SidebarProps> = ({ open, toggleSidebar }: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const navigate = useNavigate();

  const goToHome = () => navigate('/home');
  const goToCalendar = () => navigate('/calendar');
  const goToMessages = () => navigate('/messagepage');
  const goToApartments = () => navigate('/apartmentpage');

  return (
    <SidebarContainer open={isMobile ? false : open}>
      {/* {!isMobile && (
        // <SidebarToggle open={open} onClick={toggleSidebar}>
        //   <MenuIcon /> {open ? 'Close Menu' : null}
        // </SidebarToggle>
      )} */}
      <SidebarLinks>
        <SidebarLink onClick={goToHome}>
          <HomeIcon /> Homepage
        </SidebarLink>
        <SidebarLink onClick={goToCalendar}>
          <CalendarMonthIcon /> Calendar
        </SidebarLink>
        <SidebarLink onClick={goToMessages}>
          <MessageIcon /> Messages
        </SidebarLink>
        <SidebarLink onClick={goToApartments}>
          <BusinessIcon /> Properties
        </SidebarLink>
      </SidebarLinks>
    </SidebarContainer>
  );
};

export default Sidebar;

