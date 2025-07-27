import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import FormSwitchInput, { SwitchInputProps } from "./form-switch";

interface Option {
  id: number;
  name: string;
}

export default {
  title: "Components/Form/SwitchInput",
  component: FormSwitchInput,
} as Meta;

const Template: StoryFn<SwitchInputProps<Option> & { name: string }> = (
  args
) => {
  const methods = useForm({
    defaultValues: {
      switchField: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormSwitchInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Toggle options",
  name: "switchField",
  options: [
    { id: 1, name: "Option A" },
    { id: 2, name: "Option B" },
    { id: 3, name: "Option C" },
  ],
  keyValue: "id",
  keyExtractor: (option) => option.id.toString(),
  renderOption: (option) => option.name,
  testId: "switch-input",
};
