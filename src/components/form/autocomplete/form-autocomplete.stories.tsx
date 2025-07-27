import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import FormAutocompleteInput, {
  AutocompleteInputProps,
} from "./form-autocomplete";

interface Option {
  id: number;
  name: string;
}

export default {
  title: "Components/Form/AutocompleteInput",
  component: FormAutocompleteInput,
} as Meta;

const Template: StoryFn<AutocompleteInputProps<Option> & { name: string }> = (
  args
) => {
  const methods = useForm({
    defaultValues: {
      sampleAutocomplete: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormAutocompleteInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Autocomplete",
  name: "sampleAutocomplete",
  options: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
    { id: 4, name: "Option 4" },
    { id: 5, name: "Option 5" },
  ],
  renderOption: (option: Option) => option.name,
  testId: "sampleAutocomplete",
  value: { id: 2, name: "Option 2" },
  getOptionLabel: (option) => option.name,
};
