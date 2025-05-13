import * as React from "react";
import {
  LocalizationProvider,
  TimePicker,
  TimeStepOptions,
  TimeView,
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
type TimePickerFieldProps = {
  disabled?: boolean;
  className?: string;
  views?: readonly TimeView[] | undefined;
  autoFocus?: boolean;
  readOnly?: boolean;
  label: string;
  testId?: string;
  error?: string;
  defaultValue?: ValueDateType;
  format?: string;
  minTime?: Date | undefined;
  maxTime?: Date | undefined;
  timeSteps?: TimeStepOptions | undefined;
};

const TimePickerInput = forwardRef(TimePickerInputRaw) as never as (
  props: TimePickerFieldProps & {
    name: string;
    value: ValueDateType;
    onChange: (value: ValueDateType) => void;
    onBlur: () => void;
  } & { ref?: ForwardedRef<HTMLDivElement | null> }
) => ReturnType<typeof TimePickerInputRaw>;

function TimePickerInputRaw(
  props: TimePickerFieldProps & {
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
      <TimePicker
        ref={ref}
        name={props.name}
        label={props.label}
        value={props.value}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        defaultValue={props.defaultValue}
        onClose={props.onBlur}
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
        views={props.views}
        format={props.format}
        data-testid={props.testId}
        minTime={props.minTime}
        maxTime={props.maxTime}
        timeSteps={props.timeSteps}
      />
    </LocalizationProvider>
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
            views={props.views}
            testId={props.testId}
            format={props.format}
            error={fieldState.error?.message}
            minTime={props.minTime}
            maxTime={props.maxTime}
            timeSteps={props.timeSteps}
          />
        );
      }}
    />
  );
}

export default FormTimePickerInput;
