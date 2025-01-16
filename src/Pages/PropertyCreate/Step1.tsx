import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { StepWrapper } from "./styles";
import RHFTextField from "Components/Form/RHFTextField";
import RHFSelect from "Components/Form/RHFSelect";
import { useFormContext } from "react-hook-form";
import * as yup from "yup";
import { schemas } from "Schemas/Property";

const StepOne = () => {
  const { formState } = useFormContext<yup.InferType<typeof schemas>>();
  return (
    <StepWrapper>
      <RHFTextField
        variant="outlined"
        label="Property Name"
        name="step1.name"
        errorMessage={formState?.errors?.step1?.name?.message}
      />

      <RHFSelect label="Property Type" name="step1.propertyTypeID">
        <MenuItem value="1">Apartment</MenuItem>
        <MenuItem value="2">House</MenuItem>
        <MenuItem value="3">Villa</MenuItem>
      </RHFSelect>

      <RHFTextField
        name="step1.canSleepMax"
        label="Max. People"
        placeholder="0"
        type="number"
        errorMessage={formState?.errors?.step1?.canSleepMax?.message}
      />

      <RHFTextField
        name="step1.space"
        label="Total size"
        type="number"
        variant="outlined"
        errorMessage={formState?.errors?.step1?.space?.message}
      />

      <RHFTextField
        name="step1.floor"
        label="Floor number"
        type="number"
        placeholder="1"
        errorMessage={formState?.errors?.step1?.floor?.message}
      />

      <RHFTextField
        name="step1.street"
        label="Street"
        placeholder="Street1..."
        errorMessage={formState?.errors?.step1?.street?.message}
      />

      <RHFTextField
        name="step1.zipCode"
        label="Zip Code"
        placeholder="00-001"
        errorMessage={formState?.errors?.step1?.zipCode?.message}
      />

      <RHFSelect name="step1.detailedLocationID" label="City">
        <MenuItem value="8741">Honolulu</MenuItem>
        <MenuItem value="8742">Test</MenuItem>
      </RHFSelect>

      <RHFTextField
        name="step1.coordinates.longitude"
        label="Longitude"
        errorMessage={formState?.errors?.step1?.coordinates?.longitude?.message}
      ></RHFTextField>

      <RHFTextField
        name="step1.coordinates.latitude"
        label="Latitude"
        errorMessage={formState?.errors?.step1?.coordinates?.latitude?.message}
      ></RHFTextField>
    </StepWrapper>
  );
};

export default StepOne;
