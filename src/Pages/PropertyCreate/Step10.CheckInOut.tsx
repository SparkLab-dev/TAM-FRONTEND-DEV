import { Box, Button, Grid, MenuItem } from "@mui/material";

import stepStyles from "./styles/stepgen.module.css";
import RHFTextField from "Components/Form/RHFTextField";
import { Add, DeleteOutline } from "@mui/icons-material";
import RHFSelect from "Components/Form/RHFSelect";
import { useState } from "react";

interface Fee {
  type?: string;
  from?: string;
  to?: string;
  fee?: string;
  cost: string;
}

export const CheckInOutStep: React.FC = () => {
  const [fees, setFees] = useState<Fee[]>([]);

  const addFee = () => {
    let temp = fees;
    temp.push({
      type: "",
      from: "",
      to: "",
      fee: "",
      cost: "",
    });
    setFees([...temp]);
  };
  return (
    <Box sx={{ width: "100%" }} className={stepStyles.StepWrapper}>
      <h2 className={stepStyles.stepHeading}>Check In / Check Out</h2>
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
          label="Check In From"
          name="CheckInFrom"
          sx={{ width: "250px" }}
        />

        <RHFTextField
          label="Check In To"
          name="CheckInTo"
          sx={{ width: "250px" }}
        />

        <RHFTextField
          label="Check Out Until"
          name="CheckOutUntil"
          sx={{ width: "250px" }}
        />

        <RHFTextField label="Place" name="Place" sx={{ width: "250px" }} /> */}
      </Grid>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "22px", fontWeight: "500" }}>Fee List</span>
        <Button
          onClick={() => addFee()}
          variant="outlined"
          sx={{ cursor: "pointer" }}
        >
          <Add /> Add fee
        </Button>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 4, md: 4 }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          margin: "16px 0px",
          padding: "16px",
        }}
      >
        {fees.map((fee, index) => (
          <Box className={stepStyles.mapOption}>
            <div className={stepStyles.top}>
              <span>Add/Edit fee</span>
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
              <RHFSelect
                label="Fee type"
                name="feetype"
                sx={{ width: "250px" }}
              >
                <MenuItem>Late Checkin</MenuItem>
                <MenuItem>Early Checkout</MenuItem>
                <MenuItem>Flexible</MenuItem>
              </RHFSelect>
              {/* <RHFTextField label="From" name="from" sx={{ width: "250px" }} />
              <RHFTextField label="To" name="to" sx={{ width: "250px" }} />
              <RHFTextField label="Cost" name="Cost" sx={{ width: "250px" }} /> */}
              <Button onClick={() => console.clear()} variant="outlined">
                save
              </Button>
            </Grid>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
