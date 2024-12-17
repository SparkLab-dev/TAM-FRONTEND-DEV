import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

import { useTranslation } from "react-i18next";

import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  ApartmentProps,
  fetchApartmentIds,
} from "redux/Auth/ApartmentsPage/ApartmentsPageSlice";

export const Button = styled.button`
  width: 100px;
  height: 30px;
  background: #4f734c;
  border: none;
  outline: none;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 12px;
  color: white;
  font-weight: 700;
`;

const Dropdown = styled.select`
  margin-top: 10px;
  padding: 5px;
  height: 30px;
  margin-right: 10px;
  width: 150px;
  border-radius: 8px;
`;

interface CheckIn {
  checkInId: number;
  smoobuId: string;
  checkInTime: string;
  alloggiatiWebapartmentId: number | null;
  tipoAlloggiato: {
    id: number;
    codice: number;
    descrizione: string;
  };
  smoobuApartmentId: string;
  reservation: {
    id: number;
    referenceId: number;
    smoobuId: number;
    arrival: string;
    departure: string;
    apartmentId: number;
    apartmentName: string;
    guestName: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    adults: number;
    children: number;
    checkIn: string | null;
    checkOut: string | null;
    price: number;
    pricePaid: string;
    blockedBooking: boolean;
    checkInStatus: string;
    channelId: number;
    channelName: string;
    hostId: number;
    numberOfActualGuests: number;
    totalNumberOfGuests: number;
  };
  numberOfGuests: number;
  numeroGiornoDiPermanenza: number;
  cognome: string;
  nome: string;
  sesso: number;
  dataNascita: string;
  comuni: string | null;
  statoNascita: {
    id: number;
    codice: string;
    descrizione: string;
    provincia: string;
    dataFineValue: string | null;
  };
  cittadinaza: {
    id: number;
    codice: string;
    descrizione: string;
    provincia: string;
    dataFineValue: string | null;
  };
  allogiatiWebDocumenti: {
    id: number;
    codice: string;
    descrizione: string;
  };
  numeroDocumento: string;
  luogoRilacioDocumento: {
    id: number;
    codice: string;
    descrizione: string;
    provincia: string;
    dataFineValue: string | null;
  };
  cappo: string | null;
  checkInStatus: string;
  checkinPlatform: string;
  failed: boolean | null;
}

const CheckInsTable: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("Pending");
  const [apartmentName, setApartmentNames] = useState<ApartmentProps[]>([]);
  const [selectedApartment, setSelectedApartment] = useState<number | null>(
    null
  );
  console.log("apartmentName", apartmentName);

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      if (userId) {
        console.log(userId);
        dispatch(fetchApartmentIds(userId))
          .then((result: any) => {
            console.log(result);
            if (fetchApartmentIds.fulfilled.match(result)) {
              setApartmentNames(result.payload);
            } else if (fetchApartmentIds.rejected.match(result)) {
            }
          })
          .catch((error: any) => {
            console.error("Error fetching apartment names:", error);
          });
      }
    };

    fetchData();
  }, [dispatch, userId]);

  const fetchCheckIns = async () => {
    if (selectedApartment !== null) {
      try {
        const response = await axios.get<CheckIn[]>(
          "http://192.168.10.210:8080/TAM/checkin/getCheckIns/Filtered",
          {
            params: {
              apartmentId: selectedApartment,
              checkInStatus: selectedOption,
            },
          }
        );
        setCheckIns(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchCheckIns();
  }, [selectedOption, selectedApartment]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleApartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedApartment(Number(e.target.value));
  };

  const handleCheckInClick = (checkinId: number) => {
    navigate(`/singlecheckin/${checkinId}`);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "auto",
        position: "absolute",
        top: "150px",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>
          <Dropdown
            value={selectedApartment ?? ""}
            onChange={handleApartmentChange}
            style={{ fontFamily: "Poppins" }}
          >
            <option value="">Select Apartment</option>
            {apartmentName.map((apartment: any) => (
              <option key={apartment.id} value={apartment.id}>
                {apartment.name}
              </option>
            ))}
          </Dropdown>
        </div>
        <div>
          <Dropdown
            value={selectedOption}
            onChange={handleStatusChange}
            style={{ fontFamily: "Poppins" }}
          >
            <option value="Pending">Pending</option>
            <option value="Successfully">Approved</option>
            <option value="Failed">Denied</option>
          </Dropdown>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "20px", fontWeight: 500 }}>
                {t("name")}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "17px",
                  fontWeight: 500,
                  fontFamily: "Poppins",
                }}
                align="right"
              >
                {t("surname")}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "17px",
                  fontWeight: 500,
                  fontFamily: "Poppins",
                }}
                align="right"
              >
                {t("status")}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "17px",
                  fontWeight: 500,
                  fontFamily: "Poppins",
                }}
                align="right"
              >
                {t("reservationnr")}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "17px",
                  fontWeight: 500,
                  fontFamily: "Poppins",
                }}
                align="right"
              >
                Guests
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "17px",
                  fontWeight: 500,
                  fontFamily: "Poppins",
                }}
                align="right"
              >
                {t("actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checkIns.map((checkIn) => (
              <TableRow
                key={checkIn.checkInId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {checkIn.reservation.firstname}
                </TableCell>
                <TableCell align="right">
                  {checkIn.reservation.lastname}
                </TableCell>
                <TableCell align="right">{checkIn.checkInStatus}</TableCell>
                <TableCell align="right">{checkIn.smoobuId}</TableCell>
                <TableCell align="right">
                  {checkIn.reservation.numberOfActualGuests}/
                  {checkIn.reservation.totalNumberOfGuests}
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleCheckInClick(checkIn.checkInId)}>
                    {t("viewdetails")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CheckInsTable;
