// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, AutocompleteProps, Checkbox, Chip, FormControl, FormHelperText, SxProps, TextField } from '@mui/material';
import { capitalCase } from 'change-case';
import { orderBy } from 'lodash';
import React, { ReactElement, useLayoutEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options: any[];
  onChangeText?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rows?: number;
  dataField?: string;
  label: string;
  showValueOnChip?: boolean;
  onBlur?: () => void;
  chipSx?: SxProps;
  showCountBox?: boolean;
  countBoxSx?: SxProps;
  disableFreeSolo?: boolean;
  autoSelect?: boolean;
  onSelectChange?: (event: any, newValue: any) => void;
  error?: boolean;
  disableCapitalCase?: boolean;
  endAdornment?: ReactElement;
  value?: any;
};

type Props = IProps & Omit<AutocompleteProps<any, boolean, boolean | undefined, boolean | undefined>, 'renderInput'>;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function RHFMultiSelectCheckBox({
  name,
  options,
  label,
  dataField,
  onChangeText,
  disableFreeSolo,
  autoSelect,
  onBlur,
  disableCapitalCase,
  onSelectChange,
  chipSx = {},
  showCountBox = false,
  countBoxSx = {},
  showValueOnChip,
  error,
  endAdornment,
  value,
  ...other
}: Props) {
  const { control } = useFormContext();
  const [limitTags, setLimitTags] = useState(10);
  const [interactingWithSelect, setInteractingWithSelect] = useState(1);
  const autocompleteRef = useRef<any>(null);
  const chipsRef = useRef<any>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const sortedOptions = orderBy(
    options,
    [
      (o) => {
        const option = typeof o === 'object' && 'label' in o ? o.label : o;
        return !/^\d/.test(option as string);
      },
      (o) => {
        const option = typeof o === 'object' && 'label' in o ? o.label : o;
        return parseInt((option as string).match(/^\d+/)?.[0] || '0', 10);
      },
      (o) => {
        const option = typeof o === 'object' && 'label' in o ? o.label : o;
        return (option as string).trim().toLowerCase();
      },
    ],
    ['asc', 'asc', 'asc']
  );

  const measureAutocompleteWidth = () => {
    if (autocompleteRef.current) {
      const autocompleteWidth = autocompleteRef?.current?.offsetWidth;

      for (let index = 0; index < chipsRef.current.length; index++) {
        const chipsWidthAndSearch = calcSelectedChipsWidth(index + 1);

        if (chipsWidthAndSearch > autocompleteWidth) {
          setLimitTags(() => index + 1);
          break;
        }
      }
    }
  };

  const calcSelectedChipsWidth = (size: number) => {
    const sum = chipsRef.current
      .filter(Boolean)
      .slice(0, size)
      .reduce((sum: number, el: HTMLElement) => (sum += el?.offsetWidth), 0);
    return sum + 150; // 150 width of input search box + close and chevron icon;
  };

  const handleResize = () => {
    const newWidth = window.innerWidth;
    if (newWidth !== windowWidth) {
      setLimitTags((prev) => (newWidth > windowWidth ? prev + 1 : prev - 1));
      measureAutocompleteWidth();
      setWindowWidth(newWidth);
    }
  };

  useLayoutEffect(() => {
    measureAutocompleteWidth();
  }, [autocompleteRef, interactingWithSelect, chipsRef, sortedOptions]);

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <Autocomplete
            ref={autocompleteRef}
            sx={{
              '& .MuiOutlinedInput-root': {
                flexWrap: 'nowrap',
              },
              '& .MuiInputBase-root': {
                display: 'flex',
                flexWrap: 'nowrap',
              },
            }}
            multiple
            data-test={name}
            id="checkboxes-tags-demo"
            options={sortedOptions.filter((option, index, self) => {
              if (option?.label && option?.value) {
                return index === self.findIndex((t) => t.value === option.value && t.label === option.label);
              }
              return true;
            })}
            disableCloseOnSelect
            value={value ? value : field.value === null || field.value === undefined ? [] : field.value}
            getOptionLabel={(option) => {
              return option.label || option.length > 3 ? capitalCase(option.label || option) : option;
            }}
            isOptionEqualToValue={(option, value) => {
              if (option.value) {
                return option.value === value?.value;
              }
              return option === value;
            }}
            onChange={(event, newValue) => {
              // needed to trigger calculations
              setInteractingWithSelect((prev) => prev + 1);

              if (onSelectChange) return onSelectChange(event, newValue);
              field.onChange(newValue);
            }}
            onInputChange={(_, newValue, reason) => {
              if (reason === 'clear') setLimitTags(() => 10);
            }}
            renderOption={(props, option, { selected }) => {
              let displayText;
              if (typeof option === 'string') {
                displayText = option.length > 3 ? capitalCase(option) : option;
              } else {
                displayText = showValueOnChip ? option?.value : option?.label;
              }
              return (
                <li {...props}>
                  <Checkbox
                    key={option.value || option}
                    icon={icon}
                    size="small"
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {displayText}
                </li>
              );
            }}
            renderInput={(params) => {
              return (
                <TextField
                  onChange={onChangeText}
                  onBlur={onBlur}
                  {...params}
                  label={label}
                  error={!!error}
                  InputProps={{
                    ...params.InputProps,
                    ...(endAdornment ? { endAdornment } : {}),
                  }}
                  inputProps={{ ...params.inputProps }}
                />
              );
            }}
            renderTags={(value, getTagProps) => {
              const additionalValueCount = value.length - limitTags;

              return (
                <>
                  {value.slice(0, limitTags).map((option, index) => {
                    let displayText;
                    if (typeof option === 'string') {
                      displayText = option.length > 3 ? (!disableCapitalCase ? capitalCase(option) : option) : option;
                    } else {
                      displayText = showValueOnChip ? option?.value : option?.label;
                    }

                    if (sortedOptions && sortedOptions.length > 0) {
                      const matchedOption = sortedOptions.find((opt) => opt.value === option);
                      if (matchedOption) {
                        displayText = matchedOption.label;
                      }
                    }

                    // Only render a chip if it's the first type of this accessorial
                    //THIS LOGIC HERE NEEDS TO BE IN ACCESSORIAL COMPONENT NOT IN RHF
                    if (index === 0 || option.value || option !== value[index - 1] || value[index - 1].value) {
                      return (
                        <Chip
                          {...getTagProps({ index })}
                          key={option?.value + index}
                          size="small"
                          label={displayText}
                          ref={(el) => (chipsRef.current[index] = el)}
                          sx={{
                            ...chipSx,
                            // apply styles to the last chip that fits the screen
                            textOverflow: index + 1 === limitTags ? 'ellipsis' : 'initial',
                            whiteSpace: index + 1 === limitTags ? 'nowrap' : 'initial',
                            overflow: index + 1 === limitTags ? 'hidden' : 'initial',
                            minWidth: index + 1 === limitTags ? (showCountBox ? '50px' : '60px') : 'inherit',
                          }}
                        />
                      );
                    }
                    // Return null if no chip should be rendered
                    return null;
                  })}
                  {additionalValueCount > 0 && showCountBox ? (
                    <Chip size="small" label={`+${additionalValueCount}`} sx={{ ...countBoxSx }} />
                  ) : (
                    additionalValueCount > 0 && ' ... '
                  )}
                </>
              );
            }}
            {...other}
          />
          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
