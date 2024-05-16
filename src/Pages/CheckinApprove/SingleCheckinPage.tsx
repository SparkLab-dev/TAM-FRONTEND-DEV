import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);

  const checkin = url.pathname.split("/");
  const checkinIdd = checkin[checkin.length - 1];
  console.log(checkinIdd);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.153:8080/TAM/checkin/checkInPage/${checkinIdd}`
      );
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
      await axios.put(
        `http://192.168.10.153:8080/TAM/checkin/checkInStatus/${checkinIdd}/Successfully`
      );
      console.log("Check-in status updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating check-in status:", error);
    }
  };

  return (
    <CardContainer>
      {data && (
        <>
          <Row>
            <div>Arrival:</div>
            <div>{data.reservation.arrival}</div>
          </Row>
          <Row>
            <div>Departure:</div>
            <div>{data.reservation.departure}</div>
          </Row>
          <Row>
            <div>Apartment Name:</div>
            <div>{data.reservation.apartmentName}</div>
          </Row>
          <Row>
            <div>Guest Name:</div>
            <div>{data.reservation.guestName}</div>
          </Row>
          <Row>
            <div>Phone:</div>
            <div>{data.reservation.phone}</div>
          </Row>
          <Row>
            <div>Adults:</div>
            <div>{data.reservation.adults}</div>
          </Row>
          <Row>
            <div>Children:</div>
            <div>{data.reservation.children}</div>
          </Row>
          <Row>
            <div>Price:</div>
            <div>{data.reservation.price}</div>
          </Row>
          <h3>Checkin details</h3>
          <Row>
            <div>Name:</div>
            <div>{data.name}</div>
          </Row>
          <Row>
            <div>Surname:</div>
            <div>{data.surname}</div>
          </Row>
          <Row>
            <div>Document ID:</div>
            <div>{data.documentId}</div>
          </Row>
          <Row>
            <div>Birth Date:</div>
            <div>{data.birthDate}</div>
          </Row>
          <Row>
            <div>Document Expiry:</div>
            <div>{data.documentExpiry}</div>
          </Row>
          {data.checkInDocuments.length > 0 && (
            <>
              <h3>Check-In Documents:</h3>
              {data.checkInDocuments.map((doc: any) => (
                <Row key={doc.id} onClick={() => openModal(doc.document)}>
                  <div>Document {doc.id}:</div>
                  <div>Click to Preview</div>
                </Row>
              ))}
            </>
          )}
        </>
      )}
      {data?.checkInStatus === "Pending" ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={updateCheckInStatus}>Approve</Button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: "rgb(101 193 93)",
            fontFamily: "poppins",
            fontWeight: 400,
            fontSize: "15px",
          }}
        >
          Approved
        </div>
      )}
      {modalOpen && (
        <ImageModal isOpen={modalOpen} onClick={closeModal}>
          <ModalContent>
            {selectedDocument && (
              <img src={selectedDocument} alt="Document Preview" />
            )}
          </ModalContent>
        </ImageModal>
      )}
    </CardContainer>
  );
};

export default Card;
