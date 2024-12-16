import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import photo from "../../apartmentimage.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { ReservationsButton } from "./style/Reservations.style";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EditButton } from "Components/RentList/style/RentList.style";
import { useNavigate } from "react-router-dom";

interface Reservations {
  clientPrice: number;
  createdDate: string;
  creator: string;
  dateFrom: string;
  dateTo: string;
  fullName: string;
  id: number;
  lastMod: string;
  localPropertyId: number;
  numberOfGuests: number;
  ownerId: number;
  pmsReservationId: string;
  propertyID: number;
  propertyName: string;
  reservationID: number;
  ruPrice: number;
  statusID: number;
  userId: number;
}
export default function MediaCard() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [allReservations, setAllReservations] = useState<Reservations[]>([]);

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const { t } = useTranslation();
  console.log(userId);
  console.log(startDate);
  console.log(endDate);

  const handleDownloadZIPfile = async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.141:8080/TAM/checkin/downloadXML/ZIP/${userId}?startDate=${startDate}&endDate=${endDate}`,
        {
          responseType: "blob", // Set response type to blob
        }
      );
      console.log("Response:", response);

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice.zip`;

      a.click();

      // Cleanup: revoke the URL object to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  function handleStartDateChange(event: any) {
    if (event) {
      const year = event.$y;
      const month = (event.$M + 1).toString().padStart(2, "0");
      const day = event.$D.toString().padStart(2, "0");
      setStartDate(`${year}-${month}-${day}`);
    }
  }

  function handleEndDateChange(event: any) {
    if (event) {
      const year = event.$y;
      const month = (event.$M + 1).toString().padStart(2, "0");
      const day = event.$D.toString().padStart(2, "0");
      setEndDate(`${year}-${month}-${day}`);
    }
  }
  useEffect(() => {
    getAllReservations();
  }, []);

  const getAllReservations = async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.210:8080/TAM/reservation/getAllReservationsPerOwner/${userId}`
      );
      console.log(userId, "userId");
      console.log("RESPOnse", response.data);
      setAllReservations(response.data);

      console.log(response);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };
  const handleReservationClick = (reservation: Reservations) => {
    console.log("RESS", reservation);
    navigate(`/reservationDetail/${reservation}`);
  };
  return (
    <div style={{ display: "flex", gap: "50px", flexDirection: "column" }}>
      <div style={{ flex: "1" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker"]}
            sx={{ justifyContent: "center" }}
          >
            <DatePicker
              label={t("startdate")}
              onChange={handleStartDateChange}
              sx={{
                margin: "10px  !important",
                width: "200px",
                marginLeft: "50px !important",
              }}
            />
            <DatePicker
              label={t("enddate")}
              onChange={handleEndDateChange}
              sx={{
                margin: "10px  !important",
                width: "200px",
                // marginLeft: "50px !important",
              }}
            />
            <div style={{ marginTop: "10px" }}>
              <ReservationsButton onClick={() => handleDownloadZIPfile()}>
                {t("download")}
              </ReservationsButton>
            </div>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div style={{ flex: "1", display: "flex", gap: "50px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "19px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {t("Property Id")}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "19px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {t("Property name")}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "19px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {t("Date From")}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "19px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {t("Date To")}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "19px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {t("Number of Guests")}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "19px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {t("Ru Price")}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "19px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {t("Client Price")}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "19px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {t("Created Date")}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "19px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {t("Actions")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allReservations.map((reservation: any) => (
                <TableRow
                  key={reservation.id}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{reservation.propertyID}</TableCell>
                  <TableCell align="left">{reservation.propertyName}</TableCell>
                  <TableCell align="left">{reservation.dateFrom}</TableCell>
                  <TableCell align="left">{reservation.dateTo}</TableCell>
                  <TableCell align="left">
                    {reservation.numberOfGuests}
                  </TableCell>
                  <TableCell align="left">{reservation.ruPrice}</TableCell>
                  <TableCell align="left">{reservation.clientPrice}</TableCell>
                  <TableCell align="left">{reservation.createdDate}</TableCell>
                  <TableCell align="left">
                    <button
                      onClick={() =>
                        handleReservationClick(reservation.propertyID)
                      }
                    >
                      {t("view details")}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 240, width: 400 }}
            image={photo}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Federico Johnson
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Checkin date: 2024-05-27
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Checkout date: 2024-05-28
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleDownloadInvoice()}>
              {t("download")} {t("invoice")}
            </Button>
            <Button size="small" onClick={() => handleDownloadInvoiceXml()}>
              {t("download")} Xml {t("invoice")}
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 240, width: 400 }}
            image={photo}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Amelia Smith
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Checkin date: 2024-05-29
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Checkout date: 2024-05-31
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleDownloadInvoice()}>
              {t("download")} {t("invoice")}
            </Button>
            <Button size="small" onClick={() => handleDownloadInvoiceXml()}>
              {t("download")} Xml {t("invoice")}
            </Button>
          </CardActions>
        </Card> */}
      </div>
    </div>
  );
}
