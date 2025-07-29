import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import FormTextInput, { TextInputProps } from "./form-text-input";

export default {
  title: "Components/Form/TextInput",
  component: FormTextInput,
} as Meta;

const Template: StoryFn<TextInputProps & { name: string }> = (args) => {
  const methods = useForm({
    defaultValues: {
      sampleText: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormTextInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Sample Text Input",
  name: "sampleText",
  testId: "sampleText",
};

export const Password = Template.bind({});
Password.args = {
  label: "Password Input",
  name: "sampleText",
  type: "password",
  testId: "passwordInput",
};

export const Multiline = Template.bind({});
Multiline.args = {
  label: "Multiline Text Input",
  name: "sampleText",
  multiline: true,
  minRows: 3,
  maxRows: 6,
  testId: "multilineText",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Text Input",
  name: "sampleText",
  disabled: true,
  testId: "disabledText",
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: "Read Only Text Input",
  name: "sampleText",
  readOnly: true,
  testId: "readOnlyText",
};
