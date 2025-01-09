import { Box, Card } from "@mui/material";
import RHFTextField from "Components/Form/RHFTextField";

export const PricingTab: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <RHFTextField
        label="Deposit"
        name="securityDeposit.depositTypeID"
        errorMessage=""
      />

      <RHFTextField
        label="Security Deposit"
        name="securityDeposit.amount"
        errorMessage=""
      />
    </Box>
  );
};
