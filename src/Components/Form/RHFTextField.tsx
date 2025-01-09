// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { TextField, TextFieldProps } from "@mui/material";
import { ValidSchemaKeys } from "Types/PropertyTypes";
import { schemas } from "Schemas/Property";
import * as yup from "yup";

// ----------------------------------------------------------------------

type IProps = {
  value?: string;
  name: ValidSchemaKeys | any;
  errorMessage: string | undefined;
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({
  errorMessage,
  name,
  value,
  type,
  ...other
}: Props) {
  const { control } = useFormContext<yup.InferType<typeof schemas> | any>();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          if (value) field.value = value;

          return (
            <TextField
              data-test={name}
              value={field.value || ""}
              onChange={(event) => {
                if (type === "number") {
                  field.onChange(
                    event.target.value ? Number(event.target.value) : ""
                  );
                } else {
                  field.onChange(event);
                }
              }}
              fullWidth
              autoComplete="disabled"
              error={!!error || error}
              type={type}
              helperText={error?.message || errorMessage}
              {...other}
            />
          );
        }}
      />
    </div>
  );
}
