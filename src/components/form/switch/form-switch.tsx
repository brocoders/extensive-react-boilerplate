"use client";

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
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { Ref } from "react";

export type SwitchInputProps<T> = {
  label: string;
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

function SwitchInput<T>(
  props: SwitchInputProps<T> & {
    name: string;
    value: T[] | undefined | null;
    onChange: (value: T[]) => void;
    onBlur: () => void;
    ref?: Ref<HTMLDivElement | null>;
  }
) {
  const value = props.value ?? [];

  const onChange = (switchValue: T) => () => {
    const isExist = value
      .map((option) => option[props.keyValue])
      .includes(switchValue[props.keyValue]);

    const newValue = isExist
      ? value.filter(
          (option) => option[props.keyValue] !== switchValue[props.keyValue]
        )
      : [...value, switchValue];

    props.onChange(newValue);
  };

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      error={!!props.error}
      data-testid={props.testId}
    >
      <FormLabel component="legend" data-testid={`${props.testId}-label`}>
        {props.label}
      </FormLabel>
      <FormGroup ref={props.ref}>
        {props.options.map((option) => (
          <FormControlLabel
            key={props.keyExtractor(option)}
            control={
              <Switch
                checked={value
                  .map((val) => val[props.keyValue])
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

function FormSwitchInput<
  TFieldValues extends FieldValues = FieldValues,
  T = unknown,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: SwitchInputProps<T> &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <SwitchInput<T>
          {...field}
          label={props.label}
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

export default FormSwitchInput;
