"use client";
import { ChangeEvent, Ref } from "react";
import { format } from "date-fns";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ValueDateType = Date | null | undefined;

export type TimePickerFieldProps = {
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  label: string;
  testId?: string;
  error?: string;
  defaultValue?: ValueDateType;
};

function TimePickerInput(
  props: TimePickerFieldProps & {
    name: string;
    value: ValueDateType;
    onChange: (value: ValueDateType) => void;
    onBlur: () => void;
    ref?: Ref<HTMLInputElement | null>;
  }
) {
  const inputId = `time-picker-${props.name}`;
  const timeValue = props.value ? format(props.value, "HH:mm") : "";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value;
    if (!time) {
      props.onChange(null);
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);
    const next = props.value ? new Date(props.value) : new Date();
    next.setHours(hours, minutes, 0, 0);
    props.onChange(next);
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      <Label htmlFor={inputId}>{props.label}</Label>
      <Input
        id={inputId}
        ref={props.ref}
        type="time"
        name={props.name}
        value={timeValue}
        onChange={handleChange}
        onBlur={props.onBlur}
        autoFocus={props.autoFocus}
        readOnly={props.readOnly}
        disabled={props.disabled}
        data-testid={props.testId}
        aria-invalid={!!props.error}
        className={cn(props.error && "border-destructive", props.className)}
      />
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

function FormTimePickerInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: TimePickerFieldProps &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => {
        return (
          <TimePickerInput
            {...field}
            defaultValue={props.defaultValue}
            autoFocus={props.autoFocus}
            label={props.label}
            disabled={props.disabled}
            readOnly={props.readOnly}
            testId={props.testId}
            error={fieldState.error?.message}
          />
        );
      }}
    />
  );
}

export default FormTimePickerInput;
