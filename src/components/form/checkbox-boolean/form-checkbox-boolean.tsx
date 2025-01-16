"use client";

import { ChangeEvent, ForwardedRef, forwardRef } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

export type CheckboxBooleanInputProps = {
  label: string;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  testId?: string;
};

function CheckboxBooleanInputRaw(
  props: CheckboxBooleanInputProps & {
    name: string;
    value: boolean | null;
    onChange: (value: boolean) => void;
    onBlur: () => void;
  },
  ref?: ForwardedRef<HTMLDivElement | null>
) {
  const value = props.value ?? false;
  const onChange = (
    event: ChangeEvent<HTMLInputElement>,
    checkboxValue: boolean
  ) => {
    props.onChange(checkboxValue);
  };
  return (
    <FormControl
      data-testid={props.testId}
      component="fieldset"
      variant="standard"
      error={!!props.error}
    >
      <FormGroup ref={ref}>
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={onChange}
              name={props.name}
              data-testid={`${props.testId}-checkbox`}
            />
          }
          label={props.label}
        />
      </FormGroup>
      {!!props.error && (
        <FormHelperText data-testid={`${props.testId}-error`}>
          {props.error}
        </FormHelperText>
      )}
    </FormControl>
  );
}

const CheckboxBooleanInput = forwardRef(CheckboxBooleanInputRaw) as never as (
  props: CheckboxBooleanInputProps & {
    name: string;
    value: boolean | null;
    onChange: (value: boolean) => void;
    onBlur: () => void;
  } & { ref?: ForwardedRef<HTMLDivElement | null> }
) => ReturnType<typeof CheckboxBooleanInputRaw>;

function FormCheckboxBooleanInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: CheckboxBooleanInputProps &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <CheckboxBooleanInput
          {...field}
          label={props.label}
          autoFocus={props.autoFocus}
          type={props.type}
          error={fieldState.error?.message}
          disabled={props.disabled}
          readOnly={props.readOnly}
          testId={props.testId}
        />
      )}
    />
  );
}

export default FormCheckboxBooleanInput;
