import { getLocaleDateFormat } from '@g2mint/shared';
import { MobileDateTimePickerProps } from '@mui/lab';
import { DateTimePicker } from '@mui/x-date-pickers-pro';
import { Controller, useFormContext } from 'react-hook-form';

type CustomProps = {
  name: string;
  label: string;
};

type Props = CustomProps & MobileDateTimePickerProps<any>;

export default function RHFDateTimePicker({ name, label, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
          {...field}
          value={field.value ? new Date(field.value) : null}
          onChange={(value) => {
            if (!value) return field.onChange(value);
            if (!Number.isNaN(new Date(value).getTime())) return field.onChange(value.toISOString());
          }}
          label={label}
          format={`${getLocaleDateFormat()} hh:mm a`}
          {...other}
          slotProps={{ textField: { variant: 'outlined', fullWidth: true, error: !!error, helperText: error?.message } }}
        />
      )}
    />
  );
}
