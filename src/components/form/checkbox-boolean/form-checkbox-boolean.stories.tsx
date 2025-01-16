import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import FormCheckboxBooleanInput, {
  CheckboxBooleanInputProps,
} from "./form-checkbox-boolean";

export default {
  title: "Components/Form/CheckboxBooleanInput",
  component: FormCheckboxBooleanInput,
} as Meta;

const Template: StoryFn<CheckboxBooleanInputProps & { name: string }> = (
  args
) => {
  const methods = useForm({
    defaultValues: {
      sampleCheckbox: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormCheckboxBooleanInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Sample Form Checkbox",
  name: "sampleCheckbox",
  testId: "sampleCheckbox",
};
