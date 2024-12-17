import { getLocaleDateFormat } from '@g2mint/shared';
import { DatePickerProps } from '@mui/lab';
import { SxProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers-pro';
import { Controller, useFormContext } from 'react-hook-form';

type CustomProps = {
  name: string;
  label: string;
};

type Props = CustomProps & DatePickerProps<any>;

export default function RHFDate({ name, label, ...other }: Props) {
  const { control } = useFormContext();

  const popperSx: SxProps = {
    '& .MuiPaper-root': {
      borderRadius: '4px',
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <DatePicker
            {...field}
            data-test={name}
            value={field.value ? new Date(field.value) : null}
            onChange={(value) => {
              error = undefined;
              if (!value) return field.onChange(value);
              if (value instanceof Date && !isNaN(value as any)) {
                if (value.toISOString()) field.onChange(value.toISOString());
              }
            }}
            label={label}
            format={getLocaleDateFormat()}
            {...other}
            slotProps={{
              textField: {
                variant: 'outlined',
                fullWidth: true,
                error: !!error,
                helperText: error?.message && error.message !== ' ' ? error.message : null,
              },
              popper: { sx: popperSx },
            }}
          />
        );
      }}
    />
  );
}
