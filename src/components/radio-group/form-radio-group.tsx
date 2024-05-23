"use client";

import { ForwardedRef, forwardRef, ReactNode } from "react";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

type RadioInputProps<T> = {
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
  renderOption: (option: T) => ReactNode;
};

function RadioInputRaw<T>(
  props: RadioInputProps<T> & {
    name: string;
    value: T | undefined | null;
    onChange: (value: T) => void;
    onBlur: () => void;
  },
  ref?: ForwardedRef<HTMLDivElement | null>
) {
  const value = props.value;

  const onChange = (radioValue: T) => () => {
    props.onChange(radioValue);
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
      <RadioGroup ref={ref}>
        {props.options.map((option) => (
          <FormControlLabel
            key={props.keyExtractor(option)}
            control={
              <Radio
                checked={option[props.keyValue] === value?.[props.keyValue]}
                name={props.name}
                onChange={onChange(option)}
                data-testid={`${props.testId}-${props.keyExtractor(option)}`}
              />
            }
            label={props.renderOption(option)}
          />
        ))}
      </RadioGroup>
      {!!props.error && (
        <FormHelperText data-testid={`${props.testId}-error`}>
          {props.error}
        </FormHelperText>
      )}
    </FormControl>
  );
}

const RadioInput = forwardRef(RadioInputRaw) as never as <T>(
  props: RadioInputProps<T> & {
    name: string;
    value: T | undefined | null;
    onChange: (value: T) => void;
    onBlur: () => void;
  } & { ref?: ForwardedRef<HTMLDivElement | null> }
) => ReturnType<typeof RadioInputRaw>;

function FormRadioInput<
  TFieldValues extends FieldValues = FieldValues,
  T = unknown,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: RadioInputProps<T> &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <RadioInput<T>
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

export default FormRadioInput;
