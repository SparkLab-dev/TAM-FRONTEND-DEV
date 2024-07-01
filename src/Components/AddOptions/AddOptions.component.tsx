// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import AddOptionForm from "./AddOptionForm.component";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "redux/store";

// interface ApartmentOption {
//   optionId: number;
//   description: string;
//   checked: boolean;
// }

// interface AddUrlOption {
//   id: number;
//   link: string;
//   optionName: string;
// }

// const AccessibleTable: React.FC = () => {
//   const [apartmentOptionsWithCategories, setApartmentOptionsWithCategories] =
//     useState<
//       {
//         category: { id: number; categoryName: string };
//         apartmentOptions: ApartmentOption[];
//       }[]
//     >([]);
//   // const [apartmentOptions, setApartmentOptions] = useState<ApartmentOption[]>(
//   //   []
//   // );
//   const user = useSelector((state: RootState) => state.auth.user);
//   const userId = user?.id;
//   const [urlData, setUrlData] = useState<AddUrlOption[]>([]);
//   const [apartmentId, setApartmentId] = useState<number | null>(null);
//   const [reload, setReload] = useState<boolean>(false);
//   const location = useLocation();

//   useEffect(() => {
//     const pathParts = location.pathname.split("/");
//     const idFromUrl = pathParts[2];
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://192.168.10.153:8080/TAM/${userId}/apartments/getallApartmentOptions/2112479 `
//         );
//         setApartmentOptionsWithCategories(
//           response.data.apartmentOptionsWithCategories
//         );
//         setApartmentId(response.data.apartmentId);
//         console.log(response.data);
//         const response2 = await axios.get<AddUrlOption[]>(
//           `http://192.168.10.153:8080/TAM/specificApartmentOption/getAllSpecificApartmentOptionsByApartment/2112479 `
//         );
//         setUrlData(response2.data || []);
//         console.log(urlData);
//         console.log(response2.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [location.pathname, reload, userId]);

//   const handleDeleteClick = async (optionId: number) => {
//     try {
//       if (apartmentId !== null) {
//         const requestBody = {
//           apartmentId: apartmentId,
//           apartmentOptions: [{ id: optionId }],
//         };

//         // Send DELETE request with apartmentId and optionId in the body
//         await axios.delete(
//           `http://192.168.10.153:8080/TAM/${userId}/apartments/deleteApartmentOption/delete`,
//           { data: requestBody }
//         );
//         console.log("DELETE request successful");
//         setReload((prevState) => !prevState);
//       } else {
//         console.error("ApartmentId is not available");
//       }
//     } catch (error) {
//       console.error("Error sending DELETE request:", error);
//     }
//   };

//   const handleIconClick = async (optionId: number) => {
//     try {
//       if (apartmentId !== null) {
//         const requestBody = {
//           apartmentId: apartmentId,
//           apartmentOptions: [{ id: optionId }],
//         };

//         await axios.post(
//           `http://192.168.10.153:8080/TAM/${userId}/apartments/apartmentOption/saveOrUpdate`,
//           requestBody
//         );
//         console.log("POST request successful");
//         setReload((prevState) => !prevState);
//       } else {
//         console.error("ApartmentId is not available");
//       }
//     } catch (error) {
//       console.error("Error sending POST request:", error);
//     }
//   };

//   const openUrlInNewTab = (url: string | URL | undefined) => {
//     window.open(url, "_blank");
//   };

//   return (
//     <div style={{ height: "100vh", marginTop: "100px" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: "70px",
//         }}
//       >
//         <AddOptionForm />
//       </div>
//       {apartmentOptionsWithCategories.map((categoryGroup) => (
//         <div key={categoryGroup.category.id}>
//           <TableContainer
//             component={Paper}
//             sx={{
//               maxWidth: "1300px",
//               marginLeft: "50px",
//               // maxHeight: "70%",
//               marginTop: "50px",
//             }}
//           >
//             <Table sx={{ minWidth: 650 }} aria-label="caption table">
//               <caption>{categoryGroup.category.categoryName}</caption>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontSize: "25px" }}>
//                     {categoryGroup.category.categoryName}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "25px" }} align="right">
//                     Status
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {categoryGroup.apartmentOptions.map((option) => (
//                   <TableRow key={option.optionId}>
//                     <TableCell component="th" scope="row">
//                       {option.description}
//                     </TableCell>
//                     <TableCell align="right">
//                       {option.checked ? (
//                         <>
//                           <HighlightOffIcon
//                             onClick={() => handleDeleteClick(option.optionId)}
//                             sx={{ cursor: "pointer" }}
//                           />
//                           <CheckCircleIcon />
//                         </>
//                       ) : (
//                         <>
//                           <CancelIcon />
//                           <CheckCircleOutlineIcon
//                             onClick={() => handleIconClick(option.optionId)}
//                             sx={{ cursor: "pointer" }}
//                           />
//                         </>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       ))}

//       <TableContainer
//         component={Paper}
//         sx={{
//           maxWidth: "1300px",
//           marginLeft: "50px",
//           // maxHeight: "70%",
//           marginTop: "50px",
//         }}
//       >
//         <Table sx={{ minWidth: 650 }} aria-label="caption table">
//           <TableRow>
//             <TableCell sx={{ fontSize: "25px" }}>Links</TableCell>
//             <TableCell> </TableCell>
//           </TableRow>

//           {urlData.map((option) => (
//             <TableRow key={option.id}>
//               <TableCell
//                 onClick={() => openUrlInNewTab(option.link)}
//                 style={{
//                   cursor: "pointer",
//                   color: "#566367",
//                   fontSize: "18px",
//                   fontFamily: "serif",
//                 }}
//               >
//                 {option.optionName}
//               </TableCell>
//               <TableCell> </TableCell>
//             </TableRow>
//           ))}
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default AccessibleTable;

import React, { useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Room {
  picture: string | null;
  amenities: string[];
}

interface Apartment {
  apartmentName: string;
  avgRatingLabel: string | null;
  avgRatingLocalized: string | null;
  price: string;
  priceDescription: string;
  pricePerNight: string;
  numberOfNights: string;
  latitude: number;
  longitude: number;
  rooms: Room;
}

interface ApiResponse {
  minPrice: string;
  maxPrice: string;
  avgPrice: string;
  apartments: Apartment[];
}

const ApartmentSearch: React.FC = () => {
  const [checkin, setCheckin] = useState<string>("");
  const [checkout, setCheckout] = useState<string>("");
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [lat1, setLat1] = useState<number>(0);
  const [lat2, setLat2] = useState<number>(0);
  const [long1, setLong1] = useState<number>(0);
  const [long2, setLong2] = useState<number>(0);
  const [data, setData] = useState<ApiResponse | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        "http://192.168.10.141:8081/Study/apartment",
        {
          params: {
            checkin,
            checkout,
            adults,
            children,
            infants,
            lat1,
            lat2,
            long1,
            long2,
            cursor: "qwreqwq4122regu7686",
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
      >
        <label>
          Checkin:
          <input
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
          />
        </label>
        <label>
          Checkout:
          <input
            type="date"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
          />
        </label>
        <label>
          Adults:
          <input
            type="number"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
          />
        </label>
        <label>
          Children:
          <input
            type="number"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
          />
        </label>
        <label>
          Infants:
          <input
            type="number"
            value={infants}
            onChange={(e) => setInfants(Number(e.target.value))}
          />
        </label>
        <label>
          Lat1:
          <input
            type="number"
            value={lat1}
            onChange={(e) => setLat1(Number(e.target.value))}
          />
        </label>
        <label>
          Lat2:
          <input
            type="number"
            value={lat2}
            onChange={(e) => setLat2(Number(e.target.value))}
          />
        </label>
        <label>
          Long1:
          <input
            type="number"
            value={long1}
            onChange={(e) => setLong1(Number(e.target.value))}
          />
        </label>
        <label>
          Long2:
          <input
            type="number"
            value={long2}
            onChange={(e) => setLong2(Number(e.target.value))}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {data && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="apartment table">
            <TableHead>
              <TableRow>
                <TableCell>Name of the Room</TableCell>
                <TableCell align="right">Airbnb Rating</TableCell>
                <TableCell align="right">Coordinates</TableCell>
                <TableCell align="right">Price per Night</TableCell>
                <TableCell align="right">Total Price</TableCell>
                {/* <TableCell align="right">Amenities</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.apartments.map((apartment, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {apartment.apartmentName}
                  </TableCell>
                  <TableCell align="right">
                    {apartment.avgRatingLocalized ?? "No rating"}
                  </TableCell>
                  <TableCell align="right">
                    {`Lat: ${apartment.latitude}`}
                    <br />
                    {`Long: ${apartment.longitude}`}
                  </TableCell>
                  <TableCell align="right">{apartment.pricePerNight}</TableCell>
                  <TableCell align="right">{apartment.price}</TableCell>
                  {/* <TableCell align="right">
                    <ul>
                      {apartment.rooms.amenities.map((amenity, i) => (
                        <li key={i}>{amenity}</li>
                      ))}
                    </ul>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ApartmentSearch;
