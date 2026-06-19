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
import { Virtuoso } from "react-virtuoso";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type MultipleSelectExtendedInputProps<T extends object> = {
  label: string;
  error?: string;
  testId?: string;
  disabled?: boolean;
  options: T[];
  renderSelected: (option: T[]) => React.ReactNode;
  renderOption: (option: T) => React.ReactNode;
  keyExtractor: (option: T) => string;
  onEndReached?: () => void;
} & (
  | {
      isSearchable: true;
      searchLabel: string;
      searchPlaceholder: string;
      search: string;
      onSearchChange: (search: string) => void;
    }
  | {
      isSearchable?: false;
    }
);

function MultipleSelectExtendedInput<T extends object>(
  props: MultipleSelectExtendedInputProps<T> & {
    name: string;
    value: T[] | null;
    onChange: (value: T[]) => void;
    onBlur: () => void;
    ref?: Ref<HTMLButtonElement | null>;
  }
) {
  const [open, setOpen] = useState(false);
  const inputId = `multiple-select-extended-${props.name}`;
  const valueKeys = props.value?.map(props.keyExtractor) ?? [];

  return (
    <div className="flex w-full flex-col gap-1.5">
      <Label htmlFor={inputId}>{props.label}</Label>
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) props.onBlur();
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id={inputId}
            ref={props.ref}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={props.disabled}
            data-testid={props.testId}
            aria-invalid={!!props.error}
            className={cn(
              "w-full justify-between font-normal",
              (!props.value || props.value.length === 0) &&
                "text-muted-foreground",
              props.error && "border-destructive"
            )}
          >
            <span className="truncate">
              {props.value && props.value.length > 0
                ? props.renderSelected(props.value)
                : props.label}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          {props.isSearchable && (
            <div className="p-2">
              <Input
                placeholder={props.searchPlaceholder}
                value={props.search}
                onChange={(event) => props.onSearchChange?.(event.target.value)}
                autoFocus
                aria-label={props.searchLabel}
                data-testid={`${props.testId}-search`}
              />
            </div>
          )}

          <Virtuoso
            style={{
              height:
                props.options.length <= 6 ? props.options.length * 44 : 320,
            }}
            data={props.options}
            endReached={props.onEndReached}
            itemContent={(_index, item) => {
              const isSelected = valueKeys.includes(props.keyExtractor(item));

              return (
                <button
                  type="button"
                  onClick={() => {
                    const newValue = props.value
                      ? isSelected
                        ? props.value.filter(
                            (selectedItem) =>
                              props.keyExtractor(selectedItem) !==
                              props.keyExtractor(item)
                          )
                        : [...props.value, item]
                      : [item];
                    props.onChange(newValue);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground",
                    isSelected && "bg-accent/50"
                  )}
                >
                  <Check
                    className={cn(
                      "size-4 shrink-0",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item ? props.renderOption(item) : null}
                </button>
              );
            }}
          />
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

function FormMultipleSelectExtendedInput<
  TFieldValues extends FieldValues = FieldValues,
  T extends object = object,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue"> &
    MultipleSelectExtendedInputProps<T>
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <MultipleSelectExtendedInput<T>
          {...field}
          isSearchable={props.isSearchable}
          label={props.label}
          error={fieldState.error?.message}
          disabled={props.disabled}
          testId={props.testId}
          options={props.options}
          renderOption={props.renderOption}
          renderSelected={props.renderSelected}
          keyExtractor={props.keyExtractor}
          search={props.isSearchable ? props.search : ""}
          onSearchChange={
            props.isSearchable ? props.onSearchChange : () => undefined
          }
          onEndReached={props.isSearchable ? props.onEndReached : undefined}
          searchLabel={props.isSearchable ? props.searchLabel : ""}
          searchPlaceholder={props.isSearchable ? props.searchPlaceholder : ""}
        />
      )}
    />
  );
}

export default FormMultipleSelectExtendedInput;
