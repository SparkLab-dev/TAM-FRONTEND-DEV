// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import photo from "../../apartmentimage.png";

// export default function MediaCard() {
//   return (
//     <div style={{ display: "flex", gap: "50px" }}>
//       <Card sx={{ maxWidth: 345 }}>
//         <CardMedia
//           sx={{ height: 240, width: 400 }}
//           image={photo}
//           title="green iguana"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             Redis Halili
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Checkin date: 14/05/2024
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Checkout date: 19/05/2024
//           </Typography>
//         </CardContent>
//         <CardActions>
//           <Button size="small">Download Invoice</Button>
//         </CardActions>
//       </Card>
//       <Card sx={{ maxWidth: 345 }}>
//         <CardMedia
//           sx={{ height: 240, width: 400 }}
//           image={photo}
//           title="green iguana"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             Anna Johnson{" "}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Checkin date: 22/05/2024
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Checkout date: 27/05/2024
//           </Typography>
//         </CardContent>
//         <CardActions>
//           <Button size="small">Download Invoice</Button>
//         </CardActions>
//       </Card>
//       <Card sx={{ maxWidth: 345 }}>
//         <CardMedia
//           sx={{ height: 240, width: 400 }}
//           image={photo}
//           title="green iguana"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             Berta Johnson
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Checkin date: 30/05/2024
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Checkout date: 05/06/2024
//           </Typography>
//         </CardContent>
//         <CardActions>
//           <Button size="small">Download Invoice</Button>
//         </CardActions>
//       </Card>
//     </div>
//   );
// }

import { FC, useState } from "react";
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

export default function MediaCard() {
  // const handleDownloadInvoice = async (invoiceId:any) => {
  //   const handleDownloadInvoice = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://192.168.10.153:8080/TAM/checkin/getInovice/2/59290534`

  //       );
  //       console.log(response)
  //       const fileUrl = response.data;

  //       window.open(fileUrl, "_blank");
  //     } catch (error) {
  //       console.error("Error downloading invoice:", error);
  //     }
  //   };

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const { t } = useTranslation();
  console.log(userId);
  console.log(startDate);
  console.log(endDate);
  const handleDownloadInvoice = async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.153:8080/TAM/checkin/getInovice/2/7`,
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
      a.download = `invoice.docx`;

      a.click();

      // Cleanup: revoke the URL object to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  const handleDownloadInvoiceXml = async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.153:8080/TAM/checkin/getInoviceXML/2/7`,
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
      a.download = `invoicexml.xml`;

      a.click();

      // Cleanup: revoke the URL object to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  const handleDownloadZIPfile = async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.153:8080/TAM/checkin/downloadXML/ZIP/${userId}?startDate=${startDate}&endDate=${endDate}`,
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
        {/* <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 240, width: 400 }}
            image={photo}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Redis Halili
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Checkin date: 14/05/2024
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Checkout date: 19/05/2024
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleDownloadInvoice()}>
              Download Invoice
            </Button>
            <Button size="small" onClick={() => handleDownloadInvoiceXml()}>
              Download Xml Invoice
            </Button>
          </CardActions>
        </Card> */}
        <Card sx={{ maxWidth: 345 }}>
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
        </Card>
      </div>
    </div>
  );
}
