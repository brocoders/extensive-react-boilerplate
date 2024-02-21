import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { forwardRef } from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { TextareaAutosize } from "@mui/base";
import TextField from "@mui/material/TextField";

type Resize = "block" | "both" | "horizontal" | "inline" | "none" | "vertical";

type TextareaFieldProps = {
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  placeholder: string;
  testId?: string;
  error?: string;
  defaultValue?: string;
  maxRows?: string | number;
  minRows?: string | number;
  label?: string;
  multiLine?: boolean;
  resize?: Resize;
};
const TextareaInput = forwardRef<
  HTMLDivElement | null,
  TextareaFieldProps & {
    name: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  }
>(function TextareaInput(props, ref) {
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

      <TextField
        ref={ref}
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        minRows={props.minRows}
        maxRows={props.maxRows}
        onChange={(e) => props.onChange(e.target.value)}
        autoFocus={props.autoFocus}
        data-testid={props.testId}
        multiline={props.multiLine}
        disabled={props.disabled}
        InputProps={{
          inputComponent: TextareaAutosize,
          inputProps: {
            readOnly: props.readOnly,
            style: {
              resize: props.resize,
            },
          },
        }}
      />
    </FormControl>
  );
});
function FormTextareaInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: TextareaFieldProps &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => {
        return (
          <TextareaInput
            {...field}
            defaultValue={props.defaultValue}
            autoFocus={props.autoFocus}
            placeholder={props.placeholder}
            label={props.label}
            minRows={props.minRows}
            maxRows={props.maxRows}
            disabled={props.disabled}
            readOnly={props.readOnly}
            multiLine={props.multiLine}
            resize={props.resize}
            testId={props.testId}
            error={fieldState.error?.message}
          />
        );
      }}
    />
  );
}

export default FormTextareaInput;
