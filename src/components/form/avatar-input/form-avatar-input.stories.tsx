import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import FormAvatarInput from "./form-avatar-input";

type FormAvatarInputProps = Pick<
  ControllerProps<FieldValues, FieldPath<FieldValues>>,
  "name" | "defaultValue"
> & {
  disabled?: boolean;
  testId?: string;
};

export default {
  title: "Components/Form/AvatarInput",
  component: FormAvatarInput,
} as Meta;

const Template: StoryFn<FormAvatarInputProps> = (args) => {
  const methods = useForm({
    defaultValues: {
      sampleAvatar: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormAvatarInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: "sampleAvatar",
  testId: "sampleAvatar",
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "sampleAvatar",
  testId: "disabledAvatar",
  disabled: true,
};

export const WithPrefilledValue = Template.bind({});
WithPrefilledValue.args = {
  name: "sampleAvatar",
  testId: "prefilledAvatar",
  defaultValue: {
    id: "1",
    path: "https://via.placeholder.com/100x100?text=Avatar",
  },
};
