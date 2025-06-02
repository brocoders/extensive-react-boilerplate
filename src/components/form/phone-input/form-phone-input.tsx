"use client";

import "react-phone-input-2/lib/style.css";
import { ForwardedRef, forwardRef } from "react";
import PhoneInput from "react-phone-input-2";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

export type PhoneInputProps = {
  label: string;
  disabled?: boolean;
  error?: string;
  testId?: string;
};

function PhoneInputRaw(
  props: PhoneInputProps & {
    name: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  },
  ref?: ForwardedRef<HTMLDivElement | null>
) {
  return (
    <FormControl fullWidth error={!!props.error}>
      <PhoneInput
        inputProps={{
          name: props.name,
          onBlur: props.onBlur,
          "data-testid": props.testId,
        }}
        country="us"
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        placeholder={props.label}
        ref={ref}
      />
      {!!props.error && (
        <FormHelperText data-testid={`${props.testId}-error`}>
          {props.error}
        </FormHelperText>
      )}
    </FormControl>
  );
}

const PhoneInputField = forwardRef(PhoneInputRaw) as never as (
  props: PhoneInputProps & {
    name: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  } & { ref?: ForwardedRef<HTMLDivElement | null> }
) => ReturnType<typeof PhoneInputRaw>;

function FormPhoneInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: PhoneInputProps &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <PhoneInputField
          {...field}
          label={props.label}
          disabled={props.disabled}
          testId={props.testId}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

export default FormPhoneInput;
