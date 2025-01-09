import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

interface AdditionalFees {
  feeTaxType?: number;
  discriminatorID?: number;
  order: number;
  value: number;
}
export const FeesTab: React.FC = () => {
  const [feeList, setFeeList] = useState<AdditionalFees[]>([]);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tax type</TableCell>
              <TableCell align="right">Tax Id</TableCell>
              <TableCell align="right">Order</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feeList.map((row) => (
              <TableRow
                key={row.feeTaxType}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.discriminatorID}
                </TableCell>
                <TableCell align="right">{row.order}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
                <TableCell align="right">
                  <EditIcon sx={{ color: "blue", cursor: "pointer" }} />
                  <DeleteOutline sx={{ color: "red", cursor: "pointer" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
