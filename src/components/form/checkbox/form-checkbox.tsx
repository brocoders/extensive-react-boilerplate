"use client";

import { ForwardedRef, forwardRef } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

type CheckboxInputProps<T> = {
  label: string;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  testId?: string;
  keyValue: keyof T;
  options: T[];
  keyExtractor: (option: T) => string;
  renderOption: (option: T) => React.ReactNode;
};

function CheckboxInputRaw<T>(
  props: CheckboxInputProps<T> & {
    name: string;
    value: T[] | undefined | null;
    onChange: (value: T[]) => void;
    onBlur: () => void;
  },
  ref?: ForwardedRef<HTMLDivElement | null>
) {
  const value = props.value ?? [];
  const onChange = (checkboxValue: T) => () => {
    const isExist = value
      .map((option) => option[props.keyValue])
      .includes(checkboxValue[props.keyValue]);

    const newValue = isExist
      ? value.filter(
          (option) => option[props.keyValue] !== checkboxValue[props.keyValue]
        )
      : [...value, checkboxValue];

    props.onChange(newValue);
  };
  return (
    <FormControl
      data-testid={props.testId}
      component="fieldset"
      variant="standard"
      error={!!props.error}
    >
      <FormLabel component="legend" data-testid={`${props.testId}-label`}>
        {props.label}
      </FormLabel>
      <FormGroup ref={ref}>
        {props.options.map((option) => (
          <FormControlLabel
            key={props.keyExtractor(option)}
            control={
              <Checkbox
                checked={value
                  .map((valueOption) => valueOption[props.keyValue])
                  .includes(option[props.keyValue])}
                onChange={onChange(option)}
                name={props.name}
                data-testid={`${props.testId}-${props.keyExtractor(option)}`}
              />
            }
            label={props.renderOption(option)}
          />
        ))}
      </FormGroup>
      {!!props.error && (
        <FormHelperText data-testid={`${props.testId}-error`}>
          {props.error}
        </FormHelperText>
      )}
    </FormControl>
  );
}

const CheckboxInput = forwardRef(CheckboxInputRaw) as never as <T>(
  props: CheckboxInputProps<T> & {
    name: string;
    value: T[] | undefined | null;
    onChange: (value: T[]) => void;
    onBlur: () => void;
  } & { ref?: ForwardedRef<HTMLDivElement | null> }
) => ReturnType<typeof CheckboxInputRaw>;

function FormCheckboxInput<
  TFieldValues extends FieldValues = FieldValues,
  T = unknown,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: CheckboxInputProps<T> &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <CheckboxInput<T>
          {...field}
          label={props.label}
          autoFocus={props.autoFocus}
          type={props.type}
          error={fieldState.error?.message}
          disabled={props.disabled}
          readOnly={props.readOnly}
          testId={props.testId}
          options={props.options}
          keyValue={props.keyValue}
          keyExtractor={props.keyExtractor}
          renderOption={props.renderOption}
        />
      )}
    />
  );
}

export default FormCheckboxInput;
