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

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import photo from "../../apartmentimage.png";

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

  const handleDownloadInvoice = async () => {
    try {
      const response = await axios.get(`http://192.168.10.153:8080/TAM/checkin/getInovice/2/59290534`, {
        responseType: 'blob' // Set response type to blob
      });
      console.log("Response:", response);
  
      
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
  
     
      const url = window.URL.createObjectURL(blob);
  
      
      const a = document.createElement('a');
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
      const response = await axios.get(`http://192.168.10.153:8080/TAM/checkin/getInoviceXML/2/59290534`, {
        responseType: 'blob' // Set response type to blob
      });
      console.log("Response:", response);
  
      
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
  
     
      const url = window.URL.createObjectURL(blob);
  
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoicexml.xml`; 
      
      a.click();
  
      // Cleanup: revoke the URL object to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <Card sx={{ maxWidth: 345 }}>
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
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 240, width: 400 }}
          image={photo}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Anna Johnson{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Checkin date: 22/05/2024
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Checkout date: 27/05/2024
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
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 240, width: 400 }}
          image={photo}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Berta Johnson
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Checkin date: 30/05/2024
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Checkout date: 05/06/2024
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
      </Card>
    </div>
  );
}
