import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import FormCheckboxInput, { CheckboxInputProps } from "./form-checkbox";

interface Option {
  id: number;
  name: string;
}

export default {
  title: "Components/Form/CheckboxInput",
  component: FormCheckboxInput,
} as Meta;

const Template: StoryFn<CheckboxInputProps<Option> & { name: string }> = (
  args
) => {
  const methods = useForm({
    defaultValues: {
      sampleCheckbox: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormCheckboxInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Sample Form Checkbox",
  name: "sampleCheckbox",
  options: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ],
  keyValue: "id",
  keyExtractor: (option: Option) => option.id.toString(),
  renderOption: (option: Option) => option.name,
  error: "",
  testId: "sampleCheckbox",
};
