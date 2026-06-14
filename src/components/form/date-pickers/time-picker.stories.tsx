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
