// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Autocomplete, AutocompleteProps, Chip, FormControl, TextField } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options: any[];
  onChangeText?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rows?: number;
  dataField?: string;
  label: string;
  showValueOnChip?: boolean;
  disableFreeSolo?: boolean;
  autoSelect?: boolean;
  onFocus?: () => void;
  onSelectChange?: (event: any, newValue: any) => void;
  error?: boolean;
};

type Props = IProps & Omit<AutocompleteProps<any, boolean, boolean | undefined, boolean | undefined>, 'renderInput'>;

export default function RHFMultiSelect({
  name,
  options,
  label,
  dataField,
  onChangeText,
  onFocus,
  disableFreeSolo,
  autoSelect,
  onSelectChange,
  showValueOnChip,
  error,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl fullWidth error={!!error}>
            <Autocomplete
              data-test={name}
              multiple
              freeSolo={!disableFreeSolo}
              value={field.value || []}
              autoSelect={autoSelect}
              onChange={(event, newValue) => {
                if (!newValue) return;
                if (typeof newValue[newValue?.length - 1] === 'string') return;

                if (onSelectChange) return onSelectChange(event, newValue);

                field.onChange(newValue);
              }}
              options={options?.map((option) => option) || []}
              renderTags={(value, getTagProps) => {
                return value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option?.value + index}
                    size="small"
                    label={showValueOnChip ? option?.value : option?.label}
                  />
                ));
              }}
              {...other}
              renderInput={(params) => (
                <TextField
                  onChange={onChangeText}
                  multiline
                  label={label}
                  onFocus={onFocus}
                  placeholder={onChangeText ? 'Search' : undefined}
                  error={!!error}
                  helperText={error?.message}
                  {...params}
                />
              )}
            />
          </FormControl>
        );
      }}
    />
  );
}
