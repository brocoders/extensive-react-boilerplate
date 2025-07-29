import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import FormSelectInput, { SelectInputProps } from "./form-select";

interface Option {
  id: number;
  name: string;
}

export default {
  title: "Components/Form/SelectInput",
  component: FormSelectInput,
} as Meta;

const Template: StoryFn<SelectInputProps<Option> & { name: string }> = (
  args
) => {
  const methods = useForm({
    defaultValues: {
      sampleSelect: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormSelectInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Sample Select",
  name: "sampleSelect",
  options: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ],
  keyValue: "id",
  renderOption: (option: Option) => option.name,
  testId: "sampleSelect",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Select",
  name: "sampleSelect",
  options: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ],
  keyValue: "id",
  renderOption: (option: Option) => option.name,
  disabled: true,
  testId: "disabledSelect",
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: "Read Only Select",
  name: "sampleSelect",
  options: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ],
  keyValue: "id",
  renderOption: (option: Option) => option.name,
  readOnly: true,
  testId: "readOnlySelect",
};
