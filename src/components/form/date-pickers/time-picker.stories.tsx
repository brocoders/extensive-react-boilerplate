import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import FormTimePickerInput, { TimePickerFieldProps } from "./time-picker";

export default {
  title: "Components/Form/TimePickerInput",
  component: FormTimePickerInput,
} as Meta;

const Template: StoryFn<TimePickerFieldProps & { name: string }> = (args) => {
  const methods = useForm({
    defaultValues: {
      sampleTime: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormTimePickerInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Sample Time Picker",
  name: "sampleTime",
  testId: "sampleTime",
};

export const WithCustomFormat = Template.bind({});
WithCustomFormat.args = {
  label: "Custom Format Time Picker",
  name: "sampleTime",
  format: "HH:mm:ss",
  testId: "customFormatTime",
};

export const WithMinMaxTime = Template.bind({});
WithMinMaxTime.args = {
  label: "Time Picker with Min/Max",
  name: "sampleTime",
  minTime: new Date(0, 0, 0, 9, 0),
  maxTime: new Date(0, 0, 0, 17, 0),
  testId: "minMaxTime",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Time Picker",
  name: "sampleTime",
  disabled: true,
  testId: "disabledTime",
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: "Read Only Time Picker",
  name: "sampleTime",
  readOnly: true,
  testId: "readOnlyTime",
};

export const HoursMinutesView = Template.bind({});
HoursMinutesView.args = {
  label: "Hours/Minutes View",
  name: "sampleTime",
  views: ["hours", "minutes"],
  testId: "hoursMinutesTime",
};
