import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

interface Stato {
  id: number;
  codice: string;
  descrizione: string;
}

interface Statoo {
  id: number;
  codice: string;
  descrizione: string;
}

interface Comune {
  id: number;
  comuneCodice: string;
  descrizione: string;
}

interface TipoAlloggiato {
  id: number;
  codice: number;
  descrizione: string;
}

interface TipoDocumenti {
  id: number;
  codice: number;
  descrizione: string;
}

interface GuestData {
  cognome: string;
  nome: string;
  sesso: number;
  dataNascita: string;
  comuneCodice: string;
  statoNascita: string;
  luogoRilacioDocumento: string;
  cittadinaza: string;
  tipoAlloggiato?: number;
  allogiatiWebDocumenti?: string;
  numeroDocumento?: string;
}

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
    content: "";
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
const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${require("../../background.png")});
  background-size: cover;
  background-position: center;
  z-index: -1; /* Ensure the background image is behind other content */
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5)); /* Shadow effect */
`;
const FirstStepStyledWrapper = styled(Box)`
  background: white;

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
`;

const Title = styled.text`
  font-size: 30px;
  color: black;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;

  //   margin: 5px 15px;
  row-gap: 5px;
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled(TextField)`
  width: 100%;

  margin: 15px;
`;

const Button = styled.button`
  width: 150px;
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
const Dropdown = styled.select`
  margin-top: 10px;
  padding: 5px;
  height: 40px;
  margin-right: 10px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(215, 215, 215);
`;
const GuestForm: React.FC = () => {
  const numberOfGuests = Number(localStorage.getItem("numberOfGuests")) || 1;
  const checkinSmoobuId = Number(localStorage.getItem("checkinSmoobuId")) || 77579268;
  console.log(checkinSmoobuId);
  const [apartmentId, setApartmentId] = useState<string>("2379138");
  const [guestData, setGuestData] = useState<GuestData[]>(Array(numberOfGuests).fill({}));
  const [stati, setStati] = useState<Stato[]>([]);
  const [statii, setStatii] = useState<Statoo[]>([]);
  const [comuni, setComuni] = useState<Comune[]>([]);
  const [allogiatiWebDocumenti, setAllogiatiWebDocumenti] = useState<TipoDocumenti[]>([]);
  const [tipoAlloggiati, setTipoAlloggiati] = useState<TipoAlloggiato[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Fetch the data for stati and comuni
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statiResponse, comuniResponse, tipoAlloggiatoResponse, tipoDocumentiResponse] = await Promise.all([
          axios.get("https://109f-95-107-162-162.ngrok-free.app/TAM/allogatiWeb/getAllStati"),
          axios.get("https://109f-95-107-162-162.ngrok-free.app/TAM/allogatiWeb/getAllComuni"),
          axios.get("https://109f-95-107-162-162.ngrok-free.app/TAM/allogatiWeb/getAllTipoAlloggiati"),
          axios.get("https://109f-95-107-162-162.ngrok-free.app/TAM/allogatiWeb/getAllTipoDocumenti"),
        ]);
        setStati(statiResponse.data); // Set the states
        setStatii(statiResponse.data);
        setComuni(comuniResponse.data); // Set the cities
        setTipoAlloggiati(tipoAlloggiatoResponse.data);
        setAllogiatiWebDocumenti(tipoDocumentiResponse.data);
      } catch (error) {
        console.error("Error fetching stati and comuni:", error);
      }
    };

    fetchData();
  }, []);

  // Handle input change
  const handleInputChange = (index: number, field: string, value: string | number) => {
    const updatedData = [...guestData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setGuestData(updatedData);
  };

  const handleNext = () => {
    if (currentStep < numberOfGuests - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const handleSubmit = async () => {
  //   setIsSubmitting(true);
  //   try {
  //     // const response = await axios.post(`https://109f-95-107-162-162.ngrok-free.app/TAM/checkin/saveCheckin`, guestData);
  //     console.log(guestData); // Handle success response
  //   } catch (error) {
  //     console.error("Error submitting guest data:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const preparedGuestData = guestData.map((guest, index) => {
        if (index === 0) {
          return {
            ...guest,
            smoobuApartmentId: apartmentId,
            reservation: {
              smoobuId: checkinSmoobuId,
            },
            checkinPlatform: "Totem",
            statoNascita: {
              codice: guest.statoNascita,
            },
            cittadinaza: {
              codice: guest.cittadinaza,
            },
            tipoAlloggiato: {
              codice: guest.tipoAlloggiato,
            },
            allogiatiWebDocumenti: {
              codice: guest.allogiatiWebDocumenti,
            },
            numeroDocumento: guest.numeroDocumento,
            luogoRilacioDocumento: {
              codice: guest.luogoRilacioDocumento,
            },
          };
        } else {
          return {
            ...guest,
            statoNascita: {
              codice: guest.statoNascita,
            },
            cittadinaza: {
              codice: guest.cittadinaza,
            },
            tipoAlloggiato: {
              codice: guest.tipoAlloggiato,
            },
          };
        }
      });

      console.log(preparedGuestData);

      const response = await axios.post(`https://109f-95-107-162-162.ngrok-free.app/TAM/checkin/saveCheckin`, preparedGuestData);
      console.log(preparedGuestData);

      if (response.status === 200) {
        console.log("Guest data submitted successfully:", response.data);
        setSuccessMessage("Form submitted successfully!");
        setTimeout(() => {
          navigate("/kyc/1");
        }, 2000);
      } else {
        console.error("Failed to submit guest data:", response.data);
        setErrorMessage("Wrong informations");
      }
    } catch (error) {
      console.error("Error submitting guest data:", error);
      setErrorMessage("Wrong informations");
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log(guestData[0].statoNascita);
  const isMainGuest = currentStep === 0;

  return (
    <PageContainer>
      <BackgroundImage />
      <FirstStepStyledWrapper>
        <Title>Guest {currentStep + 1} Form</Title>
        <form>
          <InputBox>
            <Label>Guest Type:</Label>
            <Dropdown
              value={guestData[currentStep]?.tipoAlloggiato || ""}
              onChange={(e: any) => handleInputChange(currentStep, "tipoAlloggiato", Number(e.target.value))}
              required
            >
              <option value="">Select a Guest Type</option>
              {tipoAlloggiati.map((tipo) => (
                <option key={tipo.id} value={tipo.codice}>
                  {tipo.descrizione}
                </option>
              ))}
            </Dropdown>
          </InputBox>

          <InputBox>
            <Label>First Name:</Label>
            <StyledTextField
              type="text"
              placeholder="Name"
              value={guestData[currentStep]?.nome || ""}
              onChange={(e: any) => handleInputChange(currentStep, "nome", e.target.value)}
              required
              size="small"
            />
          </InputBox>
          <InputBox>
            <Label>Last Name:</Label>
            <TextField
              type="text"
              placeholder="Last Name"
              value={guestData[currentStep]?.cognome || ""}
              onChange={(e) => handleInputChange(currentStep, "cognome", e.target.value)}
              required
              size="small"
            />
          </InputBox>
          <InputBox>
            <Label>Gender:</Label>
            <Dropdown
              value={guestData[currentStep]?.sesso || ""}
              onChange={(e: any) => handleInputChange(currentStep, "sesso", Number(e.target.value))}
              required
            >
              <option value={1}>Male</option>
              <option value={2}>Female</option>
            </Dropdown>
          </InputBox>
          <InputBox>
            <Label>Date of Birth:</Label>
            <TextField
              type="date"
              value={guestData[currentStep]?.dataNascita || ""}
              onChange={(e) => handleInputChange(currentStep, "dataNascita", e.target.value)}
              required
              size="small"
            />
          </InputBox>
          <InputBox>
            <Label>State of Birth Code:</Label>
            <Dropdown
              value={guestData[currentStep]?.statoNascita || ""}
              onChange={(e: any) => handleInputChange(currentStep, "statoNascita", e.target.value)}
              required
            >
              <option value="">Select a State</option>
              {stati.map((stato) => (
                <option key={stato.id} value={stato.codice}>
                  {stato.descrizione}
                </option>
              ))}
            </Dropdown>
          </InputBox>

          {/* Conditionally show comune if Italy is selected */}
          {guestData[currentStep]?.statoNascita === "100000100" && (
            <InputBox>
              <Label>City Code:</Label>
              <Dropdown
                value={guestData[currentStep]?.comuneCodice || ""}
                onChange={(e: any) => handleInputChange(currentStep, "comuneCodice", e.target.value)}
                required
              >
                <option value="">Select a City</option>
                {comuni.map((comune) => (
                  <option key={comune.id} value={comune.comuneCodice}>
                    {comune.descrizione}
                  </option>
                ))}
              </Dropdown>
            </InputBox>
          )}

          <InputBox>
            <Label>Citizenship Code:</Label>
            <Dropdown
              value={guestData[currentStep]?.cittadinaza || ""}
              onChange={(e: any) => handleInputChange(currentStep, "cittadinaza", e.target.value)}
              required
            >
              <option value="">Select a State</option>
              {stati.map((stato) => (
                <option key={stato.id} value={stato.codice}>
                  {stato.descrizione}
                </option>
              ))}
            </Dropdown>
          </InputBox>

          {isMainGuest && (
            <>
              {/* <InputBox>
              <Label>Document Code:</Label>
              <TextField
                type="text"
                placeholder="Document Code"
                value={guestData[currentStep]?.numeroDocumento || ""}
                onChange={(e) => handleInputChange(currentStep, "numeroDocumento", e.target.value)}
                required
                size="small"
              />
            </InputBox> */}
              <InputBox>
                <Label>Document type:</Label>
                <Dropdown
                  value={guestData[currentStep]?.allogiatiWebDocumenti || ""}
                  onChange={(e: any) => handleInputChange(currentStep, "allogiatiWebDocumenti", e.target.value)}
                  required
                >
                  <option value="">Select a document type</option>
                  {allogiatiWebDocumenti.map((tipo) => (
                    <option key={tipo.id} value={tipo.codice}>
                      {tipo.descrizione}
                    </option>
                  ))}
                </Dropdown>
              </InputBox>
              <InputBox>
                <Label>State of document issues:</Label>
                <Dropdown
                  value={guestData[currentStep]?.luogoRilacioDocumento || ""}
                  onChange={(e: any) => handleInputChange(currentStep, "luogoRilacioDocumento", e.target.value)}
                  required
                >
                  <option value="">Select a State</option>
                  {statii.map((stato) => (
                    <option key={stato.id} value={stato.codice}>
                      {stato.descrizione}
                    </option>
                  ))}
                </Dropdown>
              </InputBox>
              <InputBox>
                <Label>Document Number:</Label>
                <TextField
                  type="text"
                  placeholder="Document Description"
                  value={guestData[currentStep]?.numeroDocumento || ""}
                  onChange={(e) => handleInputChange(currentStep, "numeroDocumento", e.target.value)}
                  required
                  size="small"
                />
              </InputBox>
            </>
          )}

          <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
            <Button type="button" onClick={handlePrevious} disabled={currentStep === 0}>
              Previous
            </Button>
            {currentStep < numberOfGuests - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        </form>
      </FirstStepStyledWrapper>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </PageContainer>
  );
};

export default GuestForm;
