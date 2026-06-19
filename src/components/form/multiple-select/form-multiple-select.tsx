"use client";

import { Ref, useState } from "react";
import Check from "lucide-react/dist/esm/icons/check";
import ChevronsUpDown from "lucide-react/dist/esm/icons/chevrons-up-down";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type MultipleSelectInputProps<T extends object> = {
  label: string;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  testId?: string;
  keyValue: keyof T;
  options: T[];
  renderValue: (option: T[]) => React.ReactNode;
  renderOption: (option: T) => React.ReactNode;
};

function MultipleSelectInput<T extends object>(
  props: MultipleSelectInputProps<T> & {
    name: string;
    value: T[] | undefined | null;
    onChange: (value: T[]) => void;
    onBlur: () => void;
    ref?: Ref<HTMLButtonElement | null>;
  }
) {
  const [open, setOpen] = useState(false);
  const value = props.value ?? [];
  const inputId = `multiple-select-${props.name}`;

  const toggle = (option: T) => {
    const isExist = value.some(
      (item) => item[props.keyValue] === option[props.keyValue]
    );

    const newValue = isExist
      ? value.filter((item) => item[props.keyValue] !== option[props.keyValue])
      : [...value, option];

    props.onChange(newValue);
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      <Label htmlFor={inputId}>{props.label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={inputId}
            ref={props.ref}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={props.disabled || props.readOnly}
            onBlur={props.onBlur}
            data-testid={props.testId}
            aria-invalid={!!props.error}
            className={cn(
              "w-full justify-between font-normal",
              value.length === 0 && "text-muted-foreground",
              props.error && "border-destructive"
            )}
          >
            <span className="truncate">
              {value.length > 0 ? props.renderValue(value) : props.label}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-1"
          align="start"
        >
          <div className="max-h-72 overflow-y-auto">
            {props.options.map((option) => {
              const optionKey = option[props.keyValue]?.toString() ?? "";
              const isSelected = value.some(
                (item) => item[props.keyValue] === option[props.keyValue]
              );

              return (
                <button
                  key={optionKey}
                  type="button"
                  data-testid={`${props.testId}-${optionKey}`}
                  onClick={() => toggle(option)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
                    isSelected && "bg-accent/50"
                  )}
                >
                  <Check
                    className={cn(
                      "size-4 shrink-0",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex-1 text-left">
                    {props.renderOption(option)}
                  </span>
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
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

function FormMultipleSelectInput<
  TFieldValues extends FieldValues = FieldValues,
  T extends object = object,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MultipleSelectInputProps<T> &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <MultipleSelectInput<T>
          {...field}
          label={props.label}
          autoFocus={props.autoFocus}
          type={props.type}
          error={fieldState.error?.message}
          disabled={props.disabled}
          readOnly={props.readOnly}
          testId={props.testId}
          options={props.options}
          renderOption={props.renderOption}
          renderValue={props.renderValue}
          keyValue={props.keyValue}
        />
      )}
    />
  );
}

export default FormMultipleSelectInput;
