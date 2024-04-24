import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddOptionForm from "./AddOptionForm.component";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

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

const AccessibleTable: React.FC = () => {
  const [apartmentOptionsWithCategories, setApartmentOptionsWithCategories] =
    useState<
      {
        category: { id: number; categoryName: string };
        apartmentOptions: ApartmentOption[];
      }[]
    >([]);
  // const [apartmentOptions, setApartmentOptions] = useState<ApartmentOption[]>(
  //   []
  // );
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const [urlData, setUrlData] = useState<AddUrlOption[]>([]);
  const [apartmentId, setApartmentId] = useState<number | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const idFromUrl = pathParts[2];
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.10.210:8080/TAM/${userId}/apartments/getallApartmentOptions/2042282`
        );
        setApartmentOptionsWithCategories(
          response.data.apartmentOptionsWithCategories
        );
        setApartmentId(response.data.apartmentId);
        console.log(response.data);
        const response2 = await axios.get<AddUrlOption[]>(
          `http://192.168.10.210:8080/TAM/specificApartmentOption/getAllSpecificApartmentOptionsByApartment/2042282`
        );
        setUrlData(response2.data || []);
        console.log(urlData);
        console.log(response2.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location.pathname, reload, userId]);

  const handleDeleteClick = async (optionId: number) => {
    try {
      if (apartmentId !== null) {
        const requestBody = {
          apartmentId: apartmentId,
          apartmentOptions: [{ id: optionId }],
        };

        // Send DELETE request with apartmentId and optionId in the body
        await axios.delete(
          `http://192.168.10.210:8080/TAM/${userId}/apartments/deleteApartmentOption/delete`,
          { data: requestBody }
        );
        console.log("DELETE request successful");
        setReload((prevState) => !prevState);
      } else {
        console.error("ApartmentId is not available");
      }
    } catch (error) {
      console.error("Error sending DELETE request:", error);
    }
  };

  const handleIconClick = async (optionId: number) => {
    try {
      if (apartmentId !== null) {
        const requestBody = {
          apartmentId: apartmentId,
          apartmentOptions: [{ id: optionId }],
        };

        await axios.post(
          `http://192.168.10.210:8080/TAM/${userId}/apartments/apartmentOption/saveOrUpdate`,
          requestBody
        );
        console.log("POST request successful");
        setReload((prevState) => !prevState);
      } else {
        console.error("ApartmentId is not available");
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

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
      >
        <AddOptionForm />
      </div>
      {apartmentOptionsWithCategories.map((categoryGroup) => (
        <div key={categoryGroup.category.id}>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "1300px",
              marginLeft: "50px",
              // maxHeight: "70%",
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
                  <TableCell sx={{ fontSize: "25px" }} align="right">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryGroup.apartmentOptions.map((option) => (
                  <TableRow key={option.optionId}>
                    <TableCell component="th" scope="row">
                      {option.description}
                    </TableCell>
                    <TableCell align="right">
                      {option.checked ? (
                        <>
                          <HighlightOffIcon
                            onClick={() => handleDeleteClick(option.optionId)}
                            sx={{ cursor: "pointer" }}
                          />
                          <CheckCircleIcon />
                        </>
                      ) : (
                        <>
                          <CancelIcon />
                          <CheckCircleOutlineIcon
                            onClick={() => handleIconClick(option.optionId)}
                            sx={{ cursor: "pointer" }}
                          />
                        </>
                      )}
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
          // maxHeight: "70%",
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

export default AccessibleTable;
