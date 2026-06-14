"use client";

import { Ref, ReactNode } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export type RadioInputProps<T> = {
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

function RadioInput<T>(
  props: RadioInputProps<T> & {
    name: string;
    value: T | undefined | null;
    onChange: (value: T) => void;
    onBlur: () => void;
    ref?: Ref<HTMLDivElement | null>;
  }
) {
  const selectedKey = props.value?.[props.keyValue]?.toString() ?? "";

  return (
    <div className="flex flex-col gap-1.5" data-testid={props.testId}>
      <Label data-testid={`${props.testId}-label`}>{props.label}</Label>
      <RadioGroup
        ref={props.ref}
        value={selectedKey}
        disabled={props.disabled}
        onValueChange={(newKey) => {
          const newValue = props.options.find(
            (option) => option[props.keyValue]?.toString() === newKey
          );
          if (!newValue) return;

          props.onChange(newValue);
        }}
      >
        {props.options.map((option) => {
          const optionKey = option[props.keyValue]?.toString() ?? "";
          const id = `radio-${props.name}-${props.keyExtractor(option)}`;

          return (
            <div
              key={props.keyExtractor(option)}
              className="flex items-center gap-2"
            >
              <RadioGroupItem
                id={id}
                value={optionKey}
                data-testid={`${props.testId}-${props.keyExtractor(option)}`}
              />
              <Label htmlFor={id}>{props.renderOption(option)}</Label>
            </div>
          );
        })}
      </RadioGroup>
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
