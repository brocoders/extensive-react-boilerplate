import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import FormMultipleSelectInput, {
  MultipleSelectInputProps,
} from "./form-multiple-select";

interface Option {
  id: number;
  name: string;
}

export default {
  title: "Components/Form/MultipleSelectInput",
  component: FormMultipleSelectInput,
} as Meta;

const Template: StoryFn<MultipleSelectInputProps<Option> & { name: string }> = (
  args
) => {
  const methods = useForm({
    defaultValues: {
      sampleMultipleSelect: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormMultipleSelectInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Sample Multiple Select",
  name: "sampleMultipleSelect",
  options: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
    { id: 4, name: "Option 4" },
    { id: 5, name: "Option 5" },
  ],
  keyValue: "id",
  renderOption: (option: Option) => option.name,
  renderValue: (options: Option[]) => options.map((o) => o.name).join(", "),
  testId: "sampleMultipleSelect",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Multiple Select",
  name: "sampleMultipleSelect",
  options: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
    { id: 4, name: "Option 4" },
    { id: 5, name: "Option 5" },
  ],
  keyValue: "id",
  renderOption: (option: Option) => option.name,
  renderValue: (options: Option[]) => options.map((o) => o.name).join(", "),
  disabled: true,
  testId: "disabledMultipleSelect",
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: "Read Only Multiple Select",
  name: "sampleMultipleSelect",
  options: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
    { id: 4, name: "Option 4" },
    { id: 5, name: "Option 5" },
  ],
  keyValue: "id",
  renderOption: (option: Option) => option.name,
  renderValue: (options: Option[]) => options.map((o) => o.name).join(", "),
  readOnly: true,
  testId: "readOnlyMultipleSelect",
};
