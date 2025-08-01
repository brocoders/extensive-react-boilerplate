"use client";

import { Ref } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

export type SelectInputProps<T extends object> = {
  label: string;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  testId?: string;
  keyValue: keyof T;
  options: T[];
  size?: "small" | "medium";
  renderOption: (option: T) => React.ReactNode;
};

function SelectInput<T extends object>(
  props: SelectInputProps<T> & {
    name: string;
    value: T | undefined | null;
    onChange: (value: T) => void;
    onBlur: () => void;
    ref?: Ref<HTMLDivElement | null>;
  }
) {
  return (
    <FormControl fullWidth error={!!props.error} disabled={props.disabled}>
      <InputLabel id={`select-label-${props.name}`}>{props.label}</InputLabel>
      <Select
        ref={props.ref}
        labelId={`select-label-${props.name}`}
        id={`select-${props.name}`}
        size={props.size}
        value={props.value?.[props.keyValue]?.toString() ?? ""}
        label={props.label}
        inputProps={{ readOnly: props.readOnly }}
        onChange={(event) => {
          const newValue = props.options.find(
            (option) =>
              option[props.keyValue]?.toString() === event.target.value
          );
          if (!newValue) return;

          props.onChange(newValue);
        }}
        onBlur={props.onBlur}
        data-testid={props.testId}
        renderValue={() => {
          return props.value ? props.renderOption(props.value) : undefined;
        }}
      >
        {props.options.map((option) => (
          <MenuItem
            key={option[props.keyValue]?.toString()}
            value={option[props.keyValue]?.toString()}
          >
            {props.renderOption(option)}
          </MenuItem>
        ))}
      </Select>
      {!!props.error && (
        <FormHelperText data-testid={`${props.testId}-error`}>
          {props.error}
        </FormHelperText>
      )}
    </FormControl>
  );
}

function FormSelectInput<
  TFieldValues extends FieldValues = FieldValues,
  T extends object = object,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: SelectInputProps<T> &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <SelectInput<T>
          {...field}
          label={props.label}
          autoFocus={props.autoFocus}
          type={props.type}
          error={fieldState.error?.message}
          disabled={props.disabled}
          readOnly={props.readOnly}
          testId={props.testId}
          options={props.options}
          renderOption={props.renderOption}
          keyValue={props.keyValue}
          size={props.size}
        />
      )}
    />
  );
}

export default FormSelectInput;
