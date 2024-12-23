import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Popup from "Components/Popup/Popup.component";
import {
  AccountTypeName,
  AccountsTypeNAmeHolder,
  PopupButton,
  PopupName,
  TextArea,
} from "./style/SingleCheckinPage.style";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useTranslation } from "react-i18next";

const CardContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const GuestCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2fr);
  gap: 20px; /* Gap between cards */
  margin-top: 20px;
`;

const GuestCardContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 220px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4f734c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  font-family: poppins;
  font-weight: 400;
  margin: 10px;
`;

const ImageModal = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  z-index: 1;
  padding-top: 150px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
`;

const ModalContent = styled.div`
  margin: auto;
  width: 80%;
  max-width: 700px;
  img {
    width: 100%;
    height: auto;
    display: block;
    margin: auto;
  }
`;

const base64ToImage = (base64String: string): string => {
  return `data:image/jpeg;base64,${base64String}`;
};

const Card: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [checkinId, setCheckinId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");
  const [checkInStatus, setCheckInStatus] = useState(data?.checkInStatus || "");
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const { t } = useTranslation();
  const checkin = url.pathname.split("/");
  const checkinIdd = checkin[checkin.length - 1];
  console.log(checkinIdd);

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://109f-95-107-162-162.ngrok-free.app/TAM/checkin/checkInPage/${checkinIdd}`);
      setData(response.data);
      console.log(data);
      console.log(response);
      console.log(checkinId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = (document: string) => {
    setSelectedDocument(base64ToImage(document));
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDocument(null);
    setModalOpen(false);
  };

  const updateCheckInStatus = async (): Promise<void> => {
    try {
      await axios.put(`https://109f-95-107-162-162.ngrok-free.app/TAM/checkin/${userId}/checkInStatus/${checkinIdd}/Successfully`);
      console.log("Check-in status updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating check-in status:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts or checkInStatus changes
  }, [checkInStatus]);

  const openPopup = () => {
    setIsModalOpen(true);
  };

  const denieCheckInStatus = async (): Promise<void> => {
    try {
      await axios.put(
        `https://109f-95-107-162-162.ngrok-free.app/TAM/checkin/${userId}/checkInStatus/${checkinIdd}/Failed?reasonOfFailed=${reason}`,
      );
      console.log("Check-in status updated successfully");
      setCheckInStatus("Denied");
      setIsModalOpen(false);
      // window.location.reload();
    } catch (error) {
      console.error("Error updating check-in status:", error);
    }
  };
  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <CardContainer>
        <h3>Checkin Details</h3>
        {data && (
          <>
            <Row>
              <div>{t("arrival")}:</div>
              <div>{data.cappoCheckIn.reservation.arrival}</div>
            </Row>
            <Row>
              <div>{t("departure")}:</div>
              <div>{data.cappoCheckIn.reservation.departure}</div>
            </Row>
            <Row>
              <div>{t("spartmentname")}:</div>
              <div>{data.cappoCheckIn.reservation.apartmentName}</div>
            </Row>
            <Row>
              <div>{t("guestname")}:</div>
              <div>{data.cappoCheckIn.reservation.guestName}</div>
            </Row>
            <Row>
              <div>{t("phone")}:</div>
              <div>{data.cappoCheckIn.reservation.phone}</div>
            </Row>
            <Row>
              <div>{t("adults")}:</div>
              <div>{data.cappoCheckIn.reservation.adults}</div>
            </Row>
            <Row>
              <div>{t("children")}:</div>
              <div>{data.cappoCheckIn.reservation.children}</div>
            </Row>
            <Row>
              <div>{t("price")}:</div>
              <div>{data.cappoCheckIn.reservation.price}</div>
            </Row>
            <Row>
              <div>{t("price")}:</div>
              <div>{data.cappoCheckIn.reservation.totalNumberOfGuests}</div>
            </Row>
            <Row>
              <div>{t("price")}:</div>
              <div>{data.cappoCheckIn.reservation.numberOfActualGuests}</div>
            </Row>
            <h3>{t("checkindetails")}</h3>
            <Row>
              <div>{t("name")}:</div>
              <div>{data.cappoCheckIn.reservation.firstname}</div>
            </Row>
            <Row>
              <div>{t("surname")}:</div>
              <div>{data.cappoCheckIn.reservation.lastname}</div>
            </Row>
            <Row>
              <div>{t("citizenship")}:</div>
              <div>{data.cappoCheckIn.cittadinaza.descrizione}</div>
            </Row>
            <Row>
              <div>{t("documentReleasePlace")}:</div>
              <div>{data.cappoCheckIn.luogoRilacioDocumento.descrizione}</div>
            </Row>
            <Row>
              <div>{t("typeofdocument")}:</div>
              <div>{data.cappoCheckIn.allogiatiWebDocumenti.descrizione}</div>
            </Row>
            <Row>
              <div>{t("numberofdocument")}:</div>
              <div>{data.cappoCheckIn.numeroDocumento}</div>
            </Row>
            <Row>
              <div>{t("birthdate")}:</div>
              <div>{data.cappoCheckIn.dataNascita}</div>
            </Row>
          </>
        )}
        {data?.cappoCheckIn.checkInStatus === "Pending" ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={updateCheckInStatus}>{t("approve")}</Button>
            <Button onClick={openPopup}>{t("deny")}</Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: data?.checkInStatus === "Successfully" ? "green" : "rgb(193 93 93)",
              fontFamily: "poppins",
              fontWeight: 400,
              fontSize: "15px",
            }}
          >
            {data?.checkInStatus === "Successfully" ? "Approved" : "Denied"}
          </div>
        )}

        {modalOpen && (
          <ImageModal isOpen={modalOpen} onClick={closeModal}>
            <ModalContent>{selectedDocument && <img src={selectedDocument} alt="Document Preview" />}</ModalContent>
          </ImageModal>
        )}
        <Popup
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          headerContent={<PopupName>{t("writethereason")}</PopupName>}
          bodyContent={
            <>
              <AccountsTypeNAmeHolder>
                <TextArea
                  placeholder="Enter the reason for denying the check-in"
                  value={reason}
                  onChange={(e: any) => setReason(e.target.value)}
                />
              </AccountsTypeNAmeHolder>
            </>
          }
          footerContent={<PopupButton onClick={denieCheckInStatus}>{t("save")}</PopupButton>}
        />
      </CardContainer>

      {data?.gruppoCheckIn?.length > 0 && (
        <GuestCardsGrid>
          {data.gruppoCheckIn.map((guest: any, index: number) => (
            <GuestCardContainer key={index}>
              <h3>Guest details</h3>
              <Row>
                <div>{t("name")}:</div>
                <div>{guest.nome}</div>
              </Row>
              <Row>
                <div>{t("surname")}:</div>
                <div>{guest.cognome}</div>
              </Row>
              <Row>
                <div>{t("birthdate")}:</div>
                <div>{guest.dataNascita}</div>
              </Row>
              <Row>
                <div>{t("citizenship")}:</div>
                <div>{guest.cittadinaza.descrizione}</div>
              </Row>
              <Row>
                <div>Type of guest:</div>
                <div>{guest.tipoAlloggiato.descrizione}</div>
              </Row>
            </GuestCardContainer>
          ))}
        </GuestCardsGrid>
      )}
    </div>
  );
};

export default Card;
