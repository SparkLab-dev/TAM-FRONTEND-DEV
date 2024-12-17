// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  value?: string | number;
  name: string;
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({ name, value, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (value) field.value = value;

        return (
          <TextField
            data-test={name}
            value={field.value || ''}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(event.target.value ? Number(event.target.value) : '');
              } else {
                field.onChange(event);
              }
            }}
            fullWidth
            autoComplete="disabled"
            error={!!error}
            type={type}
            {...other}
          />
        );
      }}
    />
  );
}
