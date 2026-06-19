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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type AutocompleteInputProps<T> = {
  label: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  testId?: string;
  size?: "small" | "medium";
  options: T[];
  renderOption: (option: T) => React.ReactNode;
  getOptionLabel: (option: T) => string;
};

function AutocompleteInput<T>(
  props: AutocompleteInputProps<T> & {
    name: string;
    value: T | undefined | null;
    onChange: (value: T) => void;
    onBlur: () => void;
    ref?: Ref<HTMLButtonElement | null>;
  }
) {
  const [open, setOpen] = useState(false);
  const inputId = `autocomplete-${props.name}`;

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
              !props.value && "text-muted-foreground",
              props.error && "border-destructive"
            )}
          >
            <span className="truncate">
              {props.value ? props.renderOption(props.value) : props.label}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={props.label} />
            <CommandList>
              <CommandEmpty>&mdash;</CommandEmpty>
              <CommandGroup>
                {props.options.map((option) => {
                  const optionLabel = props.getOptionLabel(option);
                  const isSelected =
                    !!props.value &&
                    props.getOptionLabel(props.value) === optionLabel;

                  return (
                    <CommandItem
                      key={optionLabel}
                      value={optionLabel}
                      onSelect={() => {
                        props.onChange(option);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(isSelected ? "opacity-100" : "opacity-0")}
                      />
                      {props.renderOption(option)}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
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

function FormAutocompleteInput<
  TFieldValues extends FieldValues = FieldValues,
  T = unknown,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: AutocompleteInputProps<T> &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <AutocompleteInput<T>
          {...field}
          label={props.label}
          autoFocus={props.autoFocus}
          error={fieldState.error?.message}
          disabled={props.disabled}
          readOnly={props.readOnly}
          testId={props.testId}
          options={props.options}
          renderOption={props.renderOption}
          getOptionLabel={props.getOptionLabel}
          size={props.size}
        />
      )}
    />
  );
}

export default FormAutocompleteInput;
