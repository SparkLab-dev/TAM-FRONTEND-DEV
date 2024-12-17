// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Autocomplete, AutocompleteProps, FormControl, InputAdornment, TextField } from '@mui/material';
import { orderBy } from 'lodash';
import { ReactElement, forwardRef } from 'react';
import { validate } from 'uuid';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------
type TOption = {
  label: string;
  data?: any;
  value: string | number | boolean | null;
};

type IProps = {
  name: string;
  label: string;
  options: TOption[];
  value?: string;
  sort?: boolean;
  onChangeText?: any;
  disableKeyPress?: boolean;
  disableFreeSolo?: boolean;
  shouldClearValue?: boolean;
  onSelectChange?: any;
  startAdornment?: ReactElement;
  endAdornment?: ReactElement;
  disableAutoSelect?: boolean;
  onClear?: VoidFunction;
  error?: any;
  onClose?: VoidFunction;
  shouldFitWidth?: boolean;
  placeholder?: string;
  showErrorMsg?: boolean;
  showTick?: boolean;
};

type Props = Omit<AutocompleteProps<any, undefined, boolean | undefined, boolean | undefined>, 'renderInput'> & IProps;

const RHFSingleSelect = forwardRef(
  (
    {
      name,
      options,
      label,
      value,
      onChangeText,
      onSelectChange,
      disableAutoSelect,
      disableClearable,
      disableKeyPress,
      shouldClearValue,
      disableFreeSolo,
      startAdornment,
      endAdornment,
      placeholder,
      shouldFitWidth,
      onClear,
      onClose,
      sort = true,
      showErrorMsg = true,
      showTick = false,
      ...other
    }: Props,
    ref
  ) => {
    const { control, setValue } = useFormContext();
    const placeholderValue = placeholder || 'Search';
    const sortedOptions = orderBy(
      options,
      [
        // Primary criteria: Whether the string starts with a number
        (item) => !/^\d/.test(item.label),
        // Secondary criteria: Extract the leading numeric part, or 0 if not present
        (item) => parseInt(item.label.match(/^\d+/)?.[0] || 0, 10),
        // Tertiary criteria: Compare the entire string alphabetically
        (item) => item.label.trim().toLowerCase(),
      ],
      ['asc', 'asc', 'asc']
    );
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          if (value) field.value = value;
          if (shouldClearValue || value?.trim()?.length === 0) field.value = '';
          return (
            <FormControl fullWidth error={!!error}>
              <Autocomplete
                data-test={name}
                onClose={onClose}
                freeSolo={!disableFreeSolo}
                clearOnBlur
                openOnFocus={true}
                disableClearable={disableClearable}
                onChange={(_, newValue: any, reason: string) => {
                  let selectedOption: any = {};
                  if (typeof newValue === 'object' && newValue !== null) {
                    selectedOption = options?.find((option) => option.value === newValue.value);
                  } else if (typeof newValue === 'string') {
                    selectedOption = options?.find((option) => option.label === newValue);
                    if (selectedOption === undefined && newValue && !disableFreeSolo) {
                      selectedOption = { value: newValue };
                    }
                  }
                  if (onSelectChange) return onSelectChange(selectedOption, reason);
                  field.onChange(selectedOption.value || null);
                }}
                onInputChange={(_, newValue: any, reason: string) => {
                  if (reason === 'clear') {
                    onClear && onClear();
                    setValue(field.name, '');
                  }
                }}
                autoSelect={!disableAutoSelect}
                value={options?.find((option: TOption) => option.value === field.value) ?? null}
                options={sort ? sortedOptions : options}
                getOptionLabel={(option: string | TOption) => (option as TOption)?.label || ''}
                {...other}
                renderInput={({ InputProps, ...params }: any) => {
                  let inputValue = '';
                  const option: TOption = options?.find((option) => option.value === field.value);

                  if (option) {
                    inputValue = option.label;
                  } else {
                    if (!disableFreeSolo) {
                      const isUUID = validate(field.value);
                      inputValue = isUUID || !field.value ? '' : field.value;
                    }
                  }

                  return (
                    <TextField
                      inputRef={ref}
                      {...params}
                      InputProps={{
                        ...InputProps,
                        ...(endAdornment ? { endAdornment } : {}),
                        startAdornment: showTick ? (
                          <InputAdornment position="start">
                            <Iconify icon="teenyicons:tick-circle-solid" sx={{ fontSize: '25px', color: 'primary.main' }} />
                          </InputAdornment>
                        ) : undefined,
                      }}
                      onChange={(e) => {
                        if (!disableFreeSolo) setValue(field.name, e.target.value);
                      }}
                      onKeyPress={
                        disableKeyPress
                          ? (e) => {
                              e.preventDefault();
                            }
                          : undefined
                      }
                      label={label}
                      placeholder={onChangeText || startAdornment ? placeholderValue : undefined}
                      helperText={showErrorMsg ? error?.message : null}
                      error={!!error}
                      inputProps={{
                        ...params.inputProps,
                        ...(!disableFreeSolo && { value: inputValue }),
                      }}
                    />
                  );
                }}
                componentsProps={shouldFitWidth ? { popper: { style: { width: 'fit-content' } } } : {}}
              />
            </FormControl>
          );
        }}
      />
    );
  }
);

export default RHFSingleSelect;
