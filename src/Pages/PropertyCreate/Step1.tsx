import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { StepWrapper } from "./styles";
import RHFTextField from "Components/Form/RHFTextField";
import RHFSelect from "Components/Form/RHFSelect";

export default () => {
  return (
    <StepWrapper>
      <RHFTextField variant="outlined" name="name" label="Property Name" />

      <RHFSelect label="Property Type" name="propertyTypeID">
        <MenuItem value="1">Apartment</MenuItem>
        <MenuItem value="2">House</MenuItem>
      </RHFSelect>

      <RHFTextField name="canSleepMax" label="Max. People" placeholder="0" type="number" />

      <RHFTextField name="space" label="Total size" type="number" variant="outlined" />

      <RHFTextField name="floor" label="Floor number" type="number" placeholder="1" />
      <div></div>
      <RHFTextField name="street" label="Street" placeholder="Street1..." />

      <RHFTextField name="zipCode" label="Zip Code" placeholder="00-001" />

      <RHFSelect name="detailedLocationID" label="City">
        <MenuItem value="8741">Honolulu</MenuItem>
        <MenuItem value="8742">Test</MenuItem>
      </RHFSelect>

      <div></div>
      <RHFTextField name="coordinates.longitude" label="Longitude"></RHFTextField>

      <RHFTextField name="coordinates.latitude" label="Latitude"></RHFTextField>
    </StepWrapper>
  );
};
