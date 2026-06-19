"use client";

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Ref } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
    <div className="flex flex-col gap-1.5" data-testid={props.testId}>
      <Label data-testid={`${props.testId}-label`}>{props.label}</Label>
      <div ref={props.ref} className="flex flex-col gap-3">
        {props.options.map((option) => {
          const checked = value
            .map((val) => val[props.keyValue])
            .includes(option[props.keyValue]);
          const id = `switch-${props.name}-${props.keyExtractor(option)}`;

          return (
            <div
              key={props.keyExtractor(option)}
              className="flex items-center gap-2"
            >
              <Switch
                id={id}
                name={props.name}
                checked={checked}
                disabled={props.disabled}
                onCheckedChange={onChange(option)}
                data-testid={`${props.testId}-${props.keyExtractor(option)}`}
              />
              <Label htmlFor={id}>{props.renderOption(option)}</Label>
            </div>
          );
        })}
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
