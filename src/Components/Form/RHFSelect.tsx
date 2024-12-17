// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { FormControl, FormHelperText, InputLabel, Select, SelectProps } from "@mui/material";

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  children: React.ReactNode;
  onChangeText?: any;
  onKeyDown?: any;
  shouldClearValue?: boolean;
};

type Props = IProps & SelectProps;

export default function RHFSelect({
  name,
  children,
  onChangeText,
  label,
  onKeyDown,
  value,
  shouldClearValue,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (value) field.value = value;
        if (shouldClearValue) field.value = "";

        return (
          <FormControl sx={other.sx} fullWidth onChange={onChangeText} error={!!error}>
            <InputLabel id="select-label">{label}</InputLabel>
            <Select
              labelId="select-label"
              label={label}
              fullWidth
              autoComplete="disabled"
              MenuProps={{
                onKeyDown: onKeyDown,
              }}
              {...field}
              value={field.value === null || field.value === undefined ? "" : field.value}
              {...other}
            >
              {children}
            </Select>
            {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
