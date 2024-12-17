import { TimePickerProps } from '@mui/lab';
import { SxProps } from '@mui/material';
import { Box } from '@mui/system';
import { TimePicker } from '@mui/x-date-pickers-pro';
import { Controller, useFormContext } from 'react-hook-form';

type CustomProps = {
  name: string;
  label: string;
};

type Props = CustomProps & TimePickerProps<any>;

const formatTimeAmPm = (dateStr: string) => {
  const date = new Date(dateStr);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutesStr + ' ' + ampm;
};

export default function RHFTimePicker({ name, label, ...other }: Props) {
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
      render={({ field, fieldState: { error } }) => (
        <>
          <TimePicker
            {...field}
            ampm={false}
            timezone={'UTC'}
            value={field.value ? new Date(field.value) : null}
            onChange={(value) => {
              if (!value) return field.onChange(value);
              if (!Number.isNaN(new Date(value).getTime())) {
                return field.onChange(value.toISOString());
              }
            }}
            label={label}
            {...other}
            slotProps={{
              textField: { variant: 'outlined', fullWidth: true, error: !!error, helperText: error?.message },
              popper: { sx: popperSx },
            }}
          />
          {field.value && <Box sx={{ fontSize: '11px', color: '#919EAB', ml: '10px' }}>{formatTimeAmPm(field.value)}</Box>}
        </>
      )}
    />
  );
}
