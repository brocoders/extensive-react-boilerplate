import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import FormDateTimePickerInput, {
  DateTimePickerFieldProps,
} from "./date-time-picker";

export default {
  title: "Components/Form/DateTimePickerInput",
  component: FormDateTimePickerInput,
} as Meta;

const Template: StoryFn<DateTimePickerFieldProps & { name: string }> = (
  args
) => {
  const methods = useForm({
    defaultValues: {
      sampleDateTime: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormDateTimePickerInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Sample Date Time Picker",
  name: "sampleDateTime",
  testId: "sampleDateTime",
};

export const WithMinMaxDate = Template.bind({});
WithMinMaxDate.args = {
  label: "Date Time Picker with Min/Max",
  name: "sampleDateTime",
  minDate: new Date(2020, 0, 1),
  maxDate: new Date(2030, 11, 31),
  testId: "minMaxDateTime",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Date Time Picker",
  name: "sampleDateTime",
  disabled: true,
  testId: "disabledDateTime",
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: "Read Only Date Time Picker",
  name: "sampleDateTime",
  readOnly: true,
  testId: "readOnlyDateTime",
};

export const CustomViews = Template.bind({});
CustomViews.args = {
  label: "Custom Views Date Time Picker",
  name: "sampleDateTime",
  views: ["day", "hours", "minutes"],
  testId: "customViewsDateTime",
};
