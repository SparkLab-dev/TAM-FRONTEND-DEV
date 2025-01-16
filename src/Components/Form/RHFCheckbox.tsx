// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel, FormControlLabelProps } from '@mui/material';

// ----------------------------------------------------------------------

interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  checked?: boolean;
}

export function RHFCheckbox({ name, checked, disabled, ...other }: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              data-test={name}
              disabled={disabled}
              checked={checked || field.value || false}
              onChange={(event, checked) => {
                other.onChange ? other.onChange(event, checked) : field.onChange(event, checked);
              }}
            />
          )}
        />
      }
      {...other}
    />
  );
}
