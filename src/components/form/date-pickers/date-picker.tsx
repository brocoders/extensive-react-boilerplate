"use client";
import { Ref, useState } from "react";
import { format } from "date-fns";
import CalendarIcon from "lucide-react/dist/esm/icons/calendar";
import { type Matcher } from "react-day-picker";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import useLanguage from "@/services/i18n/use-language";
import { getValueByKey } from "@/components/form/date-pickers/helper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type ValueDateType = Date | null | undefined;
export type DatePickerFieldProps = {
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  captionLayout?: React.ComponentProps<typeof Calendar>["captionLayout"];
  autoFocus?: boolean;
  readOnly?: boolean;
  label: string;
  testId?: string;
  error?: string;
  defaultValue?: ValueDateType;
};

function DatePickerInput(
  props: DatePickerFieldProps & {
    name: string;
    value: ValueDateType;
    onChange: (value: ValueDateType) => void;
    onBlur: () => void;
    ref?: Ref<HTMLButtonElement | null>;
  }
) {
  const language = useLanguage();
  const locale = getValueByKey(language);
  const [open, setOpen] = useState(false);
  const inputId = `date-picker-${props.name}`;

  const disabledMatchers: Matcher[] = [];
  if (props.minDate) disabledMatchers.push({ before: props.minDate });
  if (props.maxDate) disabledMatchers.push({ after: props.maxDate });

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
            disabled={props.disabled || props.readOnly}
            data-testid={props.testId}
            aria-invalid={!!props.error}
            className={cn(
              "w-full justify-start text-left font-normal",
              !props.value && "text-muted-foreground",
              props.error && "border-destructive",
              props.className
            )}
          >
            <CalendarIcon />
            {props.value ? format(props.value, "PPP", { locale }) : props.label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            locale={locale}
            captionLayout={props.captionLayout ?? "dropdown"}
            defaultMonth={props.value ?? undefined}
            startMonth={props.minDate}
            endMonth={props.maxDate}
            selected={props.value ?? undefined}
            onSelect={(date) => {
              props.onChange(date ?? null);
              setOpen(false);
            }}
            disabled={disabledMatchers}
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

function FormDatePickerInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: DatePickerFieldProps &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => {
        return (
          <DatePickerInput
            {...field}
            defaultValue={props.defaultValue}
            autoFocus={props.autoFocus}
            label={props.label}
            disabled={props.disabled}
            readOnly={props.readOnly}
            testId={props.testId}
            minDate={props.minDate}
            maxDate={props.maxDate}
            captionLayout={props.captionLayout}
            error={fieldState.error?.message}
          />
        );
      }}
    />
  );
}

export default FormDatePickerInput;
