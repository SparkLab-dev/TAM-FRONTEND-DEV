import { Box, Card } from "@mui/material";
import RHFTextField from "Components/Form/RHFTextField";
import { useFormContext } from "react-hook-form";
import { schemas } from "Schemas/Property";
import * as yup from "yup";

export const PricingTab: React.FC = () => {
  const { control, setValue, getValues, formState } = useFormContext<yup.InferType<typeof schemas>>();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h4 className="text-blue-500 font-bold text-xl">Seasonal Prices</h4>
      <div>
        <RHFTextField
          label="Number of guest"
          type="number"
          name="step7.standardGuests"
          errorMessage={formState.errors.step7?.standardGuests?.message}
        />
      </div>
      <div>
        <RHFTextField
          label="Minimum stay period"
          type="number"
          name="step7.minStay"
          errorMessage={formState.errors.step7?.minStay?.message}
        />
      </div>
    </Box>
  );
};
