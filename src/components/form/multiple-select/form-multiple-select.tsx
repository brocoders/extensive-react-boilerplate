"use client";

import { ForwardedRef, forwardRef } from "react";
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
import OutlinedInput from "@mui/material/OutlinedInput";

type MultipleSelectInputProps<T extends object> = {
  label: string;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  testId?: string;
  keyValue: keyof T;
  options: T[];
  renderValue: (option: T[]) => React.ReactNode;
  renderOption: (option: T) => React.ReactNode;
};

function MultipleSelectInputRaw<T extends object>(
  props: MultipleSelectInputProps<T> & {
    name: string;
    value: T[] | undefined | null;
    onChange: (value: T[]) => void;
    onBlur: () => void;
  },
  ref?: ForwardedRef<HTMLDivElement | null>
) {
  return (
    <FormControl fullWidth error={!!props.error} disabled={props.disabled}>
      <InputLabel id={`select-label-${props.name}`}>{props.label}</InputLabel>
      <Select
        ref={ref}
        labelId={`select-label-${props.name}`}
        id={`select-${props.name}`}
        value={props.value?.map(
          (value) => value?.[props.keyValue]?.toString() ?? ""
        )}
        input={<OutlinedInput label={props.label} />}
        multiple
        inputProps={{
          readOnly: props.readOnly,
        }}
        onChange={(event) => {
          const value = event.target.value;
          const selectedStrings =
            typeof value === "string" ? value.split(",") : value;

          const newValue = selectedStrings
            .map((selectedString) => {
              const option = props.options.find(
                (option) =>
                  option[props.keyValue]?.toString() === selectedString
              );

              if (!option) return undefined;

              return option;
            })
            .filter((option) => option !== undefined) as T[];

          props.onChange(newValue);
        }}
        onBlur={props.onBlur}
        data-testid={props.testId}
        renderValue={() => {
          return props.value ? props.renderValue(props.value) : undefined;
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

const MultipleSelectInput = forwardRef(MultipleSelectInputRaw) as never as <
  T extends object,
>(
  props: MultipleSelectInputProps<T> & {
    name: string;
    value: T | undefined | null;
    onChange: (value: T) => void;
    onBlur: () => void;
  } & { ref?: ForwardedRef<HTMLDivElement | null> }
) => ReturnType<typeof MultipleSelectInputRaw>;

function FormMultipleSelectInput<
  TFieldValues extends FieldValues = FieldValues,
  T extends object = object,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MultipleSelectInputProps<T> &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <MultipleSelectInput<T>
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
          renderValue={props.renderValue}
          keyValue={props.keyValue}
        />
      )}
    />
  );
}

export default FormMultipleSelectInput;
