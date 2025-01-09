import { Box, Button, Grid, MenuItem } from "@mui/material";
import stepStyles from "./styles/stepgen.module.css";
import { Add, DeleteOutline, EditAttributes } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import RHFTextField from "Components/Form/RHFTextField";
import RHFSelect from "Components/Form/RHFSelect";

interface CancelationPolicyType {
  validFrom: number;
  validTo: number;
  percentage: number;
}

export const CancellationPoliciesStep: React.FC = () => {
  const [cancellationPolicies, setCancellationPolicies] = useState<
    CancelationPolicyType[]
  >([]);

  const [editing, setEditing] = useState<boolean>(false);

  const [validFrom, setValidFrom] = useState<number>(0);
  const [validTo, setValidTo] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  const addPolicy = () => {
    let temp = cancellationPolicies;
    temp.push({ validFrom, validTo, percentage });
    setCancellationPolicies(temp);
    setEditing(false);
    setValidFrom(0);
    setValidTo(0);
    setPercentage(0);
  };
  return (
    <Box sx={{ width: "100%" }} className={stepStyles.StepWrapper}>
      <h2 className={stepStyles.stepHeading}>Cancelation Policy</h2>
      <Button
        onClick={() => setEditing(true)}
        variant="outlined"
        sx={{ cursor: "pointer", width: "10rem" }}
      >
        <Add /> Add
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell align="right">To</TableCell>
              <TableCell align="right">Charge</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cancellationPolicies.map((row) => (
              <TableRow
                key={row.validFrom}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.validFrom}
                </TableCell>
                <TableCell align="right">{row.validTo}</TableCell>
                <TableCell align="right">{row.percentage}</TableCell>
                <TableCell align="right">
                  <EditIcon sx={{ color: "blue", cursor: "pointer" }} />
                  <DeleteOutline sx={{ color: "red", cursor: "pointer" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editing === true && (
        <Box className={stepStyles.mapOption}>
          <div className={stepStyles.top}>
            <span>Add/Edit Terms and condition</span>
            <DeleteOutline sx={{ color: "red", cursor: "pointer" }} />
          </div>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 4, md: 4 }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            {/* <RHFTextField
              label="From"
              name="from"
              type="number"
              value={validFrom}
              onChange={(e) => setValidFrom(Number(e.target.value))}
              sx={{ width: "250px" }}
            />

            <RHFTextField
              label="To"
              name="to"
              type="number"
              value={validTo}
              onChange={(e) => setValidTo(Number(e.target.value))}
              sx={{ width: "250px" }}
            /> */}
            {/* <RHFTextField
              label="Percentage"
              name="Percentage"
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              sx={{ width: "250px" }}
            /> */}

            <Button onClick={() => addPolicy()} variant="contained">
              save
            </Button>
          </Grid>
        </Box>
      )}
    </Box>
  );
};
