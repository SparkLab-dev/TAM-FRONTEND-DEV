import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router";
import * as Styled from "./Navbar.style"; // Import your styled components
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AddCardIcon from "@mui/icons-material/AddCard";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const logout = (): void => {
    try {
      localStorage.clear();
      window.location.reload();
      console.log("localStorage cleared successfully.");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  const navigate = useNavigate();
  const { t } = useTranslation();
  const goToProfile = () => navigate("/userprofile");

  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    localStorage.setItem("selectedLanguage", language);
    window.location.reload();
  };

  return (
    <Styled.Header>
      <Styled.NewButton onClick={() => navigate("/newreservation")}>
        <AddCardIcon fontSize="small" />
        {t("newbooking")}{" "}
      </Styled.NewButton>
      <Styled.Nav>
      <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="language-select">
              <TranslateIcon />:
            </label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              style={{ border: "none" }}
            >
              <option value="en">English</option>
              <option value="it">Italian</option>
            </select>
          </div>
        <div onClick={goToProfile} style={{ display: "flex" }}>
          

          <div style={{ width: "35px", cursor: "pointer" }}>
            <PersonIcon fontSize="large" />
          </div>
          <Styled.LogoutButton onClick={logout}>
            <LogoutIcon fontSize="small" />
            Logout{" "}
          </Styled.LogoutButton>
        </div>
      </Styled.Nav>
    </Styled.Header>
  );
};

export default Navbar;
