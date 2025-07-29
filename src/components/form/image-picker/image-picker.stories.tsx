import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import FormImagePicker from "./image-picker";

type FormImagePickerProps = Pick<
  ControllerProps<FieldValues, FieldPath<FieldValues>>,
  "name" | "defaultValue"
> & {
  disabled?: boolean;
  testId?: string;
  label?: React.ReactNode;
};

export default {
  title: "Components/Form/ImagePicker",
  component: FormImagePicker,
} as Meta;

const Template: StoryFn<FormImagePickerProps> = (args) => {
  const methods = useForm({
    defaultValues: {
      sampleImage: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormImagePicker {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: "sampleImage",
  testId: "sampleImage",
  label: "Upload Image",
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "sampleImage",
  testId: "disabledImage",
  label: "Disabled Image Upload",
  disabled: true,
};

export const WithPrefilledValue = Template.bind({});
WithPrefilledValue.args = {
  name: "sampleImage",
  testId: "prefilledImage",
  label: "Image with Default Value",
  defaultValue: {
    id: "1",
    path: "https://via.placeholder.com/300x200?text=Sample+Image",
  },
};
