import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import FormRadioInput, { RadioInputProps } from "./form-radio-group";

interface Option {
  id: number;
  name: string;
}

export default {
  title: "Components/Form/RadioGroupInput",
  component: FormRadioInput,
} as Meta;

const Template: StoryFn<RadioInputProps<Option> & { name: string }> = (
  args
) => {
  const methods = useForm({
    defaultValues: {
      sampleRadio: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormRadioInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Sample Radio Group",
  name: "sampleRadio",
  options: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ],
  keyValue: "id",
  keyExtractor: (option: Option) => option.id.toString(),
  renderOption: (option: Option) => option.name,
  testId: "sampleRadio",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Radio Group",
  name: "sampleRadio",
  options: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ],
  keyValue: "id",
  keyExtractor: (option: Option) => option.id.toString(),
  renderOption: (option: Option) => option.name,
  disabled: true,
  testId: "disabledRadio",
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: "Read Only Radio Group",
  name: "sampleRadio",
  options: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ],
  keyValue: "id",
  keyExtractor: (option: Option) => option.id.toString(),
  renderOption: (option: Option) => option.name,
  readOnly: true,
  testId: "readOnlyRadio",
};
