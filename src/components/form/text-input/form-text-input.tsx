"use client";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { ChangeEvent, forwardRef, useState } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { InputBaseComponentProps } from "@mui/material/InputBase/InputBase";

type TextInputProps = {
  label: string;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  testId?: string;
  autoComplete?: string;
  inputComponent?: React.ElementType<InputBaseComponentProps>;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
};

const TextInput = forwardRef<
  HTMLDivElement | null,
  TextInputProps & {
    name: string;
    value: string;
    onChange: (
      value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBlur: () => void;
  }
>(function TextInput(props, ref) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleClickShowPassword = () => setIsShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <TextField
      ref={ref}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      label={props.label}
      autoFocus={props.autoFocus}
      type={props.type === "password" && isShowPassword ? "text" : props.type}
      variant="outlined"
      fullWidth
      error={!!props.error}
      data-testid={props.testId}
      helperText={props.error}
      disabled={props.disabled}
      autoComplete={props.autoComplete}
      FormHelperTextProps={{
        ["data-testid" as string]: `${props.testId}-error`,
      }}
      multiline={props.multiline}
      minRows={props.minRows}
      maxRows={props.maxRows}
      InputProps={{
        readOnly: props.readOnly,
        inputComponent: props.inputComponent,
        endAdornment:
          props.type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {isShowPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
      }}
    />
  );
});

function FormTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue"> &
    TextInputProps
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <TextInput
          {...field}
          label={props.label}
          autoFocus={props.autoFocus}
          type={props.type}
          error={fieldState.error?.message}
          disabled={props.disabled}
          readOnly={props.readOnly}
          testId={props.testId}
          multiline={props.multiline}
          minRows={props.minRows}
          maxRows={props.maxRows}
          inputComponent={props.inputComponent}
        />
      )}
    />
  );
}

export default FormTextInput;
