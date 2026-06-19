"use client";

import { Ref } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export type CheckboxBooleanInputProps = {
  label: string;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  testId?: string;
};

function CheckboxBooleanInput(
  props: CheckboxBooleanInputProps & {
    name: string;
    value: boolean | null;
    onChange: (value: boolean) => void;
    onBlur: () => void;
    ref?: Ref<HTMLButtonElement | null>;
  }
) {
  const value = props.value ?? false;
  const id = `checkbox-${props.name}`;

  return (
    <div className="flex flex-col gap-1.5" data-testid={props.testId}>
      <div className="flex items-center gap-2">
        <Checkbox
          id={id}
          ref={props.ref}
          name={props.name}
          checked={value}
          disabled={props.disabled}
          onBlur={props.onBlur}
          onCheckedChange={(checked) => props.onChange(checked === true)}
          aria-invalid={!!props.error}
          data-testid={`${props.testId}-checkbox`}
        />
        <Label htmlFor={id}>{props.label}</Label>
      </div>
      {!!props.error && (
        <p
          data-testid={`${props.testId}-error`}
          className="text-sm text-destructive"
        >
          {props.error}
        </p>
      )}
    </div>
  );
}

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
