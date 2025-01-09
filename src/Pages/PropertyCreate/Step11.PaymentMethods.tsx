import { Box, Button, Grid, MenuItem } from "@mui/material";

import stepStyles from "./styles/stepgen.module.css";
import RHFTextField from "Components/Form/RHFTextField";
import { Add, DeleteOutline } from "@mui/icons-material";
import RHFSelect from "Components/Form/RHFSelect";
import { useState } from "react";

interface PMethod {
  id?: number;
  methodName: string;
  idPaymentMethod?: number;
}

interface PaymentMethod {
  value: string;
  label: string;
}

const paymentMethods: PaymentMethod[] = [
  { value: "credit_card", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "crypto", label: "Cryptocurrency" },
  { value: "flexible", label: "Flexible" },
  // Add more payment methods as needed
];

export const PaymentMethodStep: React.FC = () => {
  const [methods, setMethods] = useState<PMethod[]>([]);

  const addFee = () => {
    let temp = methods;
    temp.push({
      methodName: "",
    });
    setMethods([...temp]);
  };
  return (
    <Box sx={{ width: "100%" }} className={stepStyles.StepWrapper}>
      <h2 className={stepStyles.stepHeading}>Payment Methods</h2>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "22px", fontWeight: "500" }}></span>
        <Button
          onClick={() => addFee()}
          variant="outlined"
          sx={{ cursor: "pointer" }}
        >
          <Add /> Add
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
        {methods.map((fee, index) => (
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
                label="Payment Method"
                name="Payment Method"
                sx={{ width: "250px" }}
              >
                {paymentMethods.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFTextField
                label="Description"
                name="paymentMethods.methodName"
                sx={{ width: "50%" }}
                errorMessage=""
              />

              <Button onClick={() => console.clear()} variant="contained">
                save
              </Button>
            </Grid>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
