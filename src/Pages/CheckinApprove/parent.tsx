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

const Button = styled.button`
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
  width:150px;
  border-radius:8px;
`;

interface CheckIn {
  id: number;
  name: string;
  surname: string;
  checkInStatus: string;
}

const CheckInsTable: React.FC = () => {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("Pending");
  
  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const fetchData = async () => {
    try {
      const response = await axios.get<CheckIn[]>(
        "http://192.168.10.153:8080/TAM/checkin/getCheckIns/Filtered",
        {
          params: {
            apartmentId: 2031869,
            checkInStatus: selectedOption,
          },
        }
      );
      setCheckIns(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  

  const handleCheckInClick = (checkinId: number) => {
    navigate(`/singlecheckin/${checkinId}`);
  };
  return (
    <div style={{display:"flex",height:"auto",position:"absolute",top:"150px",flexDirection:"column",gap:"30px"}}>
        <div style={{display:"flex",justifyContent:"end"}}>
        <Dropdown value={selectedOption} onChange={handleDropdownChange}>
              <option value="Pending">Pending</option>
              <option value="Successfully">Approved</option>
             
            </Dropdown>
            </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: "20px",fontWeight:500 }}>Name</TableCell>
            <TableCell sx={{ fontSize: "20px",fontWeight:500 }} align="right">Surname</TableCell>
            <TableCell sx={{ fontSize: "20px",fontWeight:500 }} align="right">Check-in status</TableCell>
            <TableCell sx={{ fontSize: "20px",fontWeight:500 }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkIns.map((checkIn) => (
            <TableRow
              key={checkIn.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {checkIn.name}
              </TableCell>
              <TableCell align="right">{checkIn.surname}</TableCell>
              <TableCell align="right">{checkIn.checkInStatus}</TableCell>
              <TableCell align="right"><Button onClick={() => handleCheckInClick(checkIn.id)}>View Details</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default CheckInsTable;
