import React from "react";
import CheckinForm from "./CheckinForm.component";
import styled from "styled-components";

const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${require('../../background.png')});
  background-size: cover;
  background-position: center;
  z-index: -1; /* Ensure the background image is behind other content */
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5)); /* Shadow effect */
`;

const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden; /* Ensure the shadow doesn't overflow */
  gap: 150px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
    z-index: 0; 
    pointer-events: none; 
  }
`;

const CheckinPage: React.FC = () => {
  return (
    <>
      <PageContainer>
        <BackgroundImage/>
        <CheckinForm />
      </PageContainer>
    </>
  );
};

export default CheckinPage;
