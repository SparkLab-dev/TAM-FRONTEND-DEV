import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface ApartmentOption {
  optionId: number;
  description: string;
  checked: boolean;
}

interface AddUrlOption {
  id: number;
  link: string;
  optionName: string;
}

const ClientAmenities: React.FC = () => {
  const [apartmentOptionsWithCategories, setApartmentOptionsWithCategories] =
    useState<
      {
        category: { id: number; categoryName: string };
        apartmentOptions: ApartmentOption[];
      }[]
    >([]);

  const userId = 2;
  const [urlData, setUrlData] = useState<AddUrlOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.10.210:8080/TAM/${userId}/apartments/getallApartmentOptions/2031869`
        );
        setApartmentOptionsWithCategories(
          response.data.apartmentOptionsWithCategories
        );
        // setApartmentId(response.data.apartmentId);
        console.log(response.data);
        const response2 = await axios.get<AddUrlOption[]>(
          `http://192.168.10.210:8080/TAM/specificApartmentOption/getAllSpecificApartmentOptionsByApartment/203186900`
        );
        setUrlData(response2.data || []);
        console.log(urlData);
        console.log(response2.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const openUrlInNewTab = (url: string | URL | undefined) => {
    window.open(url, "_blank");
  };

  return (
    <div style={{ height: "100vh", marginTop: "100px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "70px",
        }}
      ></div>
      {apartmentOptionsWithCategories.map((categoryGroup) => (
        <div key={categoryGroup.category.id}>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "1300px",
              marginLeft: "50px",

              marginTop: "50px",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <caption>{categoryGroup.category.categoryName}</caption>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "25px" }}>
                    {categoryGroup.category.categoryName}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryGroup.apartmentOptions.map((option) => (
                  <TableRow key={option.optionId}>
                    <TableCell component="th" scope="row">
                      {option.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "1300px",
          marginLeft: "50px",

          marginTop: "50px",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableRow>
            <TableCell sx={{ fontSize: "25px" }}>Links</TableCell>
            <TableCell> </TableCell>
          </TableRow>

          {urlData.map((option) => (
            <TableRow key={option.id}>
              <TableCell
                onClick={() => openUrlInNewTab(option.link)}
                style={{
                  cursor: "pointer",
                  color: "#566367",
                  fontSize: "18px",
                  fontFamily: "serif",
                }}
              >
                {option.optionName}
              </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClientAmenities;
