// import React, { useState } from "react";
// import axios from "axios";
// import moment from "moment";

// interface Apartment {
//   id: number;
//   name: string;
// }

// interface Channel {
//   id: number;
//   name: string;
// }

// interface Reservation {
//   arrival: string;
//   departure: string;
//   apartment: Apartment;
//   channel: Channel;
//   email: string;
//   guests: number;
//   guestName: string;
// }

// const ReservationsTable: React.FC = () => {
//   const [fromDate, setFromDate] = useState<string>("2024-06-01");
//   const [toDate, setToDate] = useState<string>("2024-06-30");
//   const [reservations, setReservations] = useState<Reservation[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   const fetchReservations = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get<Reservation[]>(
//         "http://192.168.10.141:8080/TAM/2/reservations/allReservations/all",
//         {
//           params: { fromDate, toDate },
//         }
//       );
//       setReservations(response.data);
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const thStyles = {
//     border: "1px solid black",
//     padding: "8px",
//     backgroundColor: "#4f734c",
//     color: "white",
//   };

//   const tdStyles = {
//     border: "1px solid black",
//     padding: "8px",
//   };

//   const formStyles = {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     gap: "10px",
//     marginBottom: "20px",
//     backgroundColor: "#4f734c",
//     padding: "20px",
//     borderRadius: "20px",
//     color: "white",
//     fontSize: "15px",
//     fontFamily: "poppins",
//     fontWeight: 400,
//   };

//   const buttonContainerStyles = {
//     gridColumn: "span 3",
//     display: "flex",
//     justifyContent: "center",
//     padding: "5px",
//   };

//   const inputStyles = {
//     height: "20px",
//     borderRadius: "4px",
//     display: "flex",
//   };

//   const buttonStyles = {
//     width: "120px",
//     height: "31px",
//     fontSize: "17px",
//     borderRadius: "10px",
//     backgroundColor: "white",
//     fontFamily: "poppins",
//     fontWeight: 400,
//     border: "none",
//     cursor: "pointer",
//   };

//   return (
//     <div style={{ width: "800px", height: "100vh", marginTop: "150px" }}>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           fetchReservations();
//         }}
//         style={formStyles}
//       >
//         <label>
//           From Date:
//           <input
//             type="date"
//             value={fromDate}
//             style={inputStyles}
//             onChange={(e) => setFromDate(e.target.value)}
//           />
//         </label>
//         <label>
//           To Date:
//           <input
//             type="date"
//             value={toDate}
//             style={inputStyles}
//             onChange={(e) => setToDate(e.target.value)}
//           />
//         </label>
//         <div style={buttonContainerStyles}>
//           <button style={buttonStyles} type="submit">
//             Fetch Reservations
//           </button>
//         </div>
//       </form>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th style={thStyles}>Check-in Date</th>
//               <th style={thStyles}>Check-out Date</th>
//               <th style={thStyles}>Room Name</th>
//               <th style={thStyles}>Number of Guests</th>
//               <th style={thStyles}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reservations.map((reservation, index) => (
//               <tr key={index}>
//                 <td style={tdStyles}>{moment(reservation.arrival).format("YYYY-MM-DD")}</td>
//                 <td style={tdStyles}>{moment(reservation.departure).format("YYYY-MM-DD")}</td>
//                 <td style={tdStyles}>{reservation.apartment.name}</td>
//                 <td style={tdStyles}>{reservation.guests}</td>
//                 <td style={tdStyles}>
//                   <button style={buttonStyles}>Action</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ReservationsTable;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useTranslation } from "react-i18next";
import moment from "moment";

interface Apartment {
  id: number;
  name: string;
}

interface Channel {
  id: number;
  name: string;
}

interface Reservation {
  arrival: string;
  departure: string;
  apartment: Apartment;
  channel: Channel;
  email: string;
  guests: number;
  guestName: string;
  roomType: string | null;
}

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

const ReservationsTable: React.FC = () => {
  const [fromDate, setFromDate] = useState<string>("2024-06-01");
  const [toDate, setToDate] = useState<string>("2024-06-30");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [client_address, setClient_address] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Reservation[]>(
        "http://192.168.10.141:8080/TAM/2/reservations/allReservations/all",
        {
          params: { fromDate, toDate },
        }
      );
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setClient_address("");
    setImageUrl("");
    setSuccessMessage("");
  };

  const handleSubmit = async () => {
    if (!selectedReservation) return;

    const data = {
      client_address,
      imageUrl,
      exp_checkInDate: selectedReservation.arrival,
      exp_checkOutDate: selectedReservation.departure,
      roomtype: "Standard",
      numberOfGuests: selectedReservation.guests,
    };

    try {
      await axios.post(
        "http://192.168.10.141:8080/TAM/Web3/sendweb3Request",
        data
      );
      setSuccessMessage("Data sent successfully!");
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const thStyles = {
    border: "1px solid black",
    padding: "8px",
    backgroundColor: "#4f734c",
    color: "white",
  };

  const tdStyles = {
    border: "1px solid black",
    padding: "8px",
  };

  const formStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginBottom: "20px",
    backgroundColor: "#4f734c",
    padding: "20px",
    borderRadius: "20px",
    color: "white",
    fontSize: "15px",
    fontFamily: "poppins",
    fontWeight: 400,
  };

  const buttonContainerStyles = {
    gridColumn: "span 3",
    display: "flex",
    justifyContent: "center",
    padding: "5px",
  };

  const inputStyles = {
    height: "20px",
    borderRadius: "4px",
    display: "flex",
  };

  const buttonStyles = {
    width: "120px",
    height: "31px",
    fontSize: "17px",
    borderRadius: "10px",
    backgroundColor: "white",
    fontFamily: "poppins",
    fontWeight: 400,
    border: "none",
    cursor: "pointer",
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClient_address(event.target.value);
  };

  return (
    <div style={{ width: "800px", height: "100vh", marginTop: "150px" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchReservations();
        }}
        style={formStyles}
      >
        <label>
          From Date:
          <input
            type="date"
            value={fromDate}
            style={inputStyles}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>
        <label>
          To Date:
          <input
            type="date"
            value={toDate}
            style={inputStyles}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>
        <div style={buttonContainerStyles}>
          <button style={buttonStyles} type="submit">
            Submit
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th style={thStyles}>Check-in Date</th>
              <th style={thStyles}>Check-out Date</th>
              <th style={thStyles}>Room Name</th>
              <th style={thStyles}>Number of Guests</th>
              <th style={thStyles}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td style={tdStyles}>
                  {moment(reservation.arrival).format("YYYY-MM-DD")}
                </td>
                <td style={tdStyles}>
                  {moment(reservation.departure).format("YYYY-MM-DD")}
                </td>
                <td style={tdStyles}>{reservation.apartment.name}</td>
                <td style={tdStyles}>{reservation.guests}</td>
                <td style={tdStyles}>
                  <button
                    style={buttonStyles}
                    onClick={() => openModal(reservation)}
                  >
                    Create NFT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <StyledModal open={modalIsOpen} onClose={closeModal}>
        <StyledWrapper>
          <Title>Create NFT</Title>
          <InputBox>
            <StyledTextField
              type="text"
              placeholder="Client Address"
              value={client_address}
              onChange={handleChange2}
              required
            />
          </InputBox>
          <InputBox>
            <StyledTextField
              type="url"
              placeholder="Image URL"
              value={imageUrl}
              onChange={handleChange}
              required
            />
          </InputBox>
          <Button onClick={handleSubmit}>Submit</Button>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </StyledWrapper>
      </StyledModal>
    </div>
  );
};

export default ReservationsTable;
