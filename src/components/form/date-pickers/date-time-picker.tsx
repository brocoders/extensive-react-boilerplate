"use client";
import { ChangeEvent, Ref, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type ValueDateType = Date | null | undefined;
export type DateTimePickerFieldProps = {
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

function DateTimePickerInput(
  props: DateTimePickerFieldProps & {
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
  const inputId = `date-time-picker-${props.name}`;
  const value = props.value ?? undefined;
  const timeValue = value ? format(value, "HH:mm") : "";

  const disabledMatchers: Matcher[] = [];
  if (props.minDate) disabledMatchers.push({ before: props.minDate });
  if (props.maxDate) disabledMatchers.push({ after: props.maxDate });

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      props.onChange(null);
      return;
    }

    const next = new Date(date);
    if (value) {
      next.setHours(value.getHours(), value.getMinutes(), 0, 0);
    } else {
      next.setHours(0, 0, 0, 0);
    }
    props.onChange(next);
    setOpen(false);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value;
    const next = value ? new Date(value) : new Date();
    if (!time) {
      props.onChange(next);
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);
    next.setHours(hours, minutes, 0, 0);
    props.onChange(next);
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      <Label htmlFor={inputId}>{props.label}</Label>
      <div className="flex gap-2">
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
                "flex-1 justify-start text-left font-normal",
                !value && "text-muted-foreground",
                props.error && "border-destructive",
                props.className
              )}
            >
              <CalendarIcon />
              {value ? format(value, "PPP", { locale }) : props.label}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              locale={locale}
              captionLayout={props.captionLayout ?? "dropdown"}
              defaultMonth={value ?? props.minDate ?? undefined}
              startMonth={props.minDate}
              endMonth={props.maxDate}
              selected={value}
              onSelect={handleDateSelect}
              disabled={disabledMatchers}
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          aria-label={`${props.label} time`}
          value={timeValue}
          onChange={handleTimeChange}
          onBlur={props.onBlur}
          disabled={props.disabled || props.readOnly}
          className="w-[8.5rem]"
        />
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

function FormDateTimePickerInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: DateTimePickerFieldProps &
    Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue">
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => {
        return (
          <DateTimePickerInput
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

export default FormDateTimePickerInput;
