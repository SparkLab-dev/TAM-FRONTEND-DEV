import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Rule {
  id: number;
  ruleDescription: string;
}

function Rules() {
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    // Fetch rules from API when component mounts
    fetch("https://393e-95-107-162-162.ngrok-free.app/TAM/apartmentRule/getByApartment/2031869")
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched rules
        setRules(data);
      })
      .catch((error) => console.error("Error fetching rules:", error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, marginBottom: "50px" }} aria-label="caption table">
        <caption>Rules</caption>
        <TableHead>
          <TableRow>
            <TableCell>Rules</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell component="th" scope="row">
                {rule.ruleDescription}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Rules;
