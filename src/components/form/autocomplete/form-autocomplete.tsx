"use client";

import { Ref } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";

export type AutocompleteInputProps<T> = {
  label: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  testId?: string;
  size?: "small" | "medium";
  value: T | null;
  options: T[];
  renderOption: (option: T) => React.ReactNode;
  getOptionLabel: (option: T) => string;
};

function AutocompleteInput<T>(
  props: AutocompleteInputProps<T> & {
    name: string;
    value: T | undefined | null;
    onChange: (value: T) => void;
    onBlur: () => void;
    ref?: Ref<HTMLDivElement | null>;
  }
) {
  return (
    <FormControl error={!!props.error} disabled={props.disabled} fullWidth>
      <Autocomplete
        ref={props.ref}
        id={`autocomplete-${props.name}`}
        options={props.options}
        value={props.value}
        onChange={(_, newValue) => {
          if (!newValue) return;

          props.onChange(newValue);
        }}
        onBlur={props.onBlur}
        data-testid={props.testId}
        getOptionLabel={props.getOptionLabel}
        renderOption={(htmlProps, option) => (
          <li {...htmlProps}>{props.renderOption(option)}</li>
        )}
        renderInput={(params) => (
          <TextField {...params} label={props.label} size={props.size} />
        )}
      />
      {!!props.error && (
        <FormHelperText data-testid={`${props.testId}-error`}>
          {props.error}
        </FormHelperText>
      )}
    </FormControl>
  );
}

function FormAutocompleteInput<
  TFieldValues extends FieldValues = FieldValues,
  T = unknown,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: AutocompleteInputProps<T> &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <AutocompleteInput<T>
          {...field}
          label={props.label}
          autoFocus={props.autoFocus}
          error={fieldState.error?.message}
          disabled={props.disabled}
          readOnly={props.readOnly}
          testId={props.testId}
          options={props.options}
          renderOption={props.renderOption}
          getOptionLabel={props.getOptionLabel}
          size={props.size}
          value={props.value}
        />
      )}
    />
  );
}

export default FormAutocompleteInput;
