import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import FormMultipleImagePicker from "./multiple-image-picker";

type FormMultipleImagePickerProps = Pick<
  ControllerProps<FieldValues, FieldPath<FieldValues>>,
  "name" | "defaultValue"
> & {
  disabled?: boolean;
  testId?: string;
  label?: React.ReactNode;
};

export default {
  title: "Components/Form/MultipleImagePicker",
  component: FormMultipleImagePicker,
} as Meta;

const Template: StoryFn<FormMultipleImagePickerProps> = (args) => {
  const methods = useForm({
    defaultValues: {
      sampleImages: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormMultipleImagePicker {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: "sampleImages",
  testId: "sampleImages",
  label: "Upload Multiple Images",
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "sampleImages",
  testId: "disabledImages",
  label: "Disabled Multiple Image Upload",
  disabled: true,
};

export const WithPrefilledValue = Template.bind({});
WithPrefilledValue.args = {
  name: "sampleImages",
  testId: "prefilledImages",
  label: "Images with Default Values",
  defaultValue: [
    {
      id: "1",
      path: "https://via.placeholder.com/300x200?text=Image+1",
    },
    {
      id: "2",
      path: "https://via.placeholder.com/300x200?text=Image+2",
    },
  ],
};
