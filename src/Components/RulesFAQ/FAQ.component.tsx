import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface FAQItem {
  question: string;
  answer: string;
}

function Row(props: { row: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {props.row.question}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Answer
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow key={props.row.answer}>
                    <TableCell component="th" scope="row">
                      {props.row.answer}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [rows, setRows] = useState<FAQItem[]>([]);

  useEffect(() => {
    // Fetch data from API when component mounts
    fetch("http://192.168.10.210:8080/TAM/apartmentFAQ/getByApartment/2031869")
      .then((response) => response.json())
      .then((data: FAQItem[]) => {
        // Update the state with the fetched data
        setRows(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, marginBottom: "50px" }}
        aria-label="collapsible table"
      >
        <TableHead>
          <TableRow>
            <TableCell>FAQ</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
