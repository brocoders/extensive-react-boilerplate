import * as React from "react";
import {
  DatePicker,
  DateView,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { ForwardedRef, forwardRef } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useLanguage from "@/services/i18n/use-language";
import { getValueByKey } from "@/components/form/date-pickers/helper";

type ValueDateType = Date | null | undefined;
type DatePickerFieldProps = {
  disabled?: boolean;
  className?: string;
  views?: readonly DateView[] | undefined;
  minDate?: Date;
  maxDate?: Date;
  autoFocus?: boolean;
  readOnly?: boolean;
  label: string;
  testId?: string;
  error?: string;
  defaultValue?: ValueDateType;
};
const DatePickerInput = forwardRef(DatePickerInputRaw) as never as (
  props: DatePickerFieldProps & {
    name: string;
    value: ValueDateType;
    onChange: (value: ValueDateType) => void;
    onBlur: () => void;
  } & { ref?: ForwardedRef<HTMLDivElement | null> }
) => ReturnType<typeof DatePickerInputRaw>;

function DatePickerInputRaw(
  props: DatePickerFieldProps & {
    name: string;
    value: ValueDateType;
    onChange: (value: ValueDateType) => void;
    onBlur: () => void;
  },
  ref?: ForwardedRef<HTMLDivElement | null>
) {
  const language = useLanguage();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={getValueByKey(language)}
    >
      <DatePicker
        ref={ref}
        name={props.name}
        label={props.label}
        value={props.value}
        onClose={props.onBlur}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        defaultValue={props.defaultValue}
        slotProps={{
          textField: {
            helperText: props.error,
            error: !!props.error,
            InputProps: {
              readOnly: props.readOnly,
            },
          },
        }}
        onAccept={props.onChange}
        minDate={props.minDate}
        maxDate={props.maxDate}
        views={props.views}
        data-testid={props.testId}
      />
    </LocalizationProvider>
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
            views={props.views}
            testId={props.testId}
            minDate={props.minDate}
            maxDate={props.maxDate}
            error={fieldState.error?.message}
          />
        );
      }}
    />
  );
}

export default FormDatePickerInput;
