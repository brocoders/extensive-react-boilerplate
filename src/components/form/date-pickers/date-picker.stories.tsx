import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import FormDatePickerInput, { DatePickerFieldProps } from "./date-picker";

export default {
  title: "Components/Form/DatePickerInput",
  component: FormDatePickerInput,
} as Meta;

const Template: StoryFn<DatePickerFieldProps & { name: string }> = (args) => {
  const methods = useForm({
    defaultValues: {
      sampleDate: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormDatePickerInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Sample Date Picker",
  name: "sampleDate",
  testId: "sampleDate",
};

export const WithMinMaxDate = Template.bind({});
WithMinMaxDate.args = {
  label: "Date Picker with Min/Max",
  name: "sampleDate",
  minDate: new Date(2020, 0, 1),
  maxDate: new Date(2030, 11, 31),
  testId: "minMaxDate",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Date Picker",
  name: "sampleDate",
  disabled: true,
  testId: "disabledDate",
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: "Read Only Date Picker",
  name: "sampleDate",
  readOnly: true,
  testId: "readOnlyDate",
};

export const YearMonthView = Template.bind({});
YearMonthView.args = {
  label: "Year/Month View",
  name: "sampleDate",
  views: ["year", "month"],
  testId: "yearMonthDate",
};
